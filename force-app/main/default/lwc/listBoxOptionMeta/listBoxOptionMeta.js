import { LightningElement, api } from 'lwc';
import { Style } from "c/util";

export default class ListBoxOptionMeta extends LightningElement {

    @api
    title;

    @api
    additionalClass;

    @api
    variant;

    get className() {
        return Style.className({ className: "slds-listbox__option-meta", variant: this.variant }, this.additionalClass);
    }
}