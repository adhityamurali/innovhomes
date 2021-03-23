import { Component, OnInit, ViewChild } from '@angular/core';
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
      console.log("youtube API")
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
            items: 1 },
      
          960: {
            items: 2 },
      
          1200: {
            items: 3 } } });
    },1000)
    this.videos = [];
    this.youTubeService
      .getVideosForChanel('UCxtMsJZRzwi571js0zoICUw', 15) 
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(lists => {
        console.log(lists, "lists")
        for (let element of lists["items"]) {
          this.videos.push(element)
          // this.videos.push({video:`https://youtu.be/${element.id.videoId}`,title:element.snippet.title,alt:'youtube video'})
        }
      });  
  }
}
//UCxtMsJZRzwi571js0zoICUw