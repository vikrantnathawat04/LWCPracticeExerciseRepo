import { LightningElement, api } from 'lwc';

export default class AccountComboboxChild extends LightningElement {

          @api
          editableContactId

          successHandler() { 

                    this.dispatchEvent(CustomEvent('contactcreation'));
          }

          isShowModalPopup() { 

                    this.dispatchEvent(CustomEvent('ishideshowmodalpopup'));
          }
}