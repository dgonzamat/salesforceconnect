@isTest
public class AccountOpportunityControllerTest {
    
    @testSetup
    static void setupTestData() {
        // Crear cuenta de prueba
        Account testAccount = new Account(
            Name = 'Test Account',
            Phone = '1234567890',
            // Removed Email and AccountType fields that don't exist
            RUT__c = '12345678'
        );
        insert testAccount;
        
        // Crear oportunidades para la cuenta
        List<Opportunity> opps = new List<Opportunity>();
        Date today = Date.today();
        
        // Oportunidad del mes actual
        opps.add(new Opportunity(
            Name = 'Opp Current Month',
            AccountId = testAccount.Id,
            StageName = 'Closed Won',
            CloseDate = today,
            Amount = 300
        ));
        
        // Oportunidad del mes anterior
        opps.add(new Opportunity(
            Name = 'Opp Last Month',
            AccountId = testAccount.Id,
            StageName = 'Closed Won',
            CloseDate = today.addMonths(-1),
            Amount = 200
        ));
        
        // Oportunidad de hace dos meses
        opps.add(new Opportunity(
            Name = 'Opp Two Months Ago',
            AccountId = testAccount.Id,
            StageName = 'Closed Won',
            CloseDate = today.addMonths(-2),
            Amount = 100
        ));
        
        insert opps;
    }
    
    @isTest
    static void testGetAccountInfo() {
        Test.startTest();
        
        // Probar búsqueda por RUT
        Account accByRut = AccountOpportunityController.getAccountInfo('rut', '12345678', true);
        System.assertEquals('Test Account', accByRut.Name);
        
        // Probar búsqueda por nombre
        Account accByName = AccountOpportunityController.getAccountInfo('name', 'Test Account', true);
        System.assertEquals('12345678', accByName.RUT__c);
        
        Test.stopTest();
    }
    
    @isTest
    static void testGetOpportunityReport() {
        Account testAccount = [SELECT Id FROM Account WHERE Name = 'Test Account' LIMIT 1];
        
        Test.startTest();
        
        Map<String, Object> report = AccountOpportunityController.getOpportunityReport(testAccount.Id);
        
        Test.stopTest();
        
        // Verificar que el reporte contiene los datos esperados
        System.assertNotEquals(null, report);
        System.assert(report.containsKey('labels'));
        System.assert(report.containsKey('totals'));
        System.assert(report.containsKey('targets'));
    }
    
    @isTest
    static void testExceptionHandling() {
        Test.startTest();
        
        try {
            // Intentar buscar una cuenta que no existe
            AccountOpportunityController.getAccountInfo('rut', '99999999', true);
            System.assert(false, 'Se esperaba una excepción');
        } catch (AuraHandledException e) {
            // Verificar que se lanza la excepción esperada
            System.assert(true);
        }
        
        Test.stopTest();
    }
}