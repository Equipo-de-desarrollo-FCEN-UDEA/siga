import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { file_path } from '@interfaces/documents';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss'],
})
export class DocumentsComponent implements OnInit {
  // Files
  public files: any[] = [];
  public archivos = [1];
  public documents: file_path[] = [];

  @Output() sendForm = new EventEmitter<any>();

  public form = this.fb.group({
    documents: [this.documents],
  });

  constructor(private fb: FormBuilder) {}

  // --------------------------------------
  // -------- ARCHIVOS - ANEXOS -----------
  // --------------------------------------

  send() {
    this.sendForm.emit(this.form.value);
  }

  //ENVIA EL FORMULARIO AL COMPONENTE PADRE EN ESTE CASO ECONOMIC SUPPORT COMPONENT
  sendForms() { return this.files; }

  // --------------------------------------
  // -------- ARCHIVOS - ANEXOS -----------
  // --------------------------------------

  onUpload(event: Event, index: number) {
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if (file) {
      this.files[index] = file;
    }
    console.log(this.files);
  }

  removeFile(index: number) {
    this.files[index] = undefined;
    console.log(this.files);
  }

  validSize() {
    const FILTERED_FILES = this.files.filter((file) => file !== undefined);
    const SIZE = FILTERED_FILES.map((file) => file?.size || 0).reduce(
      (a, b) => a + b,
      0
    );
    return SIZE < 2 * 1024 * 1024;
  }

  validFileType() {
    const validExtensions = ['png', 'jpg', 'gif', 'jpeg', 'pdf'];
    let flag = true;
    this.files.forEach((file) => {
      const fileExtension = file?.name.split('.').pop()?.toLowerCase();
      if (!validExtensions.includes(fileExtension)) {
        flag = false;
      }
    });

    return flag;
  }

  ngOnInit(): void {}
}
