import {Component, OnInit, Input} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-external-link-modal',
  template: `
    <div class="modal-header">
      <h5 class="modal-title">NCATS OpenData Portal</h5>
    </div>
    <div class="modal-body">
      <p>
        You are leaving the NCATS OpenData Portal website. This external link provides additional information that is
        consistent with the intended purpose of this site. NCATS can not attest to the accuracy of a non-federal site.
        Linking to a non-federal site does not constitute an endorsement by NCATS or any of its employees of the
        sponsors or the information and products presented on the site. You will be subject to the destination site’s
        privacy policy when you follow the link.
      </p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Go Back</button>
      <button type="button" class="btn btn-primary" (click)="processToURL(url); activeModal.close('Close click')">
        Continue
      </button>
    </div>
  `
})
export class ExternalLinkModalComponent {
  constructor(public activeModal: NgbActiveModal) {}
  @Input() url?: string;
  processToURL(url?: string) {
    window.open(url, '_blank');
  }
}
