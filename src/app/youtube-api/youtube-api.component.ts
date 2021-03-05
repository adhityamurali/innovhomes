import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { YoutubeService } from '../youtube.service';
import { takeUntil } from 'rxjs/operators';
declare var $: any;

@Component({
  selector: 'youtube-api',
  templateUrl: './youtube-api.component.html',
  styleUrls: ['./youtube-api.component.css']
})
export class YoutubeApiComponent implements OnInit {
  videos: any[];
  private unsubscribe$: Subject<any> = new Subject();
  constructor(private spinner: NgxSpinnerService, private youTubeService: YoutubeService) { }

  ngOnInit(): void {
    this.spinner.show()
    setTimeout(()=>
    {
      this.spinner.hide()
      $('.owl-carousel').owlCarousel({
        loop: false,
        stagePadding: 15,
        margin: 10,
        nav: true,
        navText: ['<span class="uk-margin-small-right uk-icon" uk-icon="icon: chevron-left"></span>', '<span class="uk-margin-small-left uk-icon" uk-icon="icon: chevron-right"></span>'],
        responsive: {
          0: {
            items: 1 },
      
          640: {
            items: 2 },
      
          960: {
            items: 3 },
      
          1200: {
            items: 4 } } });
    },1000)
    this.videos = [];
    this.youTubeService
      .getVideosForChanel('UC_LtA_EtCr7Jp5ofOsYt18g', 15)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(lists => {
        for (let element of lists["items"]) {
          this.videos.push(element)
        }
      });
  }

}
