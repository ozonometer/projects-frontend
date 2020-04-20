import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  searchText = '';
  constructor() { }

  ngOnInit(): void {
  }

  searchTextFunction() {
    console.log(this.searchText);
  }

}
