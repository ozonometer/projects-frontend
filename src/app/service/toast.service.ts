import {EventEmitter, Injectable} from '@angular/core';
import {ToastWrapper} from '../model/ToastWrapper';

@Injectable()
export class ToastService {
  toastMessage = new EventEmitter<ToastWrapper>();
  clearMessages = new EventEmitter<boolean>();
  constructor() {
  }

  /**
   * Use this message to emmit toast message
   */
  emmitToast(toast: ToastWrapper) {
    this.toastMessage.emit(toast);
  }

  clearToastMessages() {
    this.clearMessages.emit(true);
  }
}
