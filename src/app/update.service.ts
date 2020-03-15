import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor(private swUpdate: SwUpdate, private snackBar: MatSnackBar) {
    this.swUpdate.available.subscribe(event => {
      const snackBarRef = this.snackBar.open('Доступна новая версия', 'Обновить', { duration: 6000 });

      snackBarRef.onAction().subscribe(() => {
        window.location.reload();
      });
    });
  }
}
