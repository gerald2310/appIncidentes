import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OlvidarContrasennaPage } from './olvidar-contrasenna.page';

describe('OlvidarContrasennaPage', () => {
  let component: OlvidarContrasennaPage;
  let fixture: ComponentFixture<OlvidarContrasennaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OlvidarContrasennaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
