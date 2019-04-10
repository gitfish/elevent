/* eslint-disable @lwc/lwc/no-async-operation */
import { LightningElement, track, api } from 'lwc';
import momentPath from "@salesforce/resourceUrl/moment";
import userLocale from "@salesforce/i18n/locale";
import shortDateFormat from "@salesforce/i18n/dateTime.shortDateFormat";
import { loadScript } from "lightning/platformResourceLoader";
import saveEvent from "@salesforce/apex/EventController.saveEvent";
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

export default class EventEditor extends LightningElement {

    @api
    recordId;

    @track
    event = {};

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

    onSearchClick(event) {
        console.log("-- Search Click");
    }

    get eventJSON() {
        return JSON.stringify(this.event, null, "\t");
    }

    onSubjectChange(event) {
        this.event.Subject = event.target.value;
    }

    onDescriptionChange(event) {
        this.event.Description = event.target.value;
    }

    onStartChange(event) {
        this.event.StartDateTime = event.target.value;
    }

    onEndChange(event) {
        this.event.EndDateTime = event.target.value;
    }

    onAllDayEventChange(event) {
        this.event.IsAllDayEvent = event.target.checked;
        if(this.event.IsAllDayEvent) {
            // eslint-disable-next-line no-undef
            try {
                if(this.event.StartDateTime) {
                    // eslint-disable-next-line no-undef
                    const startMoment = moment(this.event.StartDateTime).locale(userLocale);
                    // dates are in ISO8601
                    const startDateTime = startMoment.format("YYYY-MM-DD");
                    this.event.StartDateTime = startDateTime;
                    this.event.EndDateTime = startDateTime;
                }
            } catch(err) {
                console.error(err);
            }
        }
    }
    
    onSave() {
        saveEvent({ event: this.event }).then(r => {
            console.log("-- Saved: " + JSON.stringify(r));
        }).catch(error => {
            console.log("-- Error: " + error);
            console.log("-- Error more: " + JSON.stringify(error));
        });
    }

    connectedCallback() {
        loadScript(this, `${momentPath}/moment-with-locales.js`).then(() => {
            // eslint-disable-next-line no-undef
            console.log("-- Moment Loaded: " + moment);
        });
    }
}