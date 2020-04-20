import { Component } from '@angular/core';
// import {logger} from 'codelyzer/util/logger';

@Component({selector: 'app-home',
  templateUrl: './home.component.html'
  })
  export class HomeComponent {
    disableButton = true;
    constructor() {
      setTimeout(() => {
        this.disableButton = false;
      }, 2000);
    }

    onButtonClick(event: Event) {
      console.log(event);
    }

}
