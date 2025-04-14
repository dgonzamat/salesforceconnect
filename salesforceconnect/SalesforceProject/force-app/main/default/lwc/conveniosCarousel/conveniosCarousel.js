import { LightningElement } from 'lwc';
import YAPP_LOGO from '@salesforce/resourceUrl/yappLogo';

export default class ConveniosCarousel extends LightningElement {
    yappLogoUrl = YAPP_LOGO;
    
    connectedCallback() {
        // Inicializar el carrusel
        console.log('Carrusel inicializado');
    }
}