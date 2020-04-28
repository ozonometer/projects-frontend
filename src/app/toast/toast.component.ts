import { Component, OnInit } from '@angular/core';
import {ToastService} from '../service/toast.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {

  errors = [];
  success = [];

  /**
   * Constructor captures error/success event and adds error to errors/success array to display UI message
   */
  constructor(private toastService: ToastService, private router: Router) {

    this.toastService.toastMessage.subscribe((responseObject) => {
      if (responseObject.id) {
        if (responseObject.created !== null && responseObject.created === responseObject.updated) {
          this.displaySuccessAndGoHome('Created');
        } else if (responseObject.updated !== null && responseObject.created !== responseObject.updated) {
          this.displaySuccessAndGoHome('Updated');
        }
      } else {
        if (responseObject.error) {
          for (let error of responseObject.error.errors) {
            this.errors.push(error.defaultMessage);
          }
        } else if (responseObject.error) {
          this.errors.push(responseObject.error.message);
        } else {
          this.errors.push('Backend error, please retry');
        }
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
   * Removes (deletes) error from errors message when x button clicked on error message in UI
   */
  closeToast(index) {
    this.errors.splice(this.errors.indexOf(index), 1);
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
      });
    }, 3000);
  }
}
