import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getWelcomeMessage from '@salesforce/apex/HelloWorld.hello';

export default class ExperienceWelcome extends LightningElement {
    @api title = 'Bienvenido a Experience Cloud';
    welcomeMessage = '';
    isLoading = false;

    connectedCallback() {
        this.loadWelcomeMessage();
    }

    loadWelcomeMessage() {
        this.isLoading = true;
        getWelcomeMessage()
            .then(result => {
                this.welcomeMessage = result;
                this.isLoading = false;
            })
            .catch(error => {
                this.showToast('Error', 'No se pudo cargar el mensaje', 'error');
                this.isLoading = false;
                console.error('Error loading message', error);
            });
    }

    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(event);
    }
}