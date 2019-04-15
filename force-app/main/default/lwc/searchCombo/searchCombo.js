/* eslint-disable @lwc/lwc/no-async-operation */
import { LightningElement, track, api } from 'lwc';
import { Id, String, Style } from "c/util";

const ID_PREFIX = "search";

const nextSearchId = () => {
    return Id.next(ID_PREFIX);
};

export default class SearchCombo extends LightningElement {

    @api
    label;

    @api
    placeholder = "Search...";

    @api
    delay = 500;

    @api
    searchHandler;

    @track
    input;

    @track
    state = {
        searching: false,
        id: undefined,
        input: undefined,
        timeout: undefined
    };

    @api
    open = false;

    _inputId;

    get inputId() {
        if(!this._inputId) {
            this._inputId = Id.next("search-combo-input");
        }
        return this._inputId;
    }

    _listBoxId;

    get listBoxId() {
        if(!this._listBoxId) {
            this._listBoxId = Id.next("search-combo-listbox");
        }
        return this._listBoxId;
    }

    get comboClassName() {
        return Style.className(
            "slds-combobox",
            "slds-dropdown-trigger",
            "slds-dropdown-trigger_click",
            {
                "slds-is-open": this.open
            }
        );
    }

    toggleOpen() {
        this.open = !this.open;
    }

    async search(input) {
        const searchId = nextSearchId();
        this.state.id = searchId;
        this.state.input = input;
        this.state.searching = true;
        this.dispatchEvent(new CustomEvent("searchstart", {
            detail: {
                input: input
            }
        }));
        try {
            const result = String.isNotBlank(input) ? await Promise.resolve(this.searchHandler(input)) : [];
            if(this.state.id === searchId) {
                this.dispatchEvent(new CustomEvent("searchend", {
                    detail: {
                        input: input,
                        result: result
                    }
                }));
                this.state.searching = false;
            }
        } catch(err) {
            if(this.state.id === searchId) {
                this.dispatchEvent(new CustomEvent("searcherror", {
                    detail: {
                        input: input,
                        error: err
                    }
                }));
                this.state.searching = false;
            }
        }
    }

    searchIfChanged(input) {
        if(input !== this.input) {
            this.input = input;
            this.search(input);
        }
    }

    delayedSearch(input) {
        if(this.state.timeout) {
            window.clearTimeout(this.state.timeout);
            delete this.state.timeout;
        }
        this.state.timeout = window.setTimeout(() => {
            this.searchIfChanged(input);
            delete this.state.timeout;
        }, this.delay);
    }

    onInputKeyUp(event) {
        if(event.key === "Escape" || event.key === "Enter") {
            this.open = false;
        } else {
            this.delayedSearch(event.target.value);
        }
    }

    onInputClick(event) {
        event.stopPropagation();
        this.open = true;
    }

    onInputFocus() {
        this.open = true;
    }

    onDropDownClick(event) {
        event.stopPropagation();
    }

    onDocumentClick = () => {
        this.open = false;
    };

    connectedCallback() {
        document.addEventListener("click", this.onDocumentClick);
    }

    disconnectedCallback() {
        document.removeEventListener("click", this.onDocumentClick);
    }
}