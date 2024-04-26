import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FullTimeCreate } from '@interfaces/applications/full_time/full-time';
import { file_path } from '@interfaces/documents';
import { FullTimeService } from '@services/applications/full_time/full-time.service';
import Swal from 'sweetalert2';

/**
 * Angular component for selecting a start date for full time application.
 */
@Component({
  selector: 'app-full-time-select-date',
  templateUrl: './full-time-select-date.component.html',
  styleUrls: ['./full-time-select-date.component.scss'],
})
export class FullTimeSelectDateComponent {
  /** Identifier of the full-time event. */
  public id!: number;
  /** List of file paths related to the event. */
  public documents: file_path[] = [];

  /**
   * Constructor of the component.
   * @param fb Instance of FormBuilder for building the form.
   * @param route Instance of ActivatedRoute for getting route parameters.
   * @param fullTimeService Instance of FullTimeService for fetching event data.
   */
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private fullTimeService: FullTimeService,
    private router: Router // Inyecta Router para la navegación entre rutas
  ) {
    // Gets the event ID from the route and loads event data when the component initializes.
    this.route.parent?.params.subscribe((params) => {
      this.id = params['id'];
      this.fullTimeService.getFullTime(this.id).subscribe((data) => {
        console.log(data.full_time);

        this.form.patchValue({
          start_date: data.start_date,
          title: data.full_time.title,
          documents: data.full_time.documents,
        });
      });
    });
  }

  /** Form for selecting the start date and managing documents. */
  public form = this.fb.group({
    start_date: [new Date(), [Validators.required]],
    title: ['', [Validators.required]],
    documents: [this.documents],
  });

  /**
   * Method to set the start date in the form.
   * @param event Event containing the selected start date.
   */
  setDates(event: any) {
    this.form.patchValue({
      start_date: event.start_date,
    });
  }

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
          title: 'Dedicación exclusiva en creación',
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
