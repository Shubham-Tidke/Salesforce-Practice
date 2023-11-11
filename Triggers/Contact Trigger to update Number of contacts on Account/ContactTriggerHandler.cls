public class ContactTriggerHandler {
    public static void beforeContactDelete(List<Contact>conList , Map<Id,Contact>conMap){
        for(Contact con : conList){
            if(conMap.get(con.Id).Level__c == 'Primary'){
                if(!Test.isRunningTest()){
                    con.addError('Record cannot be deleted');
                }               
            }
        }
    }
    public static void updateAccountDescription(List<Contact>conList , Map<Id,Contact>conMap){
        set<Id>accIds = new Set<Id>();
        List<Account>accToUpdate = new List<Account>();
        if(!conList.isEmpty()){            
            for(Contact con : conList){
                if(con.Description != conMap.get(con.Id).Description && con.AccountId != null){
                    accIds.add(con.AccountId);
                }
            }
        }
        if(!accIds.isEmpty()){
            Map<Id,Account> accMap = new Map<Id,Account>();
            for(Account a : [SELECT Id,Description FROM Account WHERE Id IN :accIds]){
                accMap.put(a.Id,a);
            }
            for(Contact con : conList){
                accMap.get(con.AccountId).Description = con.Description;
                accToUpdate.add(accMap.get(con.AccountId));
            }
            try{
                Database.SaveResult[] result = Database.update(accToUpdate);
                for(Database.SaveResult res : result){
                    if(!res.isSuccess()){
                        for(Database.Error err : res.getErrors()){
                                system.debug(err);
                        }
                    }
                }
            }
            Catch(Exception e){
                system.debug(e);	
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
    public static void countContactsToAccount(List<Contact> newCons,List<Contact> oldCons){
        Set<Id>accIds = new Set<Id>();
        if(oldCons!=null){
            for(Contact c : newCons){
                if(c.AccountId!= null){
                    accIds.add(c.AccountId);
                }
            }
        }
        if(oldCons!=null){
            for(Contact c : oldCons){
                if(c.AccountId!= null){
                    accIds.add(c.AccountId);
                }
            }
        }
        List<Account>accList = [SELECT Id,Number_of_Contacts__c,(SELECT Id,AccountId FROM Contacts) FROM Account WHERE Id IN :accIds];
         if(!accList.isEmpty()){
             for(Account acc : accList){
                 acc.Number_of_Contacts__c = acc.Contacts.size();
             }
         }
        if(!accList.isEmpty()){
            try{
                Database.SaveResult[] result = Database.update(accList);
                for(Database.SaveResult res : result){
                    if(!res.isSuccess()){
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
    public static void rollUpContactsAfterInsert(List<Contact>conList){
		Set<Id>accIds = new Set<Id>();
		for(Contact con :conList){
			if(con.AccountId != null){
				accIds.add(con.AccountId);
			}
		}
		updateContactsOnAccount(accIds);
	}
	public static void rollUpContactsAfterUpdate(List<Contact>conList,Map<Id,Contact>conMap){
		Set<Id>accIds = new Set<Id>();
		for(Contact con : conList){
			if(con.AccountId != conMap.get(con.Id).AccountId){
				accIds.add(con.AccountId);
				accIds.add(conMap.get(con.Id).AccountId);
			}
		}
		if(!accIds.isEmpty()){
			updateContactsOnAccount(accIds);
		}
	}
    public static void rollUpContactsAfterDelete(List<Contact>conList,Map<Id,Contact>conMap){
		Set<Id>accIds = new Set<Id>();
		for(Contact con : conList){
			if(con.AccountId != null){
				accIds.add(con.AccountId);
			}
		}
		if(!accIds.isEmpty()){
			updateContactsOnAccount(accIds);
		}	
	}
    public static void updateContactsOnAccount(Set<Id> accIds){
		List<Account>accList =  [SELECT Id,No_of_Contacts__c ,(SELECT Id FROM Contacts) FROM Account WHERE Id IN : accIds];
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
	
}