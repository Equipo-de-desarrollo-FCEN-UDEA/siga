
// then import for use in a component

import { Component, ViewChild } from '@angular/core';
import {
  NgSignaturePadOptions,
  SignaturePadComponent,
  } from "@almothafar/angular-signature-pad"

@Component({
  selector: "app-signature",
  templateUrl: "./signature.component.html",
  styleUrls: ["./signature.component.scss"]
})

export class SignatureComponent{

  //@ViewChild("testPad", { static: true })
  //signaturePadElement: SignaturePadComponent | undefined ;
  signatureImg: string | undefined;

  @ViewChild(SignaturePadComponent)
  signaturePadElement!: SignaturePadComponent;
  // config: NgSignaturePadOptions = { // passed through to szimek/signature_pad constructor
  //   canvasHeight: 300,
  //   canvasWidth: 500,
  // };

  signaturePadOptions: Object = { 
    'minWidth': 2,
    'canvasWidth': 500,
    'canvasHeight': 200
  };


  constructor() {
  }

  ngAfterViewInit(){
    this.signaturePadElement?.set('minWidht',2);
    this.signaturePadElement?.clear();
  }
  public clear() {
    console.log("Probando");
    this.signaturePadElement?.clear();
    
  }

  public drawStart(event:Event){
    console.log('Start drawing')
  }

  public drawComplete(){
    console.log(this.signaturePadElement?.toDataURL())
  }

  public getImage() {
    let base64Data = this.signaturePadElement?.toDataURL();
    this.signatureImg = base64Data;
    console.log(this.signaturePadElement?.toDataURL());
  }

  public isInValid(): boolean {
    return !(this.signaturePadElement && !this.signaturePadElement.isEmpty());
  }

  moved(event: Event) {
    // works in device not in browser
  }

  public forceReload() {
    this.signaturePadElement?.clear();
  }
}
