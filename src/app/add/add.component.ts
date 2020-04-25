import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../service/http.service';
import { ImageModel } from '../class/ImageModel';
import { DatePipe } from '@angular/common';
import {ProjectDescription} from '../class/ProjectDescription';
import {ToastService} from '../service/toast.service';
import {HttpResponseObject} from '../class/HttpResponseObject';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  providers: [DatePipe]
})
export class AddComponent implements OnInit {

  todayDate;
  disableSave = false; // used to disable save while image being sent to be saved in google bucket

  newProject = {
    id: null,
    name: null,
    shortInfo: null,
    text: null,
    projectDescription: null,
    images: [],
    file: [],
    created: null,
    updated: null
  };

  constructor(private router: Router, private httpService: HttpService, private datePipe: DatePipe, private toastService: ToastService) {
    this.todayDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  ngOnInit(): void {
    this.newProject.created = this.todayDate;
    this.newProject.updated = this.todayDate;
  }

  /**
   * On add image button click uploads image to bucket and saves returned url to newProject.images array as ImageModel object
   */
  addImage(event) {
    this.disableSave = event.target.files[0];
    let url = this.uploadFile(event.target.files[0]);
    url.then(urlString => {
      let imageModel = new ImageModel(urlString,  null, event.target.files[0].name, this.todayDate);
      this.newProject.images.push(imageModel);
      this.disableSave = false;
    });
  }

  /**
   * On save button click sends new project to be saved by backend
   */
  save() {
    this.newProject.projectDescription = new ProjectDescription(this.newProject.text, this.todayDate);
    this.httpService.postNewProject(this.newProject).subscribe(response => {
      console.log(response);
    }, error => {
      this.emmitToast(error);
    });
  }

  /**
   * On cancel button click navigate back to home page
   */
  cancel() {
    this.router.navigate(['./']);
  }

  /**
   * async method to retrieve saved image url from API
   */
  async uploadFile(file: File){
    return await this.httpService.uploadMultipartFile('/upload/image', file);
  }

  /**
   * If API returns error then emit response to toastMessage service
   */
  emmitToast(response: HttpResponseObject) {
    console.log(response);
    this.toastService.toastMessage.emit(response);
  }

}
