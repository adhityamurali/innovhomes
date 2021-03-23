import { ViewportScroller } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
declare var $:any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private viewportScroller: ViewportScroller) { }

  isShow: boolean;
  topPosToStartShowing = 100;

  public isDeskTopView: boolean = false;
  public isMobileView: boolean = false;
  public screenWidth: number = 0;
  public scrollPosition: number = 0;


  @HostListener('window:scroll')
  checkScroll() {
    this.scrollPosition = window.pageYOffset || document.documentElement.scrollTop ||
      document.body.scrollTop || 0;
    if (this.scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }

    //set the Nav-bar anchor on scroll movement 
    this.keepTrack();
  }

  // track thew desktop/mobile view for logo
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenWidth = window.innerWidth;
    this.isDeskTopView = false;
    this.isMobileView = false;
    this.logoVisibility(this.scrollPosition > 50);
  }

  private sections: string[] = ['carousel', 'feature-start', 'about-start', 'fact',
    'service-start', 'video-start', 'faq-start', 'vlog-start', 'contact-start'];
  private navBarElements = {
    'carousel': 'home', 'feature-start': 'home', 'about-start': 'about', 'fact': '',
    'service-start': 'service', 'video-start': '', 'faq-start': 'faq', 'vlog-start': 'vlog', 'contact-start': 'contact'
  };

  currentSection: BehaviorSubject<String> = new BehaviorSubject('home');
  keepTrack() {
    const viewHeight = window.innerHeight;
    let selectedId: string = '';

    //logo visibility in the nav-bar
    this.logoVisibility(this.scrollPosition > 50);

    for (var section of this.sections) {
      const element = document.getElementById(section);
      if (element != null) {
        const rect = element.getBoundingClientRect();
        if (rect.top >= 0 && rect.top < viewHeight / 2) {
          selectedId = this.navBarElements[element.id];
          this.currentSection.next(section);
          if (selectedId !== '') {
            this.setActiveNavBar(selectedId);
          }else if (this.previousActive) {
            this.setActiveNavBar(this.previousActive);
          }
        }
      }
    }
  }

  private logoVisibility(isVisible: boolean) : void{
    if(isVisible){
      this.isDeskTopView = this.screenWidth > 992 ? isVisible : !isVisible;
      this.isMobileView = this.screenWidth > 992 ? !isVisible : isVisible;
    }else{
      this.isMobileView = false;
      this.isDeskTopView = false;
    }
  }

  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    this.setActiveNavBar('home');
  }

  public scrollToElement($element, selctionId: string): boolean {
    $element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    this.setActiveNavBar(selctionId);
    return false; // for preventing the page reload
  }

  private previousActive: string;

  //highlight the selected Nav-Bar anchor in the main menu 
  private setActiveNavBar(selctionId) {
    let selectedAnchor = document.getElementById(selctionId);
    if (this.previousActive) {
      let prev = document.getElementById(this.previousActive);
      prev.className = prev.className.replace('active', '');
    }
    selectedAnchor.className = selectedAnchor.className + ' active';
    this.previousActive = selctionId;
  }

  ngOnInit(): void {

    $('.counter').counterUp({
      delay: 20,
      time: 1000
  });
  this.screenWidth = window.innerWidth;
  this.setActiveNavBar('home');
  }

}
