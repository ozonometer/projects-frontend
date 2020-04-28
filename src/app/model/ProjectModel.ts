/**
 * Class is used to map Project object
 */
import {ProjectDescription} from './ProjectDescription';
import {ImageModel} from './ImageModel';
import {FileModel} from './FileModel';

export class ProjectModel {
  public id: number;
  public name: string;
  public shortInfo: string;
  public text: string;
  public projectDescription: ProjectDescription;
  public images: ImageModel[];
  public files: FileModel[];
  public created: Date;
  public updated: Date;


  constructor() {
    this.id = null;
    this.name = null;
    this.shortInfo = null;
    this.text = null;
    this.projectDescription = null;
    this.images = [];
    this.files = [];
    this.created = null;
    this.updated = null;
  }
}

