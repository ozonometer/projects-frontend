import {environment} from '../../environments/environment';
import {HttpClient, HttpEventType} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
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

  uploadMultipartFile(path: string, file: File): Observable<{}> {
    const fd = new FormData();
    fd.append('image', file, file.name);
    return this.http.post(environment.url + path, fd);
  }
}
