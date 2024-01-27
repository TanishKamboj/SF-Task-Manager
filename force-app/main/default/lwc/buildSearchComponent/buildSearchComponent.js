import { LightningElement } from 'lwc';

export default class BuildSearchComponent extends LightningElement {
    value = '';

    get options() {
        return [
            { label: 'Task Timestamp', value: 'Task Timestamp' },
            { label: 'Task Deadline', value: 'Task Deadline' },
        ];
    }

    handleChange(event) {
        this.value = event.detail.value;
    }
}