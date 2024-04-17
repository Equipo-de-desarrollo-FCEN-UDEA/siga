import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ApplicationTypesService } from '@services/application-types.service';


//interfaces
import { file_path } from '@interfaces/documents';
import { filter, map } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent implements OnInit {
  // Files
  public files: any[] = [];
  public document_new = [1];
  public documentsToDelete: string[] = []
  @Input() documents: file_path[] | any = [];
  @Input() applycationType: number = 0;

  @Output() documentsValues = new EventEmitter<any>();
  @Output() filesValues: EventEmitter<any[]> = new EventEmitter<any[]>();

  // arrayEmitter: EventEmitter<any[]> = new EventEmitter<any[]>();

  public form: FormGroup;
  activatedComponentReference: any;
  route: any;

  get f() {
    return this.form.controls;
  }
  

  constructor(
    private applicationTypeSvc: ApplicationTypesService,
    private fb: FormBuilder,
    private router: Router
    ) {
    this.form = this.fb.group({
      documents: [],
    });
  }

  // --------------------------------------
  // -------- ARCHIVOS - ANEXOS -----------
  // --------------------------------------

  // Subir un archivo
  onUpload(event: Event, index: number) {
    const ELEMENT = event.target as HTMLInputElement;
    const FILE = ELEMENT.files?.item(0);
    if (FILE) {
      this.files.splice(index, 1, FILE);
    }
  }

  // Eliminar achivos
  removeFile(index: number) {
    if (this.files.length > 0) {
      this.files.splice(index, 1);};
  }

  // Verifica el tamaño de los archivos que se van a adjuntar al permiso, max:2MB
  validSize() {
    const SIZE = this.files.map((a) => a.size).reduce((a, b) => a + b, 0);
    return SIZE < 6 * 1024 * 1024;
  }

// Verifica que el o los archivos a adjuntar sea de un tipo valido
  validFileType() {
    const VALID_EXTENSIONS = ['png', 'jpg', 'gif', 'jpeg', 'pdf'];

    const docs_subidos: string[] = [];
    for (let eachfile of this.files){
      if (VALID_EXTENSIONS.includes(eachfile.name.split('.')[eachfile.name.split('.').length - 1])) {
        docs_subidos.push(eachfile);
      }
    }
    if (docs_subidos.length == this.files.length){
      return true;
    }
    return false; 
  }

  onChanged(): void {
    this.documentsValues.emit(this.form.value);
  }

  EmitFiles(): void {
    this.filesValues.emit(this.files);
  }

  invalidFile() {
    return this.validSize() && this.validFileType();
  }

  deleteDocument(path: string, i: number) {
    Swal.fire({
      title: "Eliminar documento",
      text: "¿Está seguro de querer eliminar este documento?, no podrá recuperarlo",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Eliminar",
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3AB795'
    }).then(result => {
      if (result.isConfirmed) {
        this.documentsToDelete = this.documentsToDelete.concat([path]);
        this.documents.splice(i, 1);
      }
    })

  }

  public isEditRoute: boolean | undefined;
  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.isEditRoute = this.router.url.includes('editar');
    });
  }

  consol() {
    console.log(this.applycationType);
  }
}
