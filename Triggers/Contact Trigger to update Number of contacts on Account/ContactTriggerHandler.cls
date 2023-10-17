public class ContactTriggerHandler {
    public static void beforeContactDelete(List<Contact>conList , Map<Id,Contact>conMap){
        for(Contact con : conList){
            if(conMap.get(con.Id).Level__c == 'Primary'){
                con.addError('Record cannot be deleted');
            }
        }
    }
    public static void afterContactDelete(List<Contact>conList){
        Set<Id>accIds = new Set<Id>();
        for(Contact con : conList){
            if(con.AccountId != null){
                accIds.add(con.AccountId);
            }
        }
        List<Account>accList = [SELECT Id,No_of_Contacts__c,(SELECT Id FROM Contacts) FROM Account WHERE Id IN :accIds];
        if(!accList.isEmpty()){
            for(Account acc : accList){
                acc.No_of_Contacts__c = acc.Contacts.size();
            }
        }
        try{
            Database.SaveResult[] result = Database.update(accList, TRUE);
            for(Database.SaveResult res : result){
                if(res.isSuccess()){
                    system.debug('Contacts updated for : '+res.getId());
                }
                else{
                    for(Database.Error err : res.getErrors()){
                        System.debug('Error : '+err);
                    }
                }
            }
        }Catch(Exception e){
            system.debug(e);
        }
    }
    public static void afterContactUndelete(List<Contact>conList){
        List<Contact>updatedConList = new List<Contact>();
        for(Contact con :conList){
            Contact c = new Contact();
            c.Id = con.Id;
            c.Level__c = 'Primary';
            updatedConList.add(c);
        }
        if(!updatedConList.isEmpty()){
            try{
                Database.SaveResult[] result = Database.update(updatedConList,true);
                for(Database.SaveResult res : result){
                    if(res.isSuccess()){
                        system.debug('Record Retrieved : '+res.getId());
                    }else{
                        for(Database.Error err : res.getErrors()){
                            System.debug(err);
                        }
                    }
                }
            }
            Catch(Exception e){
                System.debug(e);
            }
        }
    }
    public static void sendMailToContact(List<Contact> conList){
        List<Messaging.Email>mailList =new List<Messaging.Email>();
        if(!conList.isEmpty()){
            for(Contact con : conList){
                Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
                mail.toAddresses = new String[]{con.Email};
                mail.setSubject('Welcome To Salesforce');
                String body = 'Dear '+con.FirstName+',<br/>';
                body = body+'Your Contact has been created!';
                mail.setHtmlBody(body);
                mailList.add(mail);
            }
        }
        if(!mailList.isEmpty()){
            Messaging.SendEmailResult[] result =  Messaging.sendEmail(mailList);
            for(Messaging.SendEmailResult res : result){
                if(res.success){
                    System.debug('The email was sent successfully.');
                }else{
                    System.debug('Error sending mail. : '+res.errors);
                }
            }
        }
        
    }
}