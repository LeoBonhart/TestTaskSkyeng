import { Component, OnInit } from '@angular/core';
import { SortDateService } from './shared/sort-date.service';
import { TreeService } from './shared/tree.service';
import { SameWordService } from './shared/same-word.service';
import { PalindromService } from './shared/palindrom.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {

  public tabs = [ 1, 2 ];

  constructor(private sw: SameWordService) {
    const summArr = [7, 4, 12, 2, 9, 10, 1, 8, 5 , 6, 11, 3];
    summArr.splice(2, 1);
    // console.log((summArr.length + 2) * ((summArr.length + 1) / 2) - summArr.reduce((r, v) => r += v));

    console.log(this.sw.isClosed(this.sw.str));
  }

  ngOnInit(): void {

  }

  public dec() {
    this.tabs = this.tabs.slice(0, -1);
  }

  public inc() {
    this.tabs = [ ...this.tabs, (this.tabs.length + 1) ];
  }
}
