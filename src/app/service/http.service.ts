import {environment} from '../../environments/environment';
import {HttpClient, HttpEventType} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {ImageResponse} from '../model/ImageResponse';
import {ProjectModel} from '../model/ProjectModel';

@Injectable( {providedIn: 'root'})
export class HttpService {

  constructor(private http: HttpClient) {}

  getRequest(path: string): Observable<{}> {
      return this.http.get(environment.url + path);
  }

  postRequest(path: string, data: object): Observable<{}>  {
    return this.http.post( environment.url + path, data);
  }

  uploadFileWithProgress(path: string, file: File) {
    const fd = new FormData();
    fd.append('image', file, file.name);
    this.http.post(environment.url + path, fd, {reportProgress: true, observe: 'events'}).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        console.log('Upload Progress: ' + Math.round(event.loaded / event.total * 100) + '%');
      } else if (event.type === HttpEventType.Response) {
        console.log(event);
      }
    });
  }

  uploadByteArrayFile(path: string, file: File): Observable<{}> {
    return this.http.post(environment.url + path, file);
  }

  /**
   * POST to upload image or file to google storage and uses promise instead of observable to return object
   */
  async uploadMultipartFile(path: string, file: File, type: string): Promise<string> {
    const fd = new FormData();
    fd.append(type, file, file.name);
    return await this.http.post(environment.url + path, fd)
      .pipe(map(res => res as ImageResponse))
      .toPromise().then(data => {
        return data.url;
      });
  }

  /**
   * POST to create new project
   */
  async postNewProject(project: ProjectModel){
    return await this.http.post(environment.url + '/project/new', project)
      .pipe(map( res => res as ProjectModel)).toPromise().then( data => {
      return data;
    });
  }

  /**
   * GET list of all projects
   */
  async getAllProject(){
    return await this.http.get(environment.url + '/projects')
      .pipe(map( res => res as Array<ProjectModel>)).toPromise().then( data => {
        return data;
      });
  }

  /**
   * GET project by id
   */
  async getProject(id: number){
    return await this.http.get(environment.url + '/project/' + id)
      .pipe(map( res => res as ProjectModel)).toPromise().then( data => {
        return data;
      });
  }
}
