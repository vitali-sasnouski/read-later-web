import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

import { UIModule } from './ui/ui.module';
import { AppComponent } from './app.component';
import { ItemEditDialogComponent } from './item-edit-dialog/item-edit-dialog.component';
import { ImportExportDialogComponent } from './import-export-dialog/import-export-dialog.component';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    ItemEditDialogComponent,
    ImportExportDialogComponent
  ],
  entryComponents: [ ItemEditDialogComponent, ImportExportDialogComponent ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    UIModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
