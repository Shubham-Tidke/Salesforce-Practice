public with sharing class pdfController {
    @AuraEnabled
    public static Attachment generatePDF(Id recordId,String htmlData){
       PageReference page = Page.renderPDF;
       page.getParameters().put('pdfText',htmlData);
       
       Contact con = new Contact(Id=recordId);
       Attachment objAttachment = new Attachment();
       objAttachment.Name = 'invoice.pdf';
       objAttachment.ParentId = con.Id;
       objAttachment.Body = page.getContentaspdf();
       objAttachment.isPrivate = false;
       insert objAttachment;
       return objAttachment;
    }
}
