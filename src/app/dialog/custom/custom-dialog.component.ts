import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { SafeHtmlPipe } from '../dialog-sanitizer-html.pipe';
import { CustomDialogModel } from './custom-dialog.model';
import { TypedDialog } from '../dialog.base';

/**
 * Este componente es utilizado por del provider "DialogProvider" y sirve para mostrar un mensajes costomizables.
 *
 * Usage example:
 * @example
 *
 * @Injectable({ providedIn: "root" })
 * export class DialogProvider {
 *     custom = (data: CustomDialogModel, options?: {
 *      panelClass?: 'message-dialog-warning' | 'message-dialog-info' | 'message-dialog-success' | 'message-dialog-error',
 *      backdropClass?: string,
 *      autoFocus?: boolean,
 *      disableClose?: boolean,
 *      widthPx?: number,
 *   }): MatDialogRef<CustomDialogComponent> => this.showFromComponent(CustomDialogComponent, {
 *      data,
 *      panelClass: options?.panelClass ?? 'message-dialog-info',
 *      backdropClass: options?.backdropClass ?? "message-dialog-backdrop",
 *      autoFocus: options?.autoFocus ?? false,
 *      disableClose: options?.disableClose ?? false,
 *      width: options?.widthPx ? `${options?.widthPx}px` : '500px',
 *    });
 *   }
 *
 *  @Component({
 *    selector: 'app-root',
 *    standalone: true,
 *  })
 *  export class AppComponent {
 *    inject(DialogProvider).dialogProvider.custom({
 *        content: 'Contenido custom',
 *        actions: {
 *          confirmButtonText: 'Confirma',
 *          cancelButtonText: 'Cancelar',
 *        },
 *        icon: 'info',
 *        title: 'Custom'
 *      }, {
 *        autoFocus: false,
 *        disableClose: false,
 *        widthPx: 800,
 *      });
 *  }
*/
@Component({
  selector: 'app-custom-dialog',
  templateUrl: './custom-dialog.component.html',
  styleUrl: './custom-dialog.component.scss',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, MatIconModule, MatDialogModule, MatButtonModule, SafeHtmlPipe],
})
export class CustomDialogComponent extends TypedDialog<CustomDialogComponent, CustomDialogModel> {
  onClick = (confirm: boolean): void => this.dialogRef.close(confirm);
}
