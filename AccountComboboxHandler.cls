public with sharing class AccountComboboxHandler {
   
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountsForCobobox(){
        List<account> accountList =[SELECT Name FROM Account LIMIT 10];

        System.debug('Returned Accounts List '+accountList);
        return accountList;
 
    }

    @AuraEnabled
    public static Account getAccountWithContacts(Id accountId){
        List<Account> listAccount = new List<Account>();
        try {
            listAccount = [SELECT Id, Name, Website, Rating, Phone, (SELECT FirstName, LastName, Phone, Email FROM Contacts) FROM Account WHERE Id =: accountId];
            if(listAccount.size()>0){
                return listAccount[0];
            }else{
                return null;
            }
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
   
}