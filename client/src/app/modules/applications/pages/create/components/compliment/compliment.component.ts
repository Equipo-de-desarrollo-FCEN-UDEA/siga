import { Location } from '@angular/common';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ComplimentCreate } from '@interfaces/applications/commission';
import { DocumentsResponse, file_path } from '@interfaces/documents';
import { CommissionService } from '@services/applications/commission.service';
import { DocumentService } from '@services/document.service';
import { LoaderService } from '@services/loader.service';
import { throws } from 'assert';
import { Subject, switchMap } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-compliment',
  templateUrl: './compliment.component.html',
  styleUrls: ['./compliment.component.scss']
})
export class ComplimentComponent implements OnInit {

  error = '';
  submitted = false;

  getId: number = 0;

  // Loadder
  isLoading: Subject<boolean> = this.loaderSvc.isLoading;

  // Archivos 
  files: any[] = [];

  archivos = [1];
  public emails: string[] = [];

  public compliment: file_path[] = []

  form: FormGroup;

  correosPredeterminados: any = [
    { nombre: 'Secretaria del CIEN', value: 'dandrea.torres@udea.edu.co' },
    { nombre: 'Programa de Extensión', value: 'dandrea.torres@udea.edu.co' },
    { nombre: 'Fondo de Pasajes Internacionales', value: 'dandrea.torres@udea.edu.co' },
    { nombre: 'Vicerrectoría de Investigación', value: 'david.torresg@udea.edu.co' },
    { nombre: 'Centro de Investigaciones SIU', value: 'david.torresg@udea.edu.co' },
    { nombre: 'Fondos de Vicerrectoría de Docencia', value: 'david.torresg@udea.edu.co' }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    private activateRoute: ActivatedRoute,

    private commissionSvc: CommissionService,
    private documentSvc: DocumentService,
    private loaderSvc: LoaderService
  ) {

    this.activateRoute.params.subscribe(
      (params) => this.getId = params['id']
    )


    this.form = this.formBuilder.group({
      documents: [this.compliment],
      observation: [''],
      emails: [this.emails],
      others: ['']
    })
  }

  ngOnInit(): void {

  }


  // ----------------------------------------------
  // --------------- CHECKBOX CORREOS -------------
  // ---------------------------------------------
  onCheckboxChange(event: any) {

    if (event.target.checked) {
      this.emails.push(event.target.value)

    } else {
      const index = this.emails.indexOf(event.target.value)
      this.emails.splice(index, 1);
    }
  }

  // --------------------------------------------------
  // ----------- MANEJO DE ERRORES EN EL FORM ---------
  // --------------------------------------------------
  get f() {
    return this.form.controls
  }

  // --------------------------------------
  // -------- ARCHIVOS - ANEXOS -----------
  // --------------------------------------

  onUpload(event: Event, index: number) {
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if (file) {
      this.files.splice(index, 1, file);
    }
  }

  removeFile(index: number) {
    if (this.archivos.length > 1) {
      this.archivos.splice(index, 1);
    };
    this.files.splice(index, 1);
  }

  validSize() {
    const size = this.files.map(a => a.size).reduce((a, b) => a + b, 0);
    return size < 2 * 1024 * 1024;
  }

  isInvalidForm(controlName: string) {
    return this.form.get(controlName)?.invalid && this.form.get(controlName)?.touched;
  }

  validFileType() {
    const extensionesValidas = ["png", "jpg", "gif", "jpeg", "pdf"];

    let flag;
    this.files.forEach((file) => {
      flag = extensionesValidas.includes(file.name.split(".")[file.name.split(".").length - 1]);
    })
    return flag;

  }




  // ----------------------------------------
  // ----------- SUBIR CUMPLIDO ------------
  // ----------------------------------------

  submit() {

    this.submitted = true;

    if (this.files.length == 0) {
      this.error = 'Debes subir el cumplido';
      return;
    }

    this.error = ''

    let others_emails = this.form.value.others.split(',')

    this.emails = this.emails.concat(others_emails)

    console.log(this.emails)

    let compliment = this.documentSvc.postDocument(this.files as File[]).pipe(
      switchMap((data: DocumentsResponse) => {
        let body: ComplimentCreate = {
          documents: data.files_paths,
          emails: this.emails,
          observation: this.form.value.observation
        }
        console.log(body)
        return this.commissionSvc.putCompliment(body, this.getId)
      })
    )

    

    // Post cumplido
    Swal.fire({
      title: '¿Seguro que quieres enviar el cumplido?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3AB795',
      confirmButtonText: 'Enviar!',
    }).then((result) => {
      if (result.isConfirmed) {
        compliment.subscribe({
          next: (response) => {
            this.router.navigate(['/home']);
            Swal.fire({
              title: 'Creado!',
              text: '¡El cumplido se creó y envió con éxito!',
              icon: 'success',
              confirmButtonColor: '#3AB795',
            });
          },
          error: (err) => {
            if (err.status === 404 || err.status === 401) {
              this.error = err.error.msg;
            }
          },
        });
      }
    });


  }

}
