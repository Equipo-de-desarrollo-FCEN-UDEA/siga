import { HttpParams } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { DocumentService } from '@services/document.service';

@Pipe({
  name: 'getDocument'
})
export class GetDocumentPipe implements PipeTransform {

  constructor(private documentService: DocumentService) {}
  
  transform(path: string): any {
    return this.documentService.getDocument(path)
  }

}
