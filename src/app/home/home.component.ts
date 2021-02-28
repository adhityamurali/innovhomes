import { Component, OnInit } from '@angular/core';
declare var $:any;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    $('.counter').counterUp({
      delay: 20,
      time: 1000
  });
  }

}
