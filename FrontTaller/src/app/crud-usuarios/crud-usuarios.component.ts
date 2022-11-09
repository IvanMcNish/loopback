import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import { RequestBackendService } from "./../request-backend.service";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: "crud-usuarios",
  templateUrl: "./crud-usuarios.component.html",
  styleUrls: ["./crud-usuarios.component.scss"],
})


export class CrudUsuariosComponent implements OnInit {

  //databes
  datos: any = [];
  nombreUsuarioSeleccionado = "";
  displayedColumns: string[] = ["nombre", "telefono", "tipoUsuario", "fechaNacimiento", "Gestion",
  ];
  dataSource = new MatTableDataSource(this.datos);
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //end-databes

  formUser: FormGroup = new FormGroup({});


  constructor(private servicioBackend: RequestBackendService, private fb: FormBuilder, public dialog: MatDialog) {
    this.getUsers();

    this.formUser = this.fb.group({
      nombre: [""],
      telefono: [""],
      tipoUsuario: [""],
      fechaNacimiento: ["2022-11-08T00:22:27.812Z"],
      contrasenia: ["111"],
      sedeId: ["63557cfb71cf34a13bd99ad7"],
    });
  }

  ngOnInit(): void { }


  // cambiarTitulo(): void {
  //   this.titulo = 'He cambiado de nombre, ahora me llamo de Maicol';
  // }

  focusBuscar(): void {
    console.log("hizo focus");
  }

  blurBuscar(): void {
    console.log("salio del focus");
  }

  seleccionarNombre(nombreNuevo: string): void {
    this.nombreUsuarioSeleccionado = nombreNuevo;
  }

  getUsers(): void {
    this.servicioBackend.getData("propietarios").subscribe(
      (data) => {
        console.log(data);
        this.datos = data;

      },

      (error) => {
        console.log("Error: " + error);
      }
    );
  }

  saveUser(): void {
    const datosUser = this.formUser.getRawValue();
    console.log(datosUser);

    this.servicioBackend
      .postData("usuarios", JSON.stringify(datosUser))
      .subscribe({
        next: (data) => {
          console.log(data);
          this.getUsers();
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          console.log("complete");
        },
      });
  }

  //crud de iconos

  eliminar(): void {
    this.dialog.open(EliminarDialog, {
      width: '50%',
      height: "auto",
      
    });
  }
  editar(): void {
    this.dialog.open(EditarDialog, {
      width: '50%',
      height: "auto",
      
    });
  }
  actualizar(): void {
    this.dialog.open(ActualizarDialog, {
      width: '50%',
      height: "auto",
      
    });

  }

}

@Component({
  selector: 'eliminar',
  templateUrl: 'eliminar.html',
})
export class EliminarDialog {
  constructor(public dialogRef: MatDialogRef<EliminarDialog>) {}
}

@Component({
  selector: 'editar',
  templateUrl: 'editar.html',
})
export class EditarDialog {
  constructor(public dialogRef: MatDialogRef<EditarDialog>) {}
}


@Component({
  selector: 'actualizar',
  templateUrl: 'actualizar.html',
})
export class ActualizarDialog {
  constructor(public dialogRef: MatDialogRef<ActualizarDialog>) {}
}