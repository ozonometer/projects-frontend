/**
 * Class is used to map Spring Validator Class
 */
export class ValidatorError {
  public codes: [];
  public arguments: [];
  public defaultMessage: string;
  public objectName: string;
  public field: string;
  public rejectedValue: string;
  public bindingFailure: boolean;
  public code: string;
}
