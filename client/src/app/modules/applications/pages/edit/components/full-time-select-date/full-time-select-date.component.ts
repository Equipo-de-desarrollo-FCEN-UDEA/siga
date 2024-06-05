import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'; // Importa FormBuilder y Validators para trabajar con formularios reactivos
import { ActivatedRoute, Router } from '@angular/router'; // Importa ActivatedRoute y Router para obtener parámetros de ruta y navegar entre rutas
import { FullTimeCreate } from '@interfaces/applications/full_time/full-time'; // Importa FullTimeCreate desde el módulo de aplicaciones a tiempo completo
import { file_path } from '@interfaces/documents'; // Importa file_path desde el módulo de documentos
import { FullTimeService } from '@services/applications/full_time/full-time.service'; // Importa FullTimeService para realizar operaciones relacionadas con eventos a tiempo completo
import Swal from 'sweetalert2'; // Importa Swal para mostrar mensajes emergentes de forma atractiva

/**
 * Angular component for selecting a start date for full time application.
 */
@Component({
  selector: 'app-full-time-select-date', // Selector del componente
  templateUrl: './full-time-select-date.component.html', // Plantilla HTML del componente
  styleUrls: ['./full-time-select-date.component.scss'], // Estilos del componente
})
export class FullTimeSelectDateComponent {
  /** Identifier of the full-time event. */
  public id!: number; // Identificador del evento a tiempo completo

  /** List of file paths related to the event. */
  public documents: file_path[] = []; // Lista de rutas de archivos relacionados con el evento

  /**
   * Constructor of the component.
   * @param fb Instance of FormBuilder for building the form.
   * @param route Instance of ActivatedRoute for getting route parameters.
   * @param fullTimeService Instance of FullTimeService for fetching event data.
   */
  constructor(
    private fb: FormBuilder, // Inyecta el FormBuilder para construir formularios
    private route: ActivatedRoute, // Inyecta ActivatedRoute para obtener parámetros de ruta
    private fullTimeService: FullTimeService, // Inyecta FullTimeService para obtener datos del evento
    private router: Router // Inyecta Router para la navegación entre rutas
  ) {
    // Gets the event ID from the route and loads event data when the component initializes.
    // Obtiene el ID del evento de la ruta y carga los datos del evento cuando el componente se inicializa.
    this.route.parent?.params.subscribe((params) => {
      this.id = params['id']; // Obtiene el ID del evento de los parámetros de la ruta
      this.fullTimeService.getFullTime(this.id).subscribe((data) => {
        // Obtiene datos del evento a través del servicio FullTimeService
        this.form.patchValue({
          start_date: data.start_date, // Establece la fecha de inicio en el formulario
          title: data.full_time.title, // Establece el título del evento en el formulario
          documents: data.full_time.documents, // Establece los documentos relacionados con el evento en el formulario
        });
      });
    });
  }

  /** Form for selecting the start date and managing documents. */
  public form = this.fb.group({
    start_date: [new Date(), [Validators.required]], // Campo de fecha de inicio en el formulario
    title: ['', [Validators.required]], // Campo de título en el formulario
    documents: [this.documents], // Campo de documentos en el formulario
  });

  /**
   * Method to set the start date in the form.
   * @param event Event containing the selected start date.
   */
  setDates(event: any) {
    this.form.patchValue({
      start_date: event, // Método para establecer la fecha de inicio en el formulario
    });
  }

  /**
   * Method to submit the form data.
   */
  submit() {
    let fullTime = this.fullTimeService.putFullTime(
      this.form.value as FullTimeCreate, // Envía los datos del formulario al servicio FullTimeService
      this.id // Envía el ID del evento al servicio FullTimeService
    );
    fullTime.subscribe({
      next: (res) => {
        // Suscripción al resultado de la operación
        Swal.fire({
          // Muestra un mensaje emergente utilizando Swal
          allowOutsideClick: false,
          title: 'Dedicación exclusiva',
          text: 'La fecha se actualizó con éxito',
          confirmButtonText: 'Continuar',
          confirmButtonColor: '#3AB795',
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/solicitudes/lista']); // Navega a la lista de solicitudes después de la confirmación
          }
        });
      },
    });
  }
}
