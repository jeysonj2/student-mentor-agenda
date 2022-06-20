import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MentorAgenda, MyCalendarItem } from './agenda.models';

@Injectable({
  providedIn: 'root'
})
// Faking a database backend using the localStorage
export class AgendaDBAdapterService {
  // Saving my calendar item in the localstorage
  save(item: MyCalendarItem): Observable<MyCalendarItem[]> {
    // Getting the current data in the localStorage
    const items = localStorage.getItem('myCalendarItems') || '[]';
    const myCalendarItems = JSON.parse(items);

    // Adding the new item into the array of MyCalendarItem
    myCalendarItems.push({
      date_time: item.dateTime,
      reason: item.reason,
    });

    // Saving the new list
    localStorage.setItem('myCalendarItems', JSON.stringify(myCalendarItems));

    // Returning the updated list
    const list = myCalendarItems.map((myItem: any) => new MyCalendarItem(myItem));
    return of(list);
  }

  // Get the list of saved MyCalendarItem
  getMyCalendarItems(): Observable<MyCalendarItem[]> {
    const items = localStorage.getItem('myCalendarItems') || '[]';
    const myCalendarItems = JSON.parse(items);
    const list = myCalendarItems.map((myItem: any) => new MyCalendarItem(myItem));
    return of(list);
  }
}

export const mentorAgendaAdapter = (response: any): MentorAgenda => new MentorAgenda(response);
