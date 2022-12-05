import {Component, OnInit, Input} from '@angular/core';
import {ExternalLinkModalComponent} from './external-link-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-external-link',
  templateUrl: './external-link.component.html',
  styleUrls: ['./external-link.component.scss']
})
export class ExternalLinkComponent implements OnInit {
  constructor(private modalService: NgbModal) {}
  @Input() url?: string;
  @Input() text?: string;

  isGov() {
    if (this.url?.includes('.gov')) {
      return true;
    }
    return false;
  }
  open() {
    if (this.url?.includes('.gov')) {
      window.open(this.url, '_blank');
      return;
    }
    const modalRef = this.modalService.open(ExternalLinkModalComponent);
    modalRef.componentInstance.url = this.url;
  }

  ngOnInit(): void {}
}
