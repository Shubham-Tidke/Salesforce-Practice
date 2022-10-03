public with sharing class fileDownloadDatatableController {
    @AuraEnabled(cacheable=true)
    public static String getRelatedFilesByRecordId(String recordId){
        List<ContentDocumentLink> files = [SELECT ContentDocumentId FROM ContentDocumentLink WHERE LinkedEntityId = :recordId];
        
        Set<Id> contentDocumentId = new Set<Id>();   
        for(ContentDocumentLink cdl : files){
            contentDocumentId.add(cdl.ContentDocumentId);
        }
     
            List<ContentVersion> docs = [SELECT Id, VersionData, FileType, Title, FileExtension, ContentDocument.ContentSize,
            CreatedDate, ContentDocumentId, ContentDocument.FileType
            FROM   ContentVersion 
            WHERE  ContentDocumentId IN : contentDocumentId];
            
            return JSON.serialize(docs);
    }
}