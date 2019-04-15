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
                    return String.containsIgnoreCase(d.firstName + " " + d.lastName, input);
                }));
            }, 800);
        });
    };

    onSearchStart(event) {
        this.searching = true;
    }

    onSearchEnd(event) {
        this.result = event.detail.result;
        this.searching = false;
        this.hasSearched = true;
    }

    onSearchError(event) {
        this.error = event.detail.error;
        this.searching = false;
        this.hasSearched = true;
    }

    onSelectItem(event) {
        console.log(`-- Item Selected: ${JSON.stringify(event.detail.value)}`);
    }
}