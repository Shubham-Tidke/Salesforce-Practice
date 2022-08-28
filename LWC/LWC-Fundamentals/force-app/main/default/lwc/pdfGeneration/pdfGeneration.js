import { LightningElement } from 'lwc';

export default class PdfGeneration extends LightningElement {
    imageUrl = 'https://about.gitlab.com/images/press/logo/preview/gitlab-logo-200-preview.png'
    invoiceData={
        invoiceNo:'123',
        invoiceCreated:'January 1, 2019',
        invoiceDue:'January 10, 2020',
        companyName:'Sparksuite, Inc.',
        address1:'12345 Sunny Road',
        address2:' Sunnyville, CA 12345'
    }
    clientData={
        client:'Acme Corp',
        username:'John Doe',
        email:'john@example.com'
    }
    services=[
        {name:'Consultant fee', amount:1000.00},
        {name:'Website design', amount:300.00},
        {name:'Hosting (3 months)', amount:75.00}
    ]

    get totalValue(){
        return this.services.reduce((total,service)=>{
            return total = total+service.amount
        },0)
    }
}