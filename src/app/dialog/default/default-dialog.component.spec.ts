import { TestBed, waitForAsync, ComponentFixture } from '@angular/core/testing';
import { DefaultDialogComponent } from "./default-dialog.component";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DefaultDialogModel } from "./default-dialog.model";

describe('DefaultDialogComponent', () => {
  const CONFIG = {
    fixture: <ComponentFixture<DefaultDialogComponent>>{},
    component: <DefaultDialogComponent>{},
    mock: {
      data: <DefaultDialogModel>{
        icon: 'info',
        title: 'Titulo',
        content: 'Contenido',
        actions: {
          cancelButtonText: 'Cancelar',
          confirmButtonText: 'Confirmar',
        }
      },
      ref: {
        close: () => { },
      }
    }
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [DefaultDialogComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: CONFIG.mock.data },
        { provide: MatDialogRef, useValue: CONFIG.mock.ref }
      ]
    }).compileComponents().then(() => {
      CONFIG.fixture = TestBed.createComponent(DefaultDialogComponent);
      CONFIG.component = CONFIG.fixture.componentInstance;
      CONFIG.fixture.detectChanges();
    });
  }));

  it('should be created', waitForAsync(() => {
    expect(CONFIG.component).toBeTruthy();
  }));

  it('should be contain ICON data', waitForAsync(() => {
    const tag = document.querySelector('.message-dialog-title-icon');

    expect(tag!.innerHTML).toContain(CONFIG.mock.data.icon!);
  }));

  it('should be contain TITLE data', waitForAsync(() => {
    const tag = document.querySelector('.message-dialog-title-text');

    expect(tag!.innerHTML).toContain(CONFIG.mock.data.title!);
  }));

  it('should be contain CONTENT data', waitForAsync(() => {
    const tag = document.querySelector('.message-dialog-content');

    expect(tag!.innerHTML).toContain(CONFIG.mock.data.content);
  }));
});
