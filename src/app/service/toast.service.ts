import {EventEmitter, Injectable} from '@angular/core';
import {HttpResponseObject} from '../class/HttpResponseObject';

@Injectable()
export class ToastService {
  toastMessage = new EventEmitter<HttpResponseObject>();
  constructor() {
  }
}
