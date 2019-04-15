import { LightningElement, api } from 'lwc';
import { Style } from "c/util";

export default class ListBoxItem extends LightningElement {

    @api
    additionalClass;

    @api
    variant = "entity";

    get className() {
        return Style.className("slds-listbox__item", this.additionalClass);
    }
    
}