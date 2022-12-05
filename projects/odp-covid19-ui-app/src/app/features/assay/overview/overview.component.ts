import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';
import { Assay, AssayApiService } from '@odp/covid';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class AssayOverviewComponent implements OnInit {
  assayId: string;
  assayName: string;
  assayDetail: any = {};

  constructor(private actRoute: ActivatedRoute, private assayApi: AssayApiService, private titleService: Title) {
    this.assayId = this.actRoute.snapshot.params['id'];
    this.assayName = this.actRoute.snapshot.params['assay'];
  }

  ngOnInit(): void {
    this.getData();
    this.titleService.setTitle(this.assayName);
  }

  getData(): void {
    this.assayApi.getAssayOverview(this.assayId).subscribe(result => {
      this.assayDetail = result;
    });
  }
}
