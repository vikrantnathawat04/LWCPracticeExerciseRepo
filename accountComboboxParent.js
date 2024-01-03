import { LightningElement, wire } from 'lwc';
import getAccountsForCobobox from '@salesforce/apex/AccountComboboxHandler.getAccountsForCobobox';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { publish, MessageContext } from 'lightning/messageService';
import viewAccountContactsChannel from '@salesforce/messageChannel/viewAccountContactsChannel__c';

export default class AccountComboboxParent extends LightningElement {

          accountoptions;
          accountError;
          selectedrecordid;
          ishideshowmodalpopup = false;

          @wire(MessageContext)
          messageContext;
          
          @wire(getAccountsForCobobox)
          wiredAccounts({ error, data }) { 

                    if (data) {
                              this.accountoptions = data;
                    }

                    else if(error){
                              this.accountError = error;

                    }


          }

          get accNames(){
                    // This is how you will get the value 
                    if (this.accountoptions) {
                              return this.accountoptions.map(v => ({ label: v.Name, value: v.Id }))

                             
                     }
                   
                              
          }

          handleChange(event) {

                    this.selectedrecordid = event.detail.value;
           }

          controleishideshowmodalpopup() {
                    this.ishideshowmodalpopup = false;
          }

          showPopup() {
                    this.selectedrecordid ? this.ishideshowmodalpopup = true :
                    this.showToast('Account not selected', 'Please select an Account to Proceed','error')
          }
          

          contactcreationhandler() { 

                    this.ishideshowmodalpopup = false;
                    this.showToast('Contact Created', 'A new Contact Record Created Successfully', 'success');



          }

          showToast( title,message,variant) {
                    const event = new ShowToastEvent({
                        title,
                        message,
                        variant
                    });
                    this.dispatchEvent(event);
          }
          
          handleAccConRelated() { 

                    const payload = { accountId: this.selectedrecordid};
                    publish(this.messageContext, viewAccountContactsChannel, payload);




          }
}

         

