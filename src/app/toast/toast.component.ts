import { Component, OnInit } from '@angular/core';
import {ToastService} from '../service/toast.service';
import {HttpResponseObject} from '../class/HttpResponseObject';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {

  errors = [];

  /**
   * Constructor captures error event and adds error to errors array to display UI message
   */
  constructor(private toastService: ToastService) {
    this.toastService.toastMessage.subscribe((responseObject: HttpResponseObject) => {
      if (responseObject.error.errors) {
        for (let error of responseObject.error.errors) {
          console.log(error);
          this.errors.push(error.field + ' ' + error.defaultMessage);
        }
      } else {
        this.errors.push('Back end error, please retry');
      }
    });
  }
  ngOnInit(): void {
  }

  closeToast(index) {
    this.errors.splice(this.errors.indexOf(index), 1);
  }
}
