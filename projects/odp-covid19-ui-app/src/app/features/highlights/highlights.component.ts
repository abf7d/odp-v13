import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-highlights',
  templateUrl: './highlights.component.html',
  styleUrls: ['./highlights.component.scss']
})
export class HighlightsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  public navigateToSection(section: string) {
    window.location.hash = '';
    window.location.hash = section;
  }
}
