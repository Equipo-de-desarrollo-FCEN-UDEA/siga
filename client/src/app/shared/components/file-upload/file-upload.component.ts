import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//interfaces
import { file_path } from '@interfaces/documents';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent implements OnInit {
  // Files
  public files: any[] = [];
  public document_new = [1];
  @Input() documents: file_path[] | any = [];

  @Output() documentsValues = new EventEmitter<any>();
  @Output() filesValues: EventEmitter<any[]> = new EventEmitter<any[]>();

  // arrayEmitter: EventEmitter<any[]> = new EventEmitter<any[]>();

  public form: FormGroup;
  activatedComponentReference: any;

  get f() {
    return this.form.controls;
  }

  constructor(private fb: FormBuilder) {
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
    if (this.document_new.length > 1) {
      this.document_new.splice(index, 1);};
    this.files.splice(index, 1);
  }

  // Verifica el tamaño de los archivos que se van a adjuntar al permiso, max:2MB
  validSize() {
    const SIZE = this.files.map((a) => a.size).reduce((a, b) => a + b, 0);
    return SIZE < 6 * 1024 * 1024;
  }

  // Verifica que el archivo a adjuntar sea de un tipo valido
  validFileType() {
    const VALID_EXTENSIONS = ['png', 'jpg', 'gif', 'jpeg', 'pdf'];

    let flag = true;
    this.files.forEach((file) => {
      // separa el último punto del nombre del archivo para verificar su tipo
      flag = VALID_EXTENSIONS.includes(
        file.name.split('.')[file.name.split('.').length - 1]
      );
    });
    return flag;
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


  ngOnInit(): void {}
}
