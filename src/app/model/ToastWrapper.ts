import {ToastType} from './ToastType';

/**
 * Wrapper class to emmit toast messages of type ERROR, SUCCESS and INFO
 */
export class ToastWrapper {
  public type: ToastType;
  public response: object;


  constructor(type: ToastType, response: object) {
    this.type = type;
    this.response = response;
  }
}
