import { LightningElement, track } from 'lwc';

export default class DateUfDisplay extends LightningElement {
    @track formattedDate = '';
    @track ufValue = '39.773,43';
    
    connectedCallback() {
        this.formatDate();
    }
    
    formatDate() {
        const today = new Date();
        const options = { weekday: 'long', day: 'numeric', month: 'long' };
        let dateStr = today.toLocaleDateString('es-ES', options);
        
        // Capitalize first letter
        dateStr = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);
        
        this.formattedDate = dateStr;
    }
}