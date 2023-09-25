public with sharing class WrapperClassDemo {
    Public static list<accountWrapper> getAccountAndContacts(){
        List<accountWrapper> wrapList = new List<accountWrapper>();
        List<account> accList = [SELECT id,Name,(SELECT id,Name from Contacts) FROM account  LIMIT 5];
        if(!accList.isEmpty()){
            for(Account acc:acclist){
                wrapList.add( new accountWrapper(acc,acc.Contacts));
            }
        }
        return wrapList;
    }
    public class accountWrapper{
        public Account accRec{get;set;}
        public List<contact> conList{get;set;}
        public accountWrapper(Account accRec , List<Contact>conList){
            this.accRec = accRec;
            this.conList = conList;
        }
    }
}