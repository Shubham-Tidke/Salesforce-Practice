trigger callAWSApiGateway on AccountEvent__e (after Insert) {
    for (AccountEvent__e event : Trigger.New) {
        System.debug('Event trigger ' + event.AccountName__c);
        AWSCallout.callAWSApiGateway(event.AccountId__c, event.AccountName__c, event.AccountWebsite__c);
    }
}