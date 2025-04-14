import { LightningElement, track } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import chartjs from '@salesforce/resourceUrl/chartjs';
import getAccountInfo from '@salesforce/apex/AccountOpportunityController.getAccountInfo';
import getOpportunityReport from '@salesforce/apex/AccountOpportunityController.getOpportunityReport';

export default class AccountOpportunityReport extends LightningElement {
    @track searchType = 'rut';
    @track searchValue = '';
    @track isLoading = false;
    @track accountData;
    @track opportunityData;
    @track error;
    @track isTitular = true;
    
    chartInitialized = false;
    chart;
    
    get searchTypeOptions() {
        return [
            { label: 'RUT Asegurado', value: 'rut' },
            { label: 'Nombre', value: 'name' },
            { label: 'Póliza', value: 'policy' }
        ];
    }
    
    get searchLabel() {
        return this.searchType === 'rut' ? 'RUT del asegurado*' : 
               this.searchType === 'name' ? 'Nombre del asegurado*' : 'Número de póliza*';
    }
    
    get searchPlaceholder() {
        return this.searchType === 'rut' ? '12345678' : 
               this.searchType === 'name' ? 'Nombre completo' : 'POL-12345';
    }
    
    get titularClass() {
        return this.isTitular ? 'tab-item active' : 'tab-item';
    }
    
    get beneficiarioClass() {
        return !this.isTitular ? 'tab-item active' : 'tab-item';
    }
    
    connectedCallback() {
        this.loadChartJs();
    }
    
    loadChartJs() {
        loadScript(this, chartjs)
            .then(() => {
                this.chartInitialized = true;
                // Si ya tenemos datos, inicializamos el gráfico
                if (this.opportunityData) {
                    this.initializeChart();
                }
            })
            .catch(error => {
                this.error = error;
            });
    }
    
    handleSearchTypeChange(event) {
        this.searchType = event.detail.value;
    }
    
    handleSearchValueChange(event) {
        this.searchValue = event.detail.value;
    }
    
    selectTitular() {
        this.isTitular = true;
    }
    
    selectBeneficiario() {
        this.isTitular = false;
    }
    
    handleSearch() {
        if (!this.searchValue) return;
        
        this.isLoading = true;
        
        getAccountInfo({ 
            searchType: this.searchType, 
            searchValue: this.searchValue,
            isTitular: this.isTitular 
        })
            .then(result => {
                this.accountData = result;
                this.error = undefined;
                // Ahora buscamos las oportunidades
                return getOpportunityReport({ accountId: result.Id });
            })
            .then(opportunityResult => {
                this.opportunityData = opportunityResult;
                if (this.chartInitialized) {
                    this.initializeChart();
                }
            })
            .catch(error => {
                this.error = error;
                this.accountData = undefined;
                this.opportunityData = undefined;
            })
            .finally(() => {
                this.isLoading = false;
            });
    }
    
    handleConsult() {
        this.handleSearch();
    }
    
    handleViewFullReport() {
        // Implementar navegación al reporte completo
        console.log('Ver reporte completo');
    }
    
    initializeChart() {
        const ctx = this.template.querySelector('.chart-canvas').getContext('2d');
        
        // Datos de ejemplo - reemplazar con datos reales de this.opportunityData
        const data = {
            labels: ['Ene', 'Feb', 'Mar'],
            datasets: [
                {
                    label: 'Meta mensual',
                    data: [250, 130, 260],
                    backgroundColor: '#20B2AA',
                    borderColor: '#20B2AA',
                    borderRadius: 6
                },
                {
                    label: 'Venta actual',
                    data: [450, 350, 320],
                    backgroundColor: '#1E5EE6',
                    borderColor: '#1E5EE6',
                    borderRadius: 6
                }
            ]
        };
        
        if (this.chart) {
            this.chart.destroy();
        }
        
        this.chart = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 500
                    }
                }
            }
        });
    }
}