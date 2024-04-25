import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
//interfaces
import { file_path } from '@interfaces/documents';
import { filter} from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent implements OnInit {
  // Files
  @Input() files: any[] = [];
  public document_new= [1];
  @Input() documents: file_path[] | any = [];
  @Input() documentsToDelete: string[] = []
  @Input() applycationType: number = 0;

  public errorMessage: string | null = null;

  public form: FormGroup;
  activatedComponentReference: any;
  route: any;

  get f() {
    return this.form.controls;
  }
  constructor(
    private fb: FormBuilder,
    private router: Router
    ) {
    this.form = this.fb.group({
      documents: [],
    });
  }

  // Subir un archivo
  onUpload(event: Event, index: number) {
    if (this.files.length >= 3 && !this.files[index]) {
      // Si ya hay 3 archivos y el archivo en el índice especificado no existe,
      // no añadir el nuevo archivo.
      return;
    }
    const ELEMENT = event.target as HTMLInputElement;
    const FILE = ELEMENT.files?.item(0);
    if (FILE) {
      if (this.files[index]) {
        // Si el archivo en el índice especificado existe, reemplazarlo.
        this.files.splice(index, 1, FILE);
      } else if (this.files.length < 3) {
        // Si el archivo en el índice especificado no existe y hay menos de 3 archivos,
        // añadir el nuevo archivo.
        this.files.push(FILE);
      }
    }
  }

  // Eliminar achivos
  removeFile(index: number) {
    if (this.document_new.length > 1) {
    this.document_new.splice(index, 1);};
    this.files.splice(index, 1);
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
// metodo que valida que el numero de archivos a subir no sea mayor a 3
  validFileCount() {
    // Comprobar si la longitud de 'this.documents' y 'this.files' es exactamente 3
    if (this.documents.length + this.files.length <= 3) {
      return true;
    }
    return false;
  }
  
  invalidFile() {
    return this.validSize() && this.validFileType() && this.validFileCount();
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
}
