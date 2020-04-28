/**
 * ProjectDescription class mimics backend Entity for API communication
 */
export class ProjectDescription {
  private id: number;
  private projectId: number;
  private text: string;
  private created: Date;
  private updated: Date;

  constructor(desc: string, date: Date) {
    this.text = desc;
    this.created = date;
    this.updated = date;
  }
}
