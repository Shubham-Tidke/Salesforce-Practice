/* eslint-disable vars-on-top */
import { LightningElement } from 'lwc';

import {loadScript} from "lightning/platformResourceLoader";
import JSPDF from '@salesforce/resourceUrl/jsPDF';
import getContacts from '@salesforce/apex/PdfGenerator.getContactsController';

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
		const doc = new jsPDF({
			// encryption: {
			// 	userPassword: "user",
			// 	ownerPassword: "owner",
			// 	userPermissions: ["print", "modify", "copy", "annot-forms"]
			// 	// try changing the user permissions granted
			// }
		});

		doc.text("Hi I'm Matt", 20, 20);
		doc.table(30, 30, this.contactList, this.headers, { autosize:true });
		doc.save("demo.pdf");
	}

	generateData(){
		getContacts().then(result=>{
			this.contactList = result;
           // console.log(result);
			this.generatePdf();
		});
	}

	createHeaders(keys) {
		var result = [];
		for (var i = 0; i < keys.length; i = i+1) {
            console.log(keys[i]);
			// result.push({
			// 	id: keys[i],
			// 	name: keys[i],
			// 	prompt: keys[i],
			// 	width: 65,
			// 	align: "center",
			// 	padding: 0
			// });
		}
		return result;
	}

}