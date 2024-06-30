import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsignaIncidenciasPage } from './asigna-incidencias.page';

describe('AsignaIncidenciasPage', () => {
  let component: AsignaIncidenciasPage;
  let fixture: ComponentFixture<AsignaIncidenciasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignaIncidenciasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
