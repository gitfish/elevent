import { LightningElement, api } from 'lwc';
import { Style } from "c/util";

export default class ListBoxOption extends LightningElement {

    @api
    value;

    @api
    valueTitleResolver;

    @api
    iconName;

    @api
    iconSize = "small";

    @api
    additionalClass;

    @api
    variant;

    get valueTitle() {
        return this.value ? this.valueTitleResolver ? this.valueTitleResolver(this.value) : this.value.title || this.value.label : undefined;
    }

    get className() {
        return Style.className("slds-media", { className: "slds-listbox__option", variant: this.variant }, this.additionalClass);
    }

    onclick() {
        this.dispatchEvent(new CustomEvent("select", {
            detail: {
                value: this.value
            }
        }));
    }
}