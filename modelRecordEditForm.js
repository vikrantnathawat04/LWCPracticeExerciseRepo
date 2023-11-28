import { api } from "lwc";
import LightningModal from "lightning/modal";

export default class ModalRecordEditForm extends LightningModal {
@api contactFields;

errors;

closePopupSuccess(event) {
    this.close(event.detail.id);
}

closePopup() {
    this.close();
}
}
