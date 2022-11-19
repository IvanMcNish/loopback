import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import { RequestBackendService } from "./../request-backend.service";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import Swal from "sweetalert2";
import { NuevoMecaDialog } from "../crud-usuarios/crud-usuarios.component";

@Component({
  selector: 'crud-revisiones',
  templateUrl: './crud-revisiones.component.html',
  styleUrls: ['./crud-revisiones.component.scss']
})
export class CrudRevisionesComponent implements OnInit {

  datos: any = [];
  nombreUsuarioSeleccionado = "";
  displayedColumns: string[] = [
    "idRevision",
    "fecha",
    "estado",
    "observaciones",
    "vehiculoId",
    "mecanicoId",
    "Gestion",
  ];
  dataSource = new MatTableDataSource(this.datos);
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //end-databes

  formRevi: FormGroup = new FormGroup({});

  constructor(
    private servicioBackend: RequestBackendService,
    public fb: FormBuilder,
    public dialog: MatDialog
  ) {
    this.getUsers();



    this.formRevi = this.fb.group({
      idRevision: [""],
      fecha: ["2022-11-11T03:24:13.349Z"],
      estado: [""],
      observaciones: [""],
      vehiculoId: [""],
      mecanicoId: [""],
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
    this.servicioBackend.getData("revisions").subscribe(
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
    const datosUser = this.formRevi.getRawValue();
    console.log(datosUser);

    this.servicioBackend
      .postData("revisions", JSON.stringify(datosUser))
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
  

  nuevoRevision(): void {
    this.dialog.open(NuevaRevisionDialog, {
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
        this.servicioBackend.deleteData("revisions", code).subscribe({
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
  selector: "nueva-revision",
  templateUrl: "nueva-revision.html",
})
export class NuevaRevisionDialog {
  constructor(public dialogRef: MatDialogRef<NuevaRevisionDialog>) {}

  guardar() {
    Swal.fire({
      icon: "success",
      title: "Registro guardado",
      showConfirmButton: true,
    });
  }
} 


