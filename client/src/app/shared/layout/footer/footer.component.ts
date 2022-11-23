import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="p-2">
      ®Equipo de desarrollo de la Facultad de Ciencias Exactas y Naturales
    </footer>
  `,
  styles: [
    `
      footer {
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
