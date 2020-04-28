import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class ToastService {
  toastMessage = new EventEmitter<object>();
  constructor() {
  }
}
