import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorNombreComponent } from './editor-nombre.component';

describe('EditorNombreComponent', () => {
  let component: EditorNombreComponent;
  let fixture: ComponentFixture<EditorNombreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorNombreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditorNombreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
