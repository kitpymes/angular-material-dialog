import { Component, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { DialogProvider } from './dialog/dialog.provider';
import { ExternalComponent } from './external-component/external-component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatButtonToggleModule, MatButtonModule, MatDialogModule, MatSlideToggleModule, MatIconModule, MatCheckboxModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  @ViewChild('secondDialog') secondDialog!: TemplateRef<any>;

  dialogProvider = inject(DialogProvider);

  ngOnInit(): void {

  }

  onValChange(value: any) {
    const message = "Este es un mensaje";

    switch (value) {
      case 'info':
        this.dialogProvider.info(message);
        break;

      case 'success':
        this.dialogProvider.success(message);
        break;

      case 'error':
        this.dialogProvider.error(message);
        break;

      case 'warning':
        this.dialogProvider.warning(message);
        break;

      case 'confirm':
        const confirmDialog = this.dialogProvider.confirm(message, {
          cancelButtonText: 'Cancelar',
          confirmButtonText: 'Grabar',
          title: 'Esta seguro que quiere pasar ?',
          icon: 'info'
        });

        confirmDialog.componentInstance.onClick = (confirm: boolean) => {
          console.log({ confirm });
          confirmDialog.close();
        };
        break;

      case 'custom':
        const customDialog = this.dialogProvider.custom({
          content: 'Contenido custom',
          actions: {
            confirmButtonText: 'Confirma',
            cancelButtonText: 'Cancelar',
          },
          icon: 'info',
          title: 'Custom'
        }, {
          autoFocus: false,
          disableClose: false,
          widthPx: 800,
        });

        customDialog.componentInstance.onClick = (confirm: boolean) => {
          console.log({ confirm });
          customDialog.close();
        };
        break;

      case 'fromComponent':
        const fromComponentDialogRef = this.dialogProvider.showFromComponent(ExternalComponent, {
          minWidth: '200px',
          width: '400px',
          data: {
            title: 'Esto es un Titulo',
            firstname: 'Pedro'
          }
        });

        const fromComponentSubscription = fromComponentDialogRef.componentInstance.onSubmitEvent.subscribe((values) => {
          console.log('submited values: ', values);
          fromComponentDialogRef.close();
        });

        fromComponentDialogRef.afterClosed().subscribe(() => fromComponentSubscription?.unsubscribe());
        break;

      default:
        break;
    }
  }

  openDialogWithTemplateRef(templateRef: TemplateRef<any>) {
    const fromTemplateDialogRef = this.dialogProvider.showFromTemplate(templateRef, {
      minWidth: '200px',
      width: '400px',
      data: {
        title: 'Esto es un Titulo',
        content: `The content of this dialog came from an Mind-blowing, right? (However, this wasn't passed in to a method while the other one was)`
      }
    });
  }

  openDialogWithoutRef() {
    const fromTemplateDialogRef = this.dialogProvider.showFromTemplate(this.secondDialog, {
      minWidth: '200px',
      width: '400px',
      data: {
        title: 'Esto es un Titulo',
        content: `The content of this dialog came from an Mind-blowing, right? (However, this wasn't passed in to a method while the other one was)`
      }
    });
  }
}
