import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  links = ['First', 'Second', 'Third'];
  activeLink = this.links[0];
  // background = '';

  constructor() { }

  ngOnInit(): void {

  }

}
