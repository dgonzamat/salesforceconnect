import { LightningElement } from 'lwc';

export default class QuickAccess extends LightningElement {
    handleAccesoClick(event) {
        const accesoTexto = event.currentTarget.querySelector('.acceso-texto').textContent;
        console.log('Acceso seleccionado: ' + accesoTexto);
        
        // Aquí puedes agregar la lógica de navegación según el acceso seleccionado
    }
}