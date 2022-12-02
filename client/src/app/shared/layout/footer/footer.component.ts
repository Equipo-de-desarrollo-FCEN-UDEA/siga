import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer>
      ®Equipo de desarrollo de la Facultad de Ciencias Exactas y Naturales
    </footer>
  `,
  styles: [
    `
      footer {
        height: 3em;
        text-align: center;
        background-color: rgba(2, 105, 55, 1);
        color: #fff;
        width: 100%;
        position: fixed;
        bottom: 0;
      }
    `,
  ],
})
export class FooterComponent {}
