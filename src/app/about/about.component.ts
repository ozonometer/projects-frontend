import { Component, OnInit } from '@angular/core';
import {ToastService} from '../service/toast.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html'
})
export class AboutComponent implements OnInit {

  constructor(private toastService: ToastService) {
    this.toastService.clearMessages.emit(true);
  }

  ngOnInit(): void {
  }

}
