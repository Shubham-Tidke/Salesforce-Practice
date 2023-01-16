@isTest
public class TestFileDownloadDatatableController {  
    @isTest
    public static void testFileDownload(){
        Account acc = new Account(Name='Test Account');
    	Insert acc;
        ContentVersion cv = new ContentVersion();
        cv.Title = 'Test Document';
        cv.PathOnClient = 'TestDocument.pdf';
        cv.VersionData = Blob.valueOf('Test Content');
        cv.IsMajorVersion = true;
        Insert cv;
        Id conDocId = [SELECT ContentDocumentId FROM ContentVersion WHERE Id =:cv.Id].ContentDocumentId;
        //Create ContentDocumentLink 
        ContentDocumentLink cdl = New ContentDocumentLink();
        cdl.LinkedEntityId = acc.Id;
        cdl.ContentDocumentId = conDocId;
        cdl.shareType = 'V';
        Insert cdl;  
       	ContentVersion abc = (fileDownloadDatatableController.getRelatedFilesByRecordId(acc.Id))[0]; 
        System.assertEquals(abc.Title,'Test Document' ); 	
    }   
    @isTest
    public static void testFileDelete() {
        List<String> fileIds = new List<String>();
        Account acc = new Account(Name='Test Account');
    	Insert acc;
        ContentVersion cv = new ContentVersion();
        cv.Title = 'Test Document';
        cv.PathOnClient = 'TestDocument.pdf';
        cv.VersionData = Blob.valueOf('Test Content');
        cv.IsMajorVersion = true;
        Insert cv;

        Id conDocId = [SELECT ContentDocumentId FROM ContentVersion WHERE Id =:cv.Id].ContentDocumentId;

        //Create ContentDocumentLink 
        ContentDocumentLink cdl = New ContentDocumentLink();
        cdl.LinkedEntityId = acc.Id;
        cdl.ContentDocumentId = conDocId;
        cdl.shareType = 'V';
        Insert cdl; 
        fileIds.add(conDocId);
        fileDownloadDatatableController.deleteSelectedFiles(fileIds);
        //check if file is removed from the account record
        List<ContentVersion>abc = fileDownloadDatatableController.getRelatedFilesByRecordId(acc.Id);
        System.assertEquals(0,abc.size());
    }
}