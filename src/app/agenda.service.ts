import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { catchError, map, Observable, throwError } from 'rxjs';
import { GeneralDialogComponent } from './general-dialog/general-dialog.component';
import { MentorAgenda, MyCalendarItem } from './agenda.models';
import { AgendaDBAdapterService, mentorAgendaAdapter } from './agenda.adapters';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {
  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private agendaDBAdapterService: AgendaDBAdapterService,
  ) { }

  // Showing a error dialog with the given header and message
  private openDialog(header: string, message: string) {
    this.dialog.open(GeneralDialogComponent, {
      data: { header, message },
    });
  }

  // https://cfcalendar.docs.apiary.io/#reference/0/mentors-agenda/list-all-allocated-slots
  getMentorAgenda(mentorId: string): Observable<MentorAgenda> {
    const url = `${environment.apiUrl}/mentors/${mentorId}/agenda`;

    return this.http.get<MentorAgenda>(url)
      .pipe(
        catchError(error => {
          console.error(error);
          this.openDialog('Error', 'Error fetching mentor agenda');
          return throwError(() => error);
        }),
        map(response => mentorAgendaAdapter(response)),
      );
  }

  // Getting my agenda
  getMyAgenda() {
    return this.agendaDBAdapterService.getMyCalendarItems().pipe(
      catchError(error => {
        console.error(error);
        this.openDialog('Error', 'Error fetching my agenda');
        return throwError(() => error);
      }),
    );
  }

  // Requesting a video call
  requestVideoCall(item: MyCalendarItem) {
    return this.agendaDBAdapterService.save(item).pipe(
      catchError(error => {
        console.error(error);
        this.openDialog('Error', 'Error requesting a video call');
        return throwError(() => error);
      }),
    );
  }
}
