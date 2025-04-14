import { LightningElement, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import USER_ID from '@salesforce/user/Id';
import NAME_FIELD from '@salesforce/schema/User.Name';
import PROFILE_FIELD from '@salesforce/schema/User.Profile.Name';
// Keep using the correct static resource
import SURA_LOGO from '@salesforce/resourceUrl/surasmalllogo';

export default class UserProfile extends LightningElement {
    suraLogoUrl = SURA_LOGO;
    userName = 'Juan Salazar';
    userRole = 'Corredor';
    
    connectedCallback() {
        // Check if user is guest (no USER_ID)
        if (!USER_ID) {
            this.userName = 'Juan Salazar';
            this.userRole = 'Corredor';
        }
    }
    
    @wire(getRecord, { 
        recordId: USER_ID, 
        fields: [NAME_FIELD, PROFILE_FIELD]
    })
    userInfo({ error, data }) {
        if (data) {
            this.userName = data.fields.Name.value;
            this.userRole = data.fields.Profile.value.fields.Name.value;
        }
    }
}