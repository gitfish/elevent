import { LightningElement, api } from 'lwc';

export default class ListBoxItem extends LightningElement {

    @api
    additionalClass;

    @api
    variant = "entity";

    get className() {
        const r = ["slds-listbox__item"];
        if(this.additionalClass) {
            r.push(this.additionalClass);
        }
        return r.join(" ");
    }
    
}