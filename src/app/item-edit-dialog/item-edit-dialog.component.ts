import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ArticleBase } from '../model/article';

@Component({
  selector: 'app-item-edit-dialog',
  templateUrl: './item-edit-dialog.component.html',
  styleUrls: ['./item-edit-dialog.component.css']
})
export class ItemEditDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ItemEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ArticleBase
  ) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
