public with sharing class fileDownloadDatatableController {
    @AuraEnabled(cacheable=true)
    public static List<ContentVersion> getRelatedFilesByRecordId(String recordId){
        try{
            List<ContentDocumentLink> files = [SELECT ContentDocumentId FROM ContentDocumentLink WHERE LinkedEntityId = :recordId WITH SECURITY_ENFORCED];
            Set<Id> contentDocumentId = new Set<Id>();   
            for(ContentDocumentLink cdl : files){
                contentDocumentId.add(cdl.ContentDocumentId);
            }
                List<ContentVersion> docs = [SELECT Id, VersionData, FileType,  FileExtension, ContentDocument.ContentSize,
                CreatedDate, ContentDocumentId,LastModifiedDate,ContentModifiedById, ContentDocument.FileType,Title
                FROM   ContentVersion 
                WHERE  ContentDocumentId IN : contentDocumentId WITH SECURITY_ENFORCED LIMIT 50000];
                return docs;
        }
        catch(Exception e){
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static void deleteSelectedFiles(List<String> fileIds) {
        List<ContentDocument> fileList = [SELECT Id FROM ContentDocument WHERE Id IN :fileIds WITH SECURITY_ENFORCED];
        delete fileList;
    }
}