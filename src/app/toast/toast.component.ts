import { Component, OnInit } from '@angular/core';
import {ToastService} from '../service/toast.service';
import {Router} from '@angular/router';
import {ToastType} from '../model/ToastType';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {

  errors = [];
  success = [];
  infos = [];

  /**
   * Constructor subscribes to toastService to receive type of ERROR, SUCCESS and INFO messages
   * and subscribes to clear all message Event Emitter
   */
  constructor(private toastService: ToastService, private router: Router) {

    this.toastService.toastMessage.subscribe(toast => {
      if (toast.type === ToastType.ERROR) {
        if (toast.response.error) {
          for (let error of toast.response.error.errors) {
            this.errors.push(error.defaultMessage);
          }
        } else if (toast.response.error) {
          this.errors.push(toast.error.message);
        } else {
          this.errors.push('Backend error, please retry');
        }
      } else if (toast.type === ToastType.SUCCESS) {
        if (toast.response.id) {
          if (toast.response.created !== null && toast.response.created === toast.response.updated) {
            this.displaySuccessAndGoHome('Created');
          } else if (toast.response.updated !== null && toast.response.created !== toast.response.updated) {
            this.displaySuccessAndGoHome('Updated');
          }
        }
      } else if (toast.type === ToastType.INFO) {
        this.errors = [];
        this.infos.push(toast.response.message);
      }
    });

    this.toastService.clearMessages.subscribe(value => {
      if (value) {
        this.success = [];
        this.errors = [];
      }
    });

  }
  ngOnInit(): void {
  }

  /**
   * Removes (deletes) error/success/info element from errors/success/infos array when x button clicked on toast message in UI
   */
  closeToast(array, index) {
    this[array].splice(this[array].indexOf(index), 1);
  }

  /**
   * Adds success message to success array to display message and then after delay redirects user back to home page
   */
  displaySuccessAndGoHome(crateUpdate: string) {
    this.success.push(crateUpdate + ' successfully');
    setTimeout(() => {
      this.router.navigate(['/']).then( complete => {
        this.success = [];
        this.errors = [];
        this.infos = [];
      });
    }, 3000);
  }
}
