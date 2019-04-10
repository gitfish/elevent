/* eslint-disable no-console */
/* eslint-disable @lwc/lwc/no-async-operation */
import { LightningElement, track } from 'lwc';
import { String } from "c/util";

const sampleData = [
    {
        id: 1,
        firstName: "Sunburn",
        lastName: "Slapper"
    },
    {
        id: 2,
        firstName: "Roughly",
        lastName: "Chopped"
    }
];

export default class SearchComboDemo extends LightningElement {

    @track
    hasSearched = false;

    @track
    searching = false;

    @track
    result = [];

    @track
    error;

    get resultEmpty() {
        return !this.result || this.result.length === 0;
    }

    demoSearchHandler = (input) => {
        return new Promise((resolve) => {
            window.setTimeout(() => {
                resolve(sampleData.filter(d => {
                    return String.containsIgnoreCase(d.firstName, input) || String.containsIgnoreCase(d.lastName, input);
                }));
            }, 1000);
        });
    };

    onSearchStart(event) {
        this.hasSearched = true;
        this.searching = true;
    }

    onSearchEnd(event) {
        this.result = event.detail.result;
        this.searching = false;
    }

    onSearchError(event) {
        this.error = event.detail.error;
        this.searching = false;
    }
}