import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MyCalendarItem } from '../agenda.models';
import { AgendaService } from '../agenda.service';

@Component({
  templateUrl: './agenda-form.component.html',
  styleUrls: ['./agenda-form.component.scss']
})
export class AgendaFormComponent implements OnInit {
  form = this.fb.group({
    dateTime: new FormControl<Date>(new Date(), Validators.required),
    reason: new FormControl<string>('', Validators.required),
  });

  constructor(
    private agendaService: AgendaService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AgendaFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { dateTime: Date; },
  ) { }

  ngOnInit(): void {
    this.form.get('dateTime')?.setValue(this.data.dateTime);
  }

  save() {
    const item = new MyCalendarItem((this.form.value as MyCalendarItem));
    this.agendaService.requestVideoCall(item).subscribe(() => this.dialogRef.close(item));
  }
}
