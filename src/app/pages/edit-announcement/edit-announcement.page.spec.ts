import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditAnnouncementPage } from './edit-announcement.page';

describe('EditAnnouncementPage', () => {
  let component: EditAnnouncementPage;
  let fixture: ComponentFixture<EditAnnouncementPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAnnouncementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
