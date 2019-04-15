import { LightningElement, api } from 'lwc';
import { Style } from "c/util";

export default class ListBoxOptionText extends LightningElement {
    
    @api
    additionalClass;

    @api
    variant;

    @api
    title;

    get className() {
        return Style.className({ className: "slds-listbox__option-text", variant: this.variant }, this.additionalClass);
    }
}