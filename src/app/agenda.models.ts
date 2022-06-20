import * as dayjs from 'dayjs';

export class Mentor {
  name: string;
  timeZone: string;

  constructor(data?: Mentor) {
    this.name = data?.name || '';
    this.timeZone = data?.timeZone || (data as any)?.time_zone || '';
  }
}

export class CalendarItem {
  dateTime: Date;

  constructor(data?: CalendarItem) {
    this.dateTime = dayjs(data?.dateTime || (data as any)?.date_time).toDate();
  }

  // Returns the hour of the date as a string in the format HH:00
  getHour(): string {
    return dayjs(this.dateTime).format('HH:00');
  }
}

export class Agenda {
  calendar: CalendarItem[];

  constructor(data?: Agenda) {
    this.calendar = (data?.calendar || []).map(item => new CalendarItem(item));
  }

  // Get the calendar items for the given date
  getCalendarItems(date: Date): CalendarItem[] {
    return this.calendar.filter(item => dayjs(item.dateTime).isSame(date, 'day')) || [];
  }
}

export class MentorAgenda extends Agenda {
  mentor: Mentor;

  constructor(data?: MentorAgenda) {
    super(data);
    this.mentor = new Mentor(data?.mentor);
  }
}

export class MyCalendarItem extends CalendarItem {
  reason: string;

  constructor(data?: MyCalendarItem) {
    super(data);
    this.reason = data?.reason || '';
  }
}

export class MyAgenda extends Agenda {
  override calendar: MyCalendarItem[];

  constructor(data?: any) {
    super();
    this.calendar = (data?.calendar || []).map((item: any) => new MyCalendarItem(item));
  }
}
