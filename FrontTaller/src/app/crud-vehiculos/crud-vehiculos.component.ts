import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import { RequestBackendService } from "./../request-backend.service";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import Swal from "sweetalert2";



const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success ',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false //cambiarlo a false cuando se vincule con boostrap
})
@Component({
  selector: 'crud-vehiculos',
  templateUrl: './crud-vehiculos.component.html',
  styleUrls: ['./crud-vehiculos.component.scss'],
})
export class CrudVehiculosComponent implements OnInit {
  //databes
  datos: any = [];
  nombreUsuarioSeleccionado = "";
  displayedColumns: string[] = ["idPlaca","tipo", "marca", "cilindraje", "propietarioId","anio", "Gestion",
  ];
  dataSource = new MatTableDataSource(this.datos);
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //end-databes

  formVehi: FormGroup = new FormGroup({});


  constructor(private servicioBackend: RequestBackendService, private fb: FormBuilder, public dialog: MatDialog) {
    this.getUsers();

    this.formVehi = this.fb.group({
      idPlaca:[""],
      tipo: [""],
      marca: [""],
      cilindraje: [""],
      propietarioId: ["111"],
      capacidadPasajeros:[],
      paisOrigen: ["2"],
      accesorios: ["2"],
      anio:[""],
      
    });
  }

  ngOnInit(): void { }
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
    this.servicioBackend.getData("vehiculos").subscribe(
      (data) => {
        console.log(data);
        this.datos = data;

      },

      (error) => {
        console.log("Error: " + error);
      }
    );
  }

  saveVehi(): void {
    const datosUser = this.formVehi.getRawValue();
    console.log(datosUser);

    this.servicioBackend
      .postData("vehiculos", JSON.stringify(datosUser))
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
      width: '50%',
      height: "auto",
      
    });
  }

  trabajo(): void {
    Swal.fire('Esta acción se encuentra en desarrollo')
  }  


  deleteVahiculo(code: string): void {
    Swal.fire({
      text: "¿Seguro desea eliminar este registro?",
      icon: "warning",
      confirmButtonColor: "green",
      confirmButtonText: "Si, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.servicioBackend.deleteData("vehiculos", code).subscribe({
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

  nuevovehi(): void {
    this.dialog.open(NuevoVehiDialog, {
      width: '50%',
      height: "500px",

      
    });

  }

}





@Component({
  selector: 'editar',
  templateUrl: 'editar.html',
})
export class EditarDialog {
  constructor(public dialogRef: MatDialogRef<EditarDialog>) {}
  guardar() {
    Swal.fire({      
      icon: 'success',
      title: 'Registro actualizado',
      showConfirmButton: true,
    })
  }
}

@Component({
  selector: 'nuevovehiculo',
  templateUrl: 'nuevovehiculo.html',
})
export class NuevoVehiDialog {
  constructor(public dialogRef: MatDialogRef<NuevoVehiDialog>) {}

  guardar() {
    Swal.fire({      
      icon: 'success',
      title: 'Registro guardado',
      showConfirmButton: true,
    })

  }
  
}