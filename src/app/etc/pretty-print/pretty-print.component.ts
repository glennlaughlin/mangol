import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  AfterViewChecked
} from '@angular/core';

declare var PR: any;

@Component({
  selector: 'app-pretty-print',
  templateUrl: './pretty-print.component.html',
  styleUrls: ['./pretty-print.component.scss']
})

/**
 * TODO: Extend this component to pretty print the help screen associated with the containing component.
 */
export class PrettyPrintComponent
  implements OnInit, AfterViewInit, AfterViewChecked {
  @Input() code: string;

  constructor() {}

  ngOnInit() {}

  ngAfterViewChecked() {
    PR.prettyPrint();
  }

  ngAfterViewInit() {
    // PR.prettyPrint();
  }
}
