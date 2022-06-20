import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface GeneralDialogData {
  header: string;
  message: string;
}

// TODO: Add icon and colors to different types of dialogs (error, success, warning, info)
@Component({
  template: `
  <h1 mat-dialog-title>{{data.header}}</h1>
  <div mat-dialog-content>{{data.message}}</div>
  `,
})
export class GeneralDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: GeneralDialogData) { }
}
