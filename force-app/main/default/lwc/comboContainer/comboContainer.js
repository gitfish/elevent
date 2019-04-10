import { LightningElement, api, track } from 'lwc';

export default class ComboContainer extends LightningElement {

    @api
    additionalClass;

    @track
    open = false;

    get className() {
        const classes = ["slds-combobox_container"];
        if(this.additionalClass) {
            classes.push(this.additionalClass);
        }
        return classes.join(" ");
    }

}