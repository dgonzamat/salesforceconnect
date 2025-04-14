import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class LogoutButton extends NavigationMixin(LightningElement) {
    handleLogout() {
        // Navigate to Salesforce logout URL
        window.location.href = '/secur/logout.jsp';
    }
}