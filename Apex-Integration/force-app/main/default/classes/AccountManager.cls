@RestResource(urlmapping='/v1/Account/*')
global with sharing class AccountManager {

    @httpPost
    global static postAccountWrapper createAccount(postAccountWrapper record){
        Account acc = record.accountRecord;
        insert acc;
        return record;
    }
   
    @httpPatch
    global static String updateAccount(String accNumber,String description){
        RestRequest request = RestContext.request;
        String requestURI = request.requestURI;
        String accId = requestURI.subStringAfterLast('/');
        List<Account>accList = [SELECT Id FROM Account WHERE Id =:accId];
        if(accList.size()>0){
            Account acc = new Account(Id = accId, AccountNumber = accNumber , Description = description);
            update acc;
            return 'Account Updated!';
        }
        else{
            return 'Failed to update!';
        }
    }

    @httpDelete //we cannot pass parameters to delete http method
    global static String deleteAccount(){
        RestRequest request = RestContext.request;
        String requestURI = request.requestURI;
        String accId = requestURI.subStringAfterLast('/');
        List<Account>accList = [SELECT Id FROM Account WHERE Id =:accId];
        if(accList.size()>0){
            delete accList;
            return 'Account Deleted!';
        }
        else {
            return 'Failed to delete!';
        } 
    }

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
     //using wrapper class to have best practice
     global class postAccountWrapper{
        global  Account accountRecord { get; set; }
    }
    
}
/*
{
  "record" : {
    "accountRecord" : {
      "Name" : "Wrapper Test",
      "Rating" : "Hot",
      "Description" : "This is a simple description",
      "Phone" : "987-988-2342",
      "Industry" : "Education"
    }
  }
}
*/