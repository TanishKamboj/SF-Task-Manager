import { LightningElement, wire, api } from 'lwc';
import getTasks from '@salesforce/apex/JeeraTasks.getTasks';
import { publish, MessageContext } from 'lightning/messageService';
import TASK_ID_MESSAGE from '@salesforce/messageChannel/TaskDescriptionChannel__c'

export default class ToDoTab extends LightningElement {
    taskList;
    error;

    @api taskStatus;
    taskDescriptionIndex;

    @wire(MessageContext)
    messageContext;

    @wire(getTasks, { taskStatus: '$taskStatus' })
    handleJeeraTask({ error, data }) {
        if (data) {
            this.taskList = data.map((task) => {
                const res = {
                    ...task,
                    taskUrl: this.getTaskUrl(task.Id)
                };
                return res;
            });
            this.error = undefined;
        } else if (error) {
            this.taskList = undefined;
            this.error = error;
        }
    }


    getTaskUrl(taskId) {
        return `https://empathetic-panda-8364aw-dev-ed.trailblaze.lightning.force.com/lightning/r/Jeera_Task__c/${taskId}/view`;
    }

    onShowDescription(event) {
        const payload = { taskId: event.target.dataset.taskId };
        publish(this.messageContext, TASK_ID_MESSAGE, payload);
    }
}
