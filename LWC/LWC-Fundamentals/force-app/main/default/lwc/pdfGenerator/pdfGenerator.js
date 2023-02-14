/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable vars-on-top */
import { LightningElement } from 'lwc';
import {loadScript} from "lightning/platformResourceLoader";
import JSPDF from '@salesforce/resourceUrl/jsPDF';

export default class PdfGenerator extends LightningElement {
	contactList = [];
	headers = this.createHeaders([
		"Id",
		"FirstName",
		"LastName"
	]);

	renderedCallback() {
		Promise.all([
			loadScript(this, JSPDF)
		]);
	}

	generatePdf(){
		const { jsPDF } = window.jspdf;
		const doc = new jsPDF({	});
		//doc.text("hello", 20, 20);
		doc.table(60, 60, this.contactList, this.headers, { autosize:false });
		doc.save("demo.pdf");
	}
	generateData(){
		this.contactList = [{
			'Id':'0035i000009ojO6AAI',
			'FirstName':'Andy',
			'LastName':'Young'
		},
		{
			'Id':'0035i000009ojO6AAI',
			'FirstName':'Andy',
			'LastName':'Young'
		}];
	  
		this.generatePdf();
	}
	createHeaders(keys) {
		var result = [];
		for (var i = 0; i < keys.length; i = i+1) {
            console.log(keys[i]);
			result.push({
				id: keys[i],
				name: keys[i],
				prompt: keys[i],
				width: 65,
				align: "center",
				padding: 0
			});
		}
		return result;
	}

}