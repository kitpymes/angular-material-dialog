import { Injectable, TemplateRef, EmbeddedViewRef, inject, Type } from '@angular/core';
import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { MatDialog, MatDialogConfig, MatDialogRef, } from '@angular/material/dialog';

import { TypedDialog } from './dialog.base';
import { DefaultDialogModel } from './default/default-dialog.model';
import { DefaultDialogComponent } from './default/default-dialog.component';
import { CustomDialogComponent } from './custom/custom-dialog.component';
import { CustomDialogModel } from './custom/custom-dialog.model';
import { DialogProvider } from './dialog.provider';
import { of } from 'rxjs';

describe('DialogProvider', () => {
  const mockData = {
    data: {
      icon: 'error',
      title: 'Titulo',
      content: 'Contenido'
    }
  };

  let dialogProvider: DialogProvider;
  let dialogSpy: jasmine.Spy;

  let dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of({}), close: null });
  dialogRefSpyObj.componentInstance = mockData;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [DialogProvider],
    }).compileComponents().then(() => {
      dialogProvider = TestBed.inject(DialogProvider);
      dialogSpy = spyOn(TestBed.inject(MatDialog), 'open').and.returnValue(dialogRefSpyObj);
    });
  }));

  it('info dialog', () => {
    const ref = dialogProvider.info(mockData.data.content, mockData.data.title);

    expect(ref.componentInstance.data.title).toContain(mockData.data.title);
    expect(ref.componentInstance.data.content).toContain(mockData.data.content);
    expect(dialogSpy).toHaveBeenCalled();
  });

  it('success dialog', () => {
    const ref = dialogProvider.success(mockData.data.content, mockData.data.title);

    expect(ref.componentInstance.data.title).toContain(mockData.data.title);
    expect(ref.componentInstance.data.content).toContain(mockData.data.content);
    expect(dialogSpy).toHaveBeenCalled();
  });

  it('warning dialog', () => {
    const ref = dialogProvider.warning(mockData.data.content, mockData.data.title);

    expect(ref.componentInstance.data.title).toContain(mockData.data.title);
    expect(ref.componentInstance.data.content).toContain(mockData.data.content);
    expect(dialogSpy).toHaveBeenCalled();
  });

  it('error dialog', () => {
    const ref = dialogProvider.error(mockData.data.content, mockData.data.title);

    expect(ref.componentInstance.data.title).toContain(mockData.data.title);
    expect(ref.componentInstance.data.content).toContain(mockData.data.content);
    expect(dialogSpy).toHaveBeenCalled();
  });

  it('confirm dialog', () => {
    const ref = dialogProvider.confirm(mockData.data.content, {
      title: mockData.data.title,
      icon: mockData.data.icon,
      cancelButtonText: '',
      confirmButtonText: ''
    });

    expect(ref.componentInstance.data.title).toContain(mockData.data.title);
    expect(ref.componentInstance.data.content).toContain(mockData.data.content);
    expect(dialogSpy).toHaveBeenCalled();
  });

  it('custom dialog', () => {
    const ref = dialogProvider.custom({
      title: mockData.data.title,
      icon: mockData.data.icon,
      actions: {
        cancelButtonText: '',
        confirmButtonText: '',
      },
      content: mockData.data.content
    });

    expect(ref.componentInstance.data.title).toContain(mockData.data.title);
    expect(ref.componentInstance.data.content).toContain(mockData.data.content);
    expect(dialogSpy).toHaveBeenCalled();
  });
});
