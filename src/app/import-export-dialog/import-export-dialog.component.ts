import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ArticleBase } from '../model/article';

@Component({
  selector: 'app-import-export-dialog',
  templateUrl: './import-export-dialog.component.html',
  styleUrls: ['./import-export-dialog.component.css']
})
export class ImportExportDialogComponent implements OnInit {
  public data: ArticleBase[] = [];

  constructor(
    public dialogRef: MatDialogRef<ImportExportDialogComponent>
  ) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  openFile(event: any): void {
    this.data = [];

    const input = event.target;

    if (input.files.length) {
      const reader = new FileReader();

      reader.onload = () => {
        const lines: string[] = reader.result.split('\n'),
              testLine: RegExp = new RegExp('\\[(.+)\\]\\((.+)\\)', 'i');

        lines.forEach(element => {
          const trimmedItem: string = element.trim();

          if (trimmedItem) {
            const match = testLine.exec(trimmedItem);

            if (match) {
              this.data.push({
                title: match[1],
                url: match[2]
              });
            }
          }
        });
      }

      reader.readAsText(input.files[0]);
    }
  }
}
