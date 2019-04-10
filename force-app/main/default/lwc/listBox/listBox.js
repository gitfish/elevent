import { LightningElement, api } from 'lwc';

export default class ListBox extends LightningElement {

    @api
    additionalClass;

    @api
    variant = "vertical";

    get className() {
        const r = ["slds-listbox"];
        if(this.variant) {
            r.push(`slds-listbox_${this.variant}`);
        }
        if(this.additionalClass) {
            r.push(this.additionalClass);
        }
        return r.join(" ");
    }
}