import {ValidatorError} from './ValidatorError';

/**
 * Class is used to map Response object
 */
export class HttpResponseObject {
  public headers: object;
  public status: number;
  public statusText: string;
  public url: string;
  public ok: boolean;
  public name: string;
  public message: string;
  public error: {
    timestamp: null,
    status: null,
    error: null,
    errors: ValidatorError[],
    message: null,
    trace: null,
    path: null
  };
}

