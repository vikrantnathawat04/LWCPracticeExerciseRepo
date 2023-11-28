import { LightningElement, track } from 'lwc';
import getAccountsForCobobox from '@salesforce/apex/AccountComboboxHandler.getAccountsForCobobox'
import getContacts from '@salesforce/apex/AccountComboboxHandler.getContacts';
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import CONTACT_OBJECT from "@salesforce/schema/Contact"; // import object
import CON_FirstName from "@salesforce/schema/Contact.FirstName"; // import fields
import CON_LastName  from "@salesforce/schema/Contact.LastName";
import CON_Email  from "@salesforce/schema/Contact.Email";
import CON_PHONE from "@salesforce/schema/Contact.Phone";
import CON_ACCOUNTID from "@salesforce/schema/Contact.AccountId";
import ModalRecordEditForm from "c/modalRecordEditForm";

const columns = [

    {label: 'Contacts Name', fieldName: 'Name'},
    {label: 'Contacts Email', fieldName:'Email'}
]
export default class AccountCombobox extends LightningElement {

contactObject = CONTACT_OBJECT; // object type
contactFields = [
    CON_FirstName,
    CON_LastName,
    CON_Email,
    CON_PHONE,
    CON_ACCOUNTID
];
    @track value='';
    @track valueForContacts='';
    @track optionsArray =[];
    @track cardVisible=false;
    @track buttonsVisible=false;
    @track data=[];
    @track columns =columns;

    get options(){
        return this.optionsArray;
    }
    connectedCallback(){
        getAccountsForCobobox()
        .then(response=>{
            let arr =[];
            for(var i=0; i<response.length; i++){
                arr.push({label : response[i].Name, value: response[i].Id})
            }
            this.optionsArray = arr;
        })
    }

    handleDisplayContacts(event){
        this.cardVisible=true;
        this.valueForContacts=this.value;
        getContacts({selectedAccountId:this.valueForContacts})
        .then(result=>{
            this.data=result
        })
        .catch(error=>{
            window.alert("Error Occured: "+error);
        })
        this.buttonsVisible=false;
    }

    handleChangedValue(event){
        this.buttonsVisible=true;
        this.value=event.detail.value;
        this.cardVisible=false;
    }
    async showPopup() {
        const recordId = await ModalRecordEditForm.open({
        size: "small",
        contactFields: this.contactFields
        });
       // console.log("arry value of contact "+contactFields);
        if (recordId) {
        await this.showSuccessToast(recordId);
        }
    }

    async showSuccessToast(recordId) {
        const evt = new ShowToastEvent({
        title: "Contact created",
        message: "Contact Record Successfully Created!",
        variant: "success"
        });
        this.dispatchEvent(evt);
    }

    
}
