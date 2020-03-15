import { Component } from '@angular/core';

import { LoadingService } from './loading.service';
import { UpdateService } from './update.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(private loadingService: LoadingService,
    private updateService: UpdateService) { }
}
