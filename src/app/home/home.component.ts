import { Component } from '@angular/core';
import {ToastService} from '../service/toast.service';

@Component({selector: 'app-home',
  templateUrl: './home.component.html'
  })
  export class HomeComponent {
    disableButton = true;
    constructor(private toastService: ToastService) {
      this.toastService.clearToastMessages();
      setTimeout(() => {
        this.disableButton = false;
      }, 2000);
    }

    onButtonClick(event: Event) {
      console.log(event);
    }

}
