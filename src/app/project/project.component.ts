import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html'
})
export class ProjectComponent implements OnInit {
  id: number;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const id = this.route.params.subscribe(param => {
      this.id = +param['id'];
    });
    console.log('loaded project with id = ' + this.id);
  }

}
