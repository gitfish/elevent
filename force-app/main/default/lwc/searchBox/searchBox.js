/* eslint-disable @lwc/lwc/no-async-operation */
import { LightningElement, track, api } from 'lwc';
import { Id, String } from "c/util";

const ID_PREFIX = "search";

const nextSearchId = () => {
    return Id.next(ID_PREFIX);
};

export default class SearchBox extends LightningElement {

    @api
    placeholder = "Search...";

    @api
    additionalClass;

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

    get className() {
        const classes = ["slds-input"];
        if(this.additionalClass) {
            classes.push(this.additionalClass);
        }
        return classes.join(" ");
    }

    async search(input) {
        const searchId = nextSearchId();
        this.state.id = searchId;
        this.state.input = input;
        this.state.searching = true;
        this.dispatchEvent(new CustomEvent("searchstart", {
            detail: {
                id: searchId,
                input: input
            }
        }));
        try {
            const result = String.isNotBlank(input) ? await Promise.resolve(this.searchHandler(input)) : [];
            if(this.state.id === searchId) {
                this.dispatchEvent(new CustomEvent("searchend", {
                    detail: {
                        id: searchId,
                        input: input,
                        result: result
                    }
                }));
            }
        } catch(err) {
            if(this.state.id === searchId) {
                this.dispatchEvent(new CustomEvent("searcherror", {
                    detail: {
                        id: searchId,
                        input: input,
                        error: err
                    }
                }));
            }
        } finally {
            this.state.searching = false;
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

    onKeyUp(event) {
        this.delayedSearch(event.target.value);
    }

}