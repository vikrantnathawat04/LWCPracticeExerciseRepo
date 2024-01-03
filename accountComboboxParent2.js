import { LightningElement, wire, track } from 'lwc';
import {
          subscribe,
          unsubscribe,
          APPLICATION_SCOPE,
          MessageContext
} from 'lightning/messageService';
import viewAccountContactsChannel from '@salesforce/messageChannel/viewAccountContactsChannel__c';
import getAccountWithContacts from '@salesforce/apex/AccountComboboxHandler.getAccountWithContacts';
import { refreshApex } from '@salesforce/apex';


const ACCOUNT_COLUMNS = [
          { label: 'Name', fieldName: 'Name' },
          { label: 'Rating', fieldName: 'Rating' },
          { label: 'Phone', fieldName: 'Phone', type: 'phone' },
          { label: 'Website', fieldName: 'Website', type: 'url' },
      ];
       
      const CONTACT_COLUMNS = [
          { label: 'First Name', fieldName: 'FirstName' },
          { label: 'Last Name', fieldName: 'LastName' },
          { label: 'Phone', fieldName: 'Phone' },
          { label: 'Email', fieldName: 'Email' },
      ];

export default class AccountComboboxParent2 extends LightningElement {

          accColumns = ACCOUNT_COLUMNS
          contactColumns = CONTACT_COLUMNS
       
          contactPresent = false
          accountPresent = false
       
          @track
          accountData = []
         
          @track
          contactsData = []

          @wire(MessageContext)
          messageContext;
          
          connectedCallback() {
                    this.subscribeToMessageChannel();
          }

          subscribeToMessageChannel() {
                    if (!this.subscription) {
                        this.subscription = subscribe(
                            this.messageContext,
                            viewAccountContactsChannel,
                            (data) => this.handleAccountSelection(data),
                            { scope: APPLICATION_SCOPE }
                        );
                    }
          }
          
          handleAccountSelection(data) {
                    this.accountId = data.accountId;
                    this.title = `${data.accountName}'s Contacts`;
                    this.getContacts();
                }
            
                disconnectedCallback() {
                    this.unsubscribeToMessageChannel();
                }
            
                unsubscribeToMessageChannel() {
                    unsubscribe(this.subscription);
                    this.subscription = null;
                }
          
              /*  async getContacts() {
                          const data = await getAccountWithContacts({ accountId: this.accountId });
                          this.accountPresent = true
                          
                          this.accountData.push(data)
                         this.accountData=[...this.accountData];
                          if (data.Contacts) { 
                                    
                              this.contactPresent = true
                              this.contactsData = data.Contacts     
                          }
                         
                          
                          
                    console.log('accountId value' + this.accountId);
                          console.log(' data value' + Object.values(data));
                          
                          this.contacts = data;
                          
                          console.log('contacts data ' + this.contacts);
                }*/
          
          getContacts() { 


                   // const accountId = msg.accountId
                    this.contactPresent = false
                    this.accountPresent = false
                    this.accountData = []
                    this.contactsData = []
                getAccountWithContacts({accountId: this.accountId})
                .then((result) => {
                    console.log(result)
                    this.accountPresent = true
                    this.accountData.push(result)
                    if(result.Contacts){
                        this.contactPresent = true
                        this.contactsData = result.Contacts
                    }
                })
                .catch((error) => {
                    console.log(error)
                    this.accountData = null
                });
          }
          
                
     
            

          

}