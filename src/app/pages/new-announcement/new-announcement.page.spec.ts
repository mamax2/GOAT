import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewAnnouncementPage } from './new-announcement.page';

describe('NewAnnouncementPage', () => {
  let component: NewAnnouncementPage;
  let fixture: ComponentFixture<NewAnnouncementPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAnnouncementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
