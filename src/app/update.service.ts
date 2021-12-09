import { Injectable } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';

import { MatSnackBar } from '@angular/material/snack-bar';

import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor(private swUpdate: SwUpdate, private snackBar: MatSnackBar) {
    const updatesAvailable = swUpdate.versionUpdates.pipe(
      filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'),
      map(evt => ({
        type: 'UPDATE_AVAILABLE',
        current: evt.currentVersion,
        available: evt.latestVersion,
      }))).subscribe({
        next: (event) => {
          updatesAvailable.unsubscribe();

          const snackBarRef = this.snackBar.open('Доступна новая версия', 'Обновить', { duration: 6000 });

          snackBarRef.onAction().subscribe(() => {
            window.location.reload();
          });
      }});
  }
}
