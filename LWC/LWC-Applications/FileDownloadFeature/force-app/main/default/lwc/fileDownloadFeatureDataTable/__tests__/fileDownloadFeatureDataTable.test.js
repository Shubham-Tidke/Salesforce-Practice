import { createElement } from 'lwc';
import FileDownloadFeatureDataTable from 'c/fileDownloadFeatureDataTable';

describe('c-file-download-feature-data-table', () => {
    
        beforeEach(()=>{
            // creating LEC on DOM and adding 'FileDownloadFeatureDataTable.html' to it
            const element = createElement('c-file-download-feature-data-table', {
            is: FileDownloadFeatureDataTable
        });
         // Act
         document.body.appendChild(element);
        })
       it("template if:false test",() => {
           // const element = document.querySelector('c-file-download-feature-data-table')
            
       })
       

        // Assert
        // const div = element.shadowRoot.querySelector('div');
       
   
});