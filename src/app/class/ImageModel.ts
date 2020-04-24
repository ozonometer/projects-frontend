/**
 * Image Model class mimics backend Entity for API communication
 */
export class ImageModel {
  public id: number;
  public projectId: number;
  public imageName: string;
  public url: string;
  public imageDescription: string;
  public created: Date;
  public updated: Date;

  constructor(url: string, desc: string, name: string, date: Date) {
    this.url = url;
    this.imageDescription = desc;
    this.imageName = name;
    this.created = date;
    this.updated = date;
  }
}
