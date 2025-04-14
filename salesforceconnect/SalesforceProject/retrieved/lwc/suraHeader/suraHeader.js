import { LightningElement } from 'lwc';

export default class SuraHeader extends LightningElement {
    handleSearch(event) {
        if (event.keyCode === 13) {
            // Implementar búsqueda cuando se presiona Enter
            console.log('Búsqueda: ' + event.target.value);
        }
    }
}