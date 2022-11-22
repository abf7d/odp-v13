import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import { Assay } from '../../../core/models/dtos/assay/assay';
import { AssayApiService } from '../../../core/services/api/assay-api/assay-api.service';
@Component({
  selector: 'app-assay',
  templateUrl: './assay.component.html',
  styleUrls: ['./assay.component.scss']
})
export class AssayComponent implements OnInit {
  constructor(private assayApi: AssayApiService, private titleService: Title) {}
  assays!: Assay[];

  ngOnInit(): void {
    this.titleService.setTitle('Variant Therapeutic Assay Overview');
    this.getData();
  }

  getData(): void {
    this.assayApi.getAssays().subscribe(result => {
      this.assays = result;
    });
  }
}
