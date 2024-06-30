import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EstadoIncidenciaPage } from './estado-incidencia.page';

describe('EstadoIncidenciaPage', () => {
  let component: EstadoIncidenciaPage;
  let fixture: ComponentFixture<EstadoIncidenciaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadoIncidenciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
