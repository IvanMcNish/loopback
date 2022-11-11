import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import { RequestBackendService } from "./../request-backend.service";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import Swal from "sweetalert2";






@Component({
  selector: "crud-usuarios",
  templateUrl: "./crud-usuarios.component.html",
  styleUrls: ["./crud-usuarios.component.scss"],
})
export class CrudUsuariosComponent implements OnInit {
  btnAbrirModal=document.getElementById("#btnAbrirModal");
  btnCerrarModal=document.getElementById("#btnCerrarModal");

  modal=document.querySelector("#modal-cliente-nuevo");

  //databes
  datos: any = [];
  nombreUsuarioSeleccionado = "";
  displayedColumns: string[] = [
    "idPropietario",
    "nombre",
    "telefono",
    "correo",
    "ciudad",
    "sedeId",
    "Gestion",
  ];
  dataSource = new MatTableDataSource(this.datos);
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //end-databes

  formUser: FormGroup = new FormGroup({});

  constructor(
    private servicioBackend: RequestBackendService,
    public fb: FormBuilder,
    public dialog: MatDialog
  ) {
    this.getUsers();



    this.formUser = this.fb.group({
      idPropietario: [""],
      nombre: [""],
      telefono: [""],
      contrasenia: ["111"],
      fechaNacimiento: ["2022-11-11T03:24:13.349Z"],
      correo: [""],
      ciudad: [""],
      sedeId: ["t"],
    });
  }

  ngOnInit(): void {}

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
      .postData("propietarios", JSON.stringify(datosUser))
      .subscribe({
        next: (data) => {
          console.log(data);
          this.getUsers();
          Swal.fire({
            icon: "success",
            title: "Registro guardado",
            showConfirmButton: true,
          });
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

  editar(): void {
    this.dialog.open(EditarDialog, {
      width: "50%",
      height: "auto",
    });
  }

  trabajoenprogreso(){
    Swal.fire({
      icon: 'info',
      text:"Esta opción se encuentra en desarrollo",
      timer:2000,
      timerProgressBar: true,
      showConfirmButton: false,
    })
  }
  

  nuevocliente(): void {
    this.dialog.open(NuevoclieDialog, {
      width: "50%",
      height: "500px",
    });
  }

  nuevomeca(): void {
    this.dialog.open(NuevoMecaDialog, {
      width: "50%",
      height: "auto",
    });
  }



  deleteUser(code: string): void {
    Swal.fire({
      text: "¿Seguro desea eliminar este registro?",
      icon: "warning",
      confirmButtonColor: "green",
      confirmButtonText: "Si, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.servicioBackend.deleteData("propietarios", code).subscribe({
          next: (data) => {
            console.log(data);
            this.getUsers();
            Swal.fire("Ok", "Registro eliminado con exito", "success");
          },
          error: (error) => {
            console.log(error);
            Swal.fire("Usuario no eliminado", "Ocurrio un error", "error");
          },
          complete: () => {
            console.log("complete");
          },
        });
      }
    });
  }

}

@Component({
  selector: "editar",
  templateUrl: "editar.html",
})
export class EditarDialog {
  constructor(public dialogRef: MatDialogRef<EditarDialog>) {}
  guardar() {
    Swal.fire({
      icon: "success",
      title: "Registro actualizado",
      showConfirmButton: true,
    });
  }
}

@Component({
  selector: "nuevo-clie",
  templateUrl: "nuevo-clie.html",
})
export class NuevoclieDialog {
  constructor(public dialogRef: MatDialogRef<NuevoclieDialog>) {}

  guardar() {
    Swal.fire({
      icon: "success",
      title: "Registro guardado",
      showConfirmButton: true,
    });
  }
  
}

@Component({
  selector: "nuevo-meca",
  templateUrl: "nuevo-meca.html",
})
export class NuevoMecaDialog {
  constructor(public dialogRef: MatDialogRef<NuevoMecaDialog>) {}

  guardar() {
    Swal.fire({
      icon: "success",
      title: "Registro guardado",
      showConfirmButton: true,
    });
  }
}


