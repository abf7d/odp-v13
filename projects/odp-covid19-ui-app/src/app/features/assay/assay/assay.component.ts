import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import { Assay } from '../../../core/models/assay/assay';
import { VariantApiService } from '../../../core/services/api/variant-api/variant-api.service';
@Component({
  selector: 'app-assay',
  templateUrl: './assay.component.html',
  styleUrls: ['./assay.component.scss']
})
export class AssayComponent implements OnInit {
  constructor(private variantApi: VariantApiService, private titleService: Title) {}
  assays!: Assay[];

  ngOnInit(): void {
    this.titleService.setTitle('Variant Therapeutic Assay Overview');
    this.getData();
  }

  getData(): void {
    this.variantApi.getAssays().subscribe(result => {
      this.assays = result;
    });
  }
}
