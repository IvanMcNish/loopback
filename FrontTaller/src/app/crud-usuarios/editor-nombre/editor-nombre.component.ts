import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'editor-nombre',
  templateUrl: './editor-nombre.component.html',
  styleUrls: ['./editor-nombre.component.scss'],
})
export class EditorNombreComponent implements OnInit {
  @Input() nombre = '';
  @Output() salidaCambioNombre = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  cambiarNombre(): void {
    this.salidaCambioNombre.next(this.nombre);
  }
}
