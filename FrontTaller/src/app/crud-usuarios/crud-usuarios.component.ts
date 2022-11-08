import { Component, OnInit } from '@angular/core';
import { RequestBackendService } from '../request-backend.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'crud-usuarios',
  templateUrl: './crud-usuarios.component.html',
  styleUrls: ['./crud-usuarios.component.scss'],
})
export class CrudUsuariosComponent implements OnInit {
  titulo = 'Hola';

  value = '';

  edad = 0;
  nombreUsuarioSeleccionado = '';

  displayedColumns: string[] = [
    'nombre',
    'telefono',
    'tipoUsuario',
    'fechaNacimiento',
  ];
  datos = [];

  formUser: FormGroup = new FormGroup({});

  constructor(
    private servicioBackend: RequestBackendService,
    private fb: FormBuilder
  ) {
    this.getUsers();

    this.formUser = this.fb.group({
      nombre: [''],
      telefono: [''],
      tipoUsuario: [''],
      fechaNacimiento: ['2022-11-08T00:22:27.812Z'],
      contrasenia: ['111'],
      sedeId: ['63557cfb71cf34a13bd99ad7'],
    });
  }

  ngOnInit(): void {}

  // cambiarTitulo(): void {
  //   this.titulo = 'He cambiado de nombre, ahora me llamo de Maicol';
  // }

  focusBuscar(): void {
    console.log('hizo focus');
  }

  blurBuscar(): void {
    console.log('salio del focus');
  }

  seleccionarNombre(nombreNuevo: string): void {
    this.nombreUsuarioSeleccionado = nombreNuevo;
  }

  getUsers(): void {
    this.servicioBackend.getData('propietarios').subscribe(
      (data) => {
        console.log(data);
        this.datos = data;
      },

      (error) => {
        console.log('Error: ' + error);
      }
    );
  }

  saveUser(): void {
    const datosUser = this.formUser.getRawValue();
    console.log(datosUser);

    this.servicioBackend
      .postData('usuarios', JSON.stringify(datosUser))
      .subscribe({
        next: (data) => {
          console.log(data);
          this.getUsers();
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          console.log('complete');
        },
      });
  }
}
