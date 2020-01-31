import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.scss']
})
export class ApiComponent implements OnInit {
  @Input()
  apiUrl: string;
  apiFullUrl: string;

  constructor() {}

  /**
   * REVIEW: This is a pattern to GET an html page from a web server. Use this pattern
   * to GET the javascript content for Bokeh charts
   */
  ngOnInit() {
    this.apiFullUrl = `https://fegyi001.github.io/mangol/modules/${
      this.apiUrl
    }.html`;
  }

  openAPIPage() {
    window.open(this.apiFullUrl);
  }
}
