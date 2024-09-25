
import { TestBed, waitForAsync, ComponentFixture } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

import { CustomDialogComponent } from './custom-dialog.component';
import { CustomDialogModel } from './custom-dialog.model';

describe('CustomDialogComponent', () => {
  const CONFIG = {
    fixture: <ComponentFixture<CustomDialogComponent>>{},
    component: <CustomDialogComponent>{},
    mock: {
      data: <CustomDialogModel>{
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
      imports: [CustomDialogComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: CONFIG.mock.data },
        { provide: MatDialogRef, useValue: CONFIG.mock.ref }
      ]
    }).compileComponents().then(() => {
      CONFIG.fixture = TestBed.createComponent(CustomDialogComponent);
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

  it('should call CLOSE onClick when clicked', waitForAsync(() => {
    spyOn(CONFIG.component, 'onClick');
    const button = CONFIG.fixture.debugElement.nativeElement.querySelector('.message-dialog-actions-close-button');
    button.click();

    expect(CONFIG.component.onClick).toHaveBeenCalled();
  }));

  it('should call CONFIRM onClick when clicked', waitForAsync(() => {
    spyOn(CONFIG.component, 'onClick');
    const button = CONFIG.fixture.debugElement.nativeElement.querySelector('.message-dialog-actions-confirm-button');
    button.click();

    expect(CONFIG.component.onClick).toHaveBeenCalled();
  }));

  it('dialog should be closed after onClick(false)', waitForAsync(() => {
    const spy = spyOn(CONFIG.component.dialogRef, 'close').and.callThrough();
    CONFIG.component.onClick(false);

    expect(spy).toHaveBeenCalled();
  }));

  it('dialog should be closed after onClick(true)', waitForAsync(() => {
    const spy = spyOn(CONFIG.component.dialogRef, 'close').and.callThrough();
    CONFIG.component.onClick(true);

    expect(spy).toHaveBeenCalled();
  }));
});
