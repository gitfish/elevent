import { LightningElement, api } from 'lwc';
import { Style } from "c/util";

export default class ListBox extends LightningElement {

    @api
    additionalClass;

    @api
    variant = "vertical";

    get className() {
        return Style.className({ className: "slds-listbox", variant: this.variant }, this.additionalClass);
    }
}