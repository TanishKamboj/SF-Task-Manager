import { LightningElement, wire } from 'lwc';
import { subscribe, MessageContext, unsubscribe } from 'lightning/messageService';
import TASK_ID_MESSAGE from '@salesforce/messageChannel/TaskDescriptionChannel__c'
import getTaskDescription from '@salesforce/apex/JeeraTasks.getTaskDescription';
export default class TaskDescription extends LightningElement {

    subscription = null;
    taskDescription = 'No Task Selected!';
    taskId;

    @wire(MessageContext)
    messageContext;

    @wire(getTaskDescription, { taskId: '$taskId' })
    handleTaskDescriptionCHange({ error, data }) {
        if (data) {
            this.taskDescription = data.Task_Description__c;
        } else if (error) {
            this.taskDescription = 'No Task Selected!';
        }
    }

    subscribeToMessageChannel() {
        if (!this.subscription) {
            this.subscription = subscribe(
                this.messageContext,
                TASK_ID_MESSAGE,
                (message) => this.handleMessage(message)
            );
        }
    }

    unsubscribeToMessageChannel() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }

    handleMessage(message) {
        this.taskId = message.taskId;
    }

    connectedCallback() {
        this.subscribeToMessageChannel();
    }

    disconnectedCallback() {
        this.unsubscribeToMessageChannel();
    }
}