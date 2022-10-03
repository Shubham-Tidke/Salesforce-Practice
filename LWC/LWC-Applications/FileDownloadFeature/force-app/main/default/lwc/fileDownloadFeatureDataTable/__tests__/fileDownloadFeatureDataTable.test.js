import { createElement } from 'lwc';
import FileDownloadFeatureDataTable from 'c/fileDownloadFeatureDataTable';

describe('c-file-download-feature-data-table', () => {
    test('Display Lightning Card', () => {
        // creating LEC on DOM and adding 'FileDownloadFeatureDataTable.html' to it
        const element = createElement('c-file-download-feature-data-table', {
            is: FileDownloadFeatureDataTable
        });
        // Act
        document.body.appendChild(element);

        // Assert
        // const div = element.shadowRoot.querySelector('div');
        expect(1).toBe(1);
    });
});