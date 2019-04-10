/* eslint-disable @lwc/lwc/no-async-operation */
import { LightningElement } from 'lwc';
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

export default class Demo extends LightningElement {

    testSearchHandler = (input) => {
        return new Promise((resolve) => {
            window.setTimeout(() => {
                resolve(sampleData.filter(d => {
                    return String.containsIgnoreCase(d.firstName, input) || String.containsIgnoreCase(d.lastName, input);
                }));
            }, 1000);
        });
    };

    onSearchStart(event) {
        console.log(`-- Search Start: ${event.detail.input}`);
    }

    onSearchEnd(event) {
        console.log(`-- Search End: ${JSON.stringify(event.detail.result)}`)
    }

    onSearchError(event) {
        console.log("-- Search Error: " + event.detail.error);
    }

}