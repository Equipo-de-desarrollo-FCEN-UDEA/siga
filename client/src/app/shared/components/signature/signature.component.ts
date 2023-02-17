
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

  @ViewChild("testPad", { static: true })
  signaturePadElement: SignaturePadComponent | undefined ;

  config: NgSignaturePadOptions = { // passed through to szimek/signature_pad constructor
    canvasHeight: 300,
    canvasWidth: 500,
  };

  constructor() {
    // no-op
  }
  public clear() {
    if (!this.signaturePadElement?.isEmpty){
      this.signaturePadElement?.clear();
    }
  }

  public drawStart(){
    console.log('Start drawing')
  }

  public drawComplete(){
    console.log(this.signaturePadElement?.toDataURL())
  }

  public getImage() {
    console.log(this.signaturePadElement?.toDataURL());
  }

  public isInValid(): boolean {
    return !(this.signaturePadElement && !this.signaturePadElement.isEmpty());
  }

  public forceReload() {
    this.signaturePadElement?.clear();
  }
}
