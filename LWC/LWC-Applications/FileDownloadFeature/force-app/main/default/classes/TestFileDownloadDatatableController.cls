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
        String abc = (fileDownloadDatatableController.getRelatedFilesByRecordId(acc.Id)); 
        System.debug(abc);
        String titleCheck = abc.substring(abc.indexOf('Title')+8,abc.indexOf('ContentBodyId')-3);
        System.assertEquals(titleCheck,'Test Document' ); 	
    }   
}