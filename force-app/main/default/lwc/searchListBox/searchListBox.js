import { LightningElement, api } from 'lwc';

export default class SearchListBox extends LightningElement {

    @api
    hasSearched = false;

    @api
    searching = false;

    @api
    result = [];

    get resultEmpty() {
        return !this.result || this.result.length === 0;
    }

    onSelectOption(event) {
        this.dispatchEvent(new CustomEvent("itemselected", {
            detail: event.detail
        }));
    }

}