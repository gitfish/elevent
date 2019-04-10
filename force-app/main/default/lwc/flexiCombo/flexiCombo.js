import { LightningElement, api, track } from 'lwc';
import { Id } from "c/util";

export default class FlexiCombo extends LightningElement {

    @api
    label;

    @api
    searchHandler;

    @track
    open = false;

    @track
    searchState = {
        searching: false,
        id: undefined,
        value: undefined
    };

    get labelSpecified() {
        return this.label ? true : false;
    }

    get comboClass() {
        return `slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click${this.open ? " slds-is-open" : ""}`;
    }

    toggleOpen() {
        this.open = !this.open;
    }

    onInputClick() {
        this.toggleOpen();
    }

    search(value) {
        if(value !== this.searchValue) {
            const searchId = Id.next();
            this.searchValue = value;
            this.searchId = searchId;
            this.searchHandler.search(value).then(result => {
                if(this.searchId === searchId) {
                    this.dispatchEvent({
                        
                    })
                }
            }).catch(err => {
                if(this.searchId === searchId) {

                }
            });
        }
    }

    delayedSearch(value) {

    }

    onInputKeyUp(event) {
        this.delayedSearch(event.target.value);
    }
}