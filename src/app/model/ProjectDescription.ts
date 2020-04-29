/**
 * ProjectDescription class mimics backend Entity for API communication
 */
export class ProjectDescription {
  public id: number;
  public projectId: number;
  public text: string;
  public created: Date;
  public updated: Date;

  constructor(desc: string, date: Date) {
    this.text = desc;
    this.created = date;
    this.updated = date;
  }
}
