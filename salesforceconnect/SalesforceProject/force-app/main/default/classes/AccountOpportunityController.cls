public with sharing class AccountOpportunityController {
    
    @AuraEnabled(cacheable=true)
    public static Account getAccountInfo(String searchType, String searchValue, Boolean isTitular) {
        try {
            String query = 'SELECT Id, Name, Phone, RUT__c FROM Account WHERE ';
            
            if (searchType == 'rut') {
                query += 'RUT__c = :searchValue';
            } else if (searchType == 'name') {
                query += 'Name LIKE \'%' + String.escapeSingleQuotes(searchValue) + '%\'';
            } else if (searchType == 'policy') {
                query += 'PolicyNumber__c = :searchValue';
            }
            
            // Removed AccountType filter since the field doesn't exist
            
            query += ' LIMIT 1';
            
            List<Account> accounts = Database.query(query);
            
            if (accounts.isEmpty()) {
                throw new AuraHandledException('No se encontró ninguna cuenta con los criterios especificados.');
            }
            
            return accounts[0];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
    @AuraEnabled(cacheable=true)
    public static Map<String, Object> getOpportunityReport(Id accountId) {
        try {
            Date threeMonthsAgo = Date.today().addMonths(-3);
            
            List<Opportunity> opportunities = [
                SELECT Id, Name, Amount, CloseDate, StageName
                FROM Opportunity
                WHERE AccountId = :accountId
                AND CloseDate >= :threeMonthsAgo
                AND StageName = 'Closed Won'
                ORDER BY CloseDate ASC
            ];
            
            Map<String, Decimal> monthlyTotals = new Map<String, Decimal>();
            Map<String, Decimal> monthlyTargets = new Map<String, Decimal>();
            
            List<String> months = new List<String>{'Ene', 'Feb', 'Mar'};
            for (String month : months) {
                monthlyTotals.put(month, 0);
                monthlyTargets.put(month, 250);
            }
            
            for (Opportunity opp : opportunities) {
                String month = getMonthAbbreviation(opp.CloseDate.month());
                if (monthlyTotals.containsKey(month)) {
                    Decimal currentTotal = monthlyTotals.get(month);
                    monthlyTotals.put(month, currentTotal + opp.Amount);
                }
            }
            
            Map<String, Object> result = new Map<String, Object>();
            result.put('labels', months);
            result.put('totals', monthlyTotals);
            result.put('targets', monthlyTargets);
            
            return result;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
    private static String getMonthAbbreviation(Integer monthNumber) {
        List<String> monthAbbreviations = new List<String>{
            'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 
            'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
        };
        return monthAbbreviations[monthNumber - 1];
    }
}
