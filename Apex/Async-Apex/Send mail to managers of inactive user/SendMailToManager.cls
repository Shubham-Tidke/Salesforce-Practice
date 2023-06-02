public class SendMailToManager implements Database.Batchable<sObject> {
    Date sevenDaysAgo = Date.today().addDays(-7);
    public Database.QueryLocator start(Database.BatchableContext bc){
        // returns user who has not logged in for 7 days
        return Database.getQueryLocator([Select Id, name, LastLoginDate, ManagerId,manager.email from User where LastLoginDate < :sevenDaysAgo]);
    }
    public void execute(Database.BatchableContext bc,List<User>usrList){
        //list for mails
        List<Messaging.SingleEmailMessage>mailList = new List<Messaging.SingleEmailMessage>();
        if(!usrList.isEmpty()){
            for(User usr:usrList){
                // check for user's manager and manager's mail
                if(usr.ManagerId!=null && usr.manager.email!=null){
                    Messaging.SingleEmailMessage mail =  new Messaging.SingleEmailMessage();
                    mail.setSenderDisplayName('Salesforce');
                    
                    mail.setToAddresses(new String[]{usr.manager.email}) ;
                    mail.setSubject('Inactive User');
                    String body = ('Dear Manager,\n\n The user ' + user.FirstName + ' has not logged in for the past 7 days.');
                    mail.setHtmlBody(body);
                    mailList.add(mail);
                }
            }
            if(!mailList.isEmpty()){
                Messaging.SendEmailResult[] results = Messaging.sendEmail(mailList);
                for(Messaging.SendEmailResult smr : results){
                    if(smr.isSuccess()){
                        system.debug('MAIL SENT!');
                    }
                    else{
                        system.debug('ERROR::'+smr.getErrors());
                    }
                }
            }
        }
    }
    public void finish(Database.BatchableContext bc){}
}