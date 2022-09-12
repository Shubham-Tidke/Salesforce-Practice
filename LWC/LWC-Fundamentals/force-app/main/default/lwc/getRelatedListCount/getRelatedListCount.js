import { api, LightningElement, wire } from 'lwc';
import { getRelatedListCount,getRelatedListRecords } from 'lightning/uiRelatedListApi';

export default class GetRelatedListCount extends LightningElement {
 notesCount
 list
    @api recordId
    @wire(getRelatedListCount,{
        parentRecordId: '$recordId',
        relatedListId:'CombinedAttachments'
    })
    listCountHandler({data,error}){
        if(data){
            this.notesCount = data
           console.log(JSON.stringify(data));
        }
        if(error){
            console.log(error);
        }
    }
    @wire(getRelatedListRecords,{
        parentRecordId: '$recordId',
        relatedListId:'Opportunities',
        fields:['Opportunity.Name']
    })listHandler({data,error}){
        if(data){
            this.list = data.records
            console.log(JSON.stringify(data));
        }
        if(error){
            console.log(JSON.stringify(error));
        }
    }
}
