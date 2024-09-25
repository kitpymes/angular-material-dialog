import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { DefaultDialogModel } from './default-dialog.model';
import { TypedDialog } from '../dialog.base';

/**
 * Este componente es utilizado por del provider "DialogProvider" y sirve para mostrar un mensajes comunes.
 *
 * Usage example:
 * @example
 *
 * @Injectable({ providedIn: "root" })
 * export class DialogProvider {
 *     info = (message: string, title = 'Info'): MatDialogRef<DefaultDialogComponent> => this.showFromComponent(DefaultDialogComponent, {
 *         data: <DefaultDialogModel>{ icon: 'info', title, content: message },
 *        panelClass: 'message-dialog-info',
 *        backdropClass: "message-dialog-backdrop",
 *        autoFocus: false
 *      });
 *   }
 *
 *  @Component({
 *    selector: 'app-root',
 *    standalone: true,
 *  })
 *  export class AppComponent {
 *    inject(DialogProvider).dialogProvider.info('Mensaje', 'Titulo');
 *  }
*/
@Component({
	templateUrl: './default-dialog.component.html',
  styleUrl: './default-dialog.component.scss',
	standalone: true,
  encapsulation: ViewEncapsulation.None,
	imports: [CommonModule, MatIconModule, MatDialogModule, MatButtonModule],
})
export class DefaultDialogComponent extends TypedDialog<DefaultDialogComponent, DefaultDialogModel> {
}
