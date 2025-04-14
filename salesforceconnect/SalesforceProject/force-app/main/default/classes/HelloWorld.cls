public class HelloWorld {
    @AuraEnabled(cacheable=true)
    public static String hello() {
        return 'Hello Salesforce!';
    }
}