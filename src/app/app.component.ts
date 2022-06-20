import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as dayjs from 'dayjs';
import { filter } from 'rxjs';
import { AgendaFormComponent } from './agenda-form/agenda-form.component';
import { MentorAgenda, MyAgenda, MyCalendarItem } from './agenda.models';
import { AgendaService } from './agenda.service';
import { GeneralDialogComponent } from './general-dialog/general-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  dateSelectedValue: Date = new Date();
  public set dateSelected(v: Date) {
    this.dateSelectedValue = v;
    this.dateSelectedChanged();
  }
  public get dateSelected(): Date {
    return this.dateSelectedValue;
  }

  hours: string[] = [];
  mentorAgenda: MentorAgenda = new MentorAgenda();
  myAgenda: MyAgenda = new MyAgenda();
  calendarItemsPerHour = new Map();

  constructor(
    private agendaService: AgendaService,
    public dialog: MatDialog,
  ) {
    // Generate the hours array
    for (let i = 0; i < 24; i++) {
      this.hours.push(i < 10 ? `0${i}:00` : `${i}:00`);
    }
  }

  ngOnInit() {
    // Todo: Get the mentor id from the user
    const mentorId = '1';
    this.getMentorAgenda(mentorId);
    this.getMyAgenda();
  }

  getMentorAgenda(mentorId: string) {
    // Get the mentor agenda for the selected date
    this.agendaService.getMentorAgenda(mentorId).subscribe(mentorAgenda => {
      this.mentorAgenda = mentorAgenda;
      this.getCalendarItems();
    });
  }

  getMyAgenda() {
    // Get my agenda for the selected date
    this.agendaService.getMyAgenda().subscribe(myAgenda => {
      this.myAgenda = new MyAgenda({ calendar: myAgenda });
      this.getCalendarItems();
    });
  }

  // The selected date has changed
  dateSelectedChanged() {
    this.getCalendarItems();
  }

  // Get the calendar items for the given date
  getCalendarItems() {
    // Getting the list of the mentor's calendar items for the selected date
    const mentorSelectedDateCalendarItems = this.mentorAgenda.getCalendarItems(this.dateSelected);

    // Clear the calendar items per hour
    this.calendarItemsPerHour = new Map();

    mentorSelectedDateCalendarItems.forEach(calendarItem => {
      const hour = calendarItem.getHour();
      this.calendarItemsPerHour.set(hour, calendarItem);
    });

    // Getting the list of my calendar items for the selected date
    const mySelectedDateCalendarItems = this.myAgenda.getCalendarItems(this.dateSelected);

    mySelectedDateCalendarItems.forEach(calendarItem => {
      const hour = calendarItem.getHour();
      this.calendarItemsPerHour.set(hour, calendarItem);
    });
  }

  isHourBooked(hour: string) {
    return this.calendarItemsPerHour.has(hour);
  }

  requestVideoCall(hour: string) {
    if (this.isHourBooked(hour)) {
      this.dialog.open(GeneralDialogComponent, {
        data: {
          header: 'Is booked!',
          message: 'Your mentor is already busy at the selected time, please try to book a video call on a free time slot',
        },
      });
      return;
    }

    const baseDate = dayjs(this.dateSelected).format('YYYY-MM-DD');
    const dateTime = dayjs(`${baseDate} ${hour}:00`).toDate();
    const dialogRef = this.dialog.open(AgendaFormComponent, {
      data: { dateTime },
    });

    dialogRef.afterClosed().pipe(filter(result => !!result))
      .subscribe((result: MyCalendarItem) => {
        const dateTime = dayjs(result.dateTime).format('DD.MM.YYYY HH:00');
        this.dialog.open(GeneralDialogComponent, {
          data: {
            header: 'Requested successfully!',
            message: `Your video call is booked on "${dateTime}" with the reason: "${result.reason}"`,
          },
        });
        this.getMyAgenda();
      });
  }
}
