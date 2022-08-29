public with sharing class pdfPageController {
    public String pdfText{get;set;}
    public pdfPageController() {
        pdfText = String.escapeSingleQuotes(
            //LWC controller will set the pdf generation value in same parameter [pdfText]
            //VF controller will get the value in same parameter[pdfText]
            ApexPages.currentPage().getParameters().get('pdfText')
        );
    }
}
