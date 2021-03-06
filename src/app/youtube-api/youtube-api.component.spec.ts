import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YoutubeApiComponent } from './youtube-api.component';

describe('YoutubeApiComponent', () => {
  let component: YoutubeApiComponent;
  let fixture: ComponentFixture<YoutubeApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YoutubeApiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YoutubeApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
