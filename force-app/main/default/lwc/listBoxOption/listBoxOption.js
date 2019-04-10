import { LightningElement, api } from 'lwc';
import { Lang, String, StringFilters } from "c/util";

export default class ListBoxOption extends LightningElement {

    @api
    additionalClass;

    @api
    variant;

    get className() {
        const r = ["slds-listbox__option"];
        if(this.variant) {
            let vs;
            if(Lang.isString(this.variant)) {
                vs = String.split(this.variant, StringFilters.isWhitespace);
            } else if(Lang.isArray(this.variant)) {
                vs = this.variant;
            }
            if(vs) {
                vs.forEach(v => {
                    r.push(`slds-listbox__option_${v}`);
                });
            }
        }
        if(this.additionalClass) {
            r.push(this.additionalClass);
        }

        return r.join(" ");
    }
}