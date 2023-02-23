
// then import for use in a component

import { Component, ViewChild } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad';

@Component({
  selector: "app-signature",
  templateUrl: "./signature.component.html",
  styleUrls: ["./signature.component.scss"]
})

export class SignatureComponent{

  //@ViewChild("testPad", { static: true })
  //signaturePadElement: SignaturePadComponent | undefined ;
  signatureImg: string | undefined;

  @ViewChild(SignaturePad)
  signaturePad!: SignaturePad;
  // config: NgSignaturePadOptions = { // passed through to szimek/signature_pad constructor
  //   canvasHeight: 300,
  //   canvasWidth: 500,
  // };
  public signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
    'minWidth': 5,
    'canvasWidth': 500,
    'canvasHeight': 300
  };
  

  constructor() {
  }

  ngAfterViewInit(){
    this.signaturePad?.set('minWidht',2);
    this.signaturePad?.clear();
  }
  public clear() {
    console.log("Probando");
    this.signaturePad?.clear();
    
  }

  public drawStart(){
    console.log('Start drawing')
  }

  public drawComplete(){
    console.log(this.signaturePad?.toDataURL())
  }

  public getImage() {
    let base64Data = this.signaturePad?.toDataURL();
    this.signatureImg = base64Data;
  }

  public isInValid(): boolean {
    return !(this.signaturePad && !this.signaturePad.isEmpty());
  }

  public forceReload() {
    this.signaturePad?.clear();
  }

  moved(event: Event) {
    // works in device not in browser
  }
  clearPad() {
    this.signaturePad.clear();
  }

  savePad() {
    const base64Data = this.signaturePad.toDataURL();
    this.signatureImg = base64Data;
  }
}
