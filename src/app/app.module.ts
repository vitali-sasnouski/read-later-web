import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

/*
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
*/

import { AngularFireModule } from '@angular/fire/compat';

import { environment } from '../environments/environment';

import { AuthService } from './auth/auth.service';

import { UIModule } from './ui/ui.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemEditDialogComponent } from './item-edit-dialog/item-edit-dialog.component';
import { ImportExportDialogComponent } from './import-export-dialog/import-export-dialog.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ArticlesModule } from './articles/articles.module';

@NgModule({
  declarations: [
    AppComponent,
    ItemEditDialogComponent,
    ImportExportDialogComponent,
    LoginComponent,
    PageNotFoundComponent
  ],
  entryComponents: [ ItemEditDialogComponent, ImportExportDialogComponent ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    UIModule,
    ArticlesModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
/*    
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
*/    
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
