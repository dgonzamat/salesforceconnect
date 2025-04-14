import { LightningElement, track } from 'lwc';
// Removed import SURA_LOGO from '@salesforce/resourceUrl/surasmalllogo';

export default class SuraMenu extends LightningElement {
    // Removed suraLogoUrl = SURA_LOGO;
    
    toggleSection(event) {
        const sectionHeader = event.currentTarget;
        const sectionName = sectionHeader.dataset.section;
        const isExpanded = sectionHeader.getAttribute('aria-expanded') === 'true';
        
        // Toggle aria-expanded attribute
        sectionHeader.setAttribute('aria-expanded', !isExpanded);
        
        // Find and toggle the corresponding content section
        const sectionContent = this.template.querySelector(`.menu-section-content[data-section="${sectionName}"]`);
        if (sectionContent) {
            sectionContent.setAttribute('aria-hidden', isExpanded);
        }
    }
    
    @track menuItems = [
        {
            id: 'productos',
            label: 'Productos',
            icon: 'utility:ad_set',
            expanded: false,
            subItems: [
                {
                    id: 'asegurados',
                    label: 'Asegurados y pólizas',
                    icon: 'utility:user',
                    active: false
                },
                {
                    id: 'coberturas',
                    label: 'Coberturas y siniestros',
                    icon: 'utility:shield',
                    active: false
                },
                {
                    id: 'prestadores',
                    label: 'Prestadores y servicios',
                    icon: 'utility:service_appointment',
                    active: false
                },
                {
                    id: 'facturacion',
                    label: 'Facturación y pagos',
                    icon: 'utility:money',
                    active: false
                }
            ]
        },
        {
            id: 'reportes',
            label: 'Reportes y consultas',
            icon: 'utility:graph',
            active: false
        },
        {
            id: 'procesos',
            label: 'Procesos administrativos',
            icon: 'utility:settings',
            active: false
        }
    ];
}