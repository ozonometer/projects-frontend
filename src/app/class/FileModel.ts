/**
 * File Model class to map backend Entity
 */
export class FileModel {
  public id: number;
  public projectId: number;
  public fileName: string;
  public url: string;
  public fileDescription: string;
  public created: Date;
  public updated: Date;

  constructor(url: string, desc: string, name: string, date: Date) {
    this.url = url;
    this.fileDescription = desc;
    this.fileName = name;
    this.created = date;
    this.updated = date;
  }
}
