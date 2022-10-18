@RestResource(urlmapping='/v1/Account/*')
global with sharing class AccountManager {

    @httpGet
    global static AccountWrapper getAccount(){

        RestRequest request = RestContext.request;
        String requestURI = request.requestURI;
        String accId = requestURI.subStringAfterLast('/');
        List<Account>accList = [SELECT Id,Name,Rating,Industry,Description FROM Account WHERE Id =:accId];
        List<Contact>conList = [SELECT Id,Name,FirstName,LastName FROM Contact WHERE AccountId =:accId];
        List<Case>caseList = [SELECT Id,CaseNumber,Type,Reason FROM Case WHERE AccountId =:accId];
        
        AccountWrapper wrapper = new AccountWrapper();
        if(!accList.isEmpty()){
            wrapper.accRecord = accList.get(0);
            wrapper.contactList = conList;
            wrapper.caseList = caseList;
        }
        return wrapper;
    }
    global class AccountWrapper{
        global Account accRecord;
        global List<Contact> contactList;
        global List<Case> caseList;
    }
}