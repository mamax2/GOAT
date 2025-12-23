import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnnunciPage } from './annunci.page';

describe('AnnunciPage', () => {
  let component: AnnunciPage;
  let fixture: ComponentFixture<AnnunciPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnunciPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
