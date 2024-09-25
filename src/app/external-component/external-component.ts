import { Component, EventEmitter, Signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { ExternalRequest } from './external.model';
import { TypedDialog } from '../dialog/dialog.base';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-external-component',
  standalone: true,
  styleUrl: './external-component.scss',
  templateUrl: './external-component.html',
  imports: [CommonModule, ReactiveFormsModule],
})
export class ExternalComponent extends TypedDialog<ExternalComponent, ExternalRequest> {
  profileForm!: FormGroup;
  onSubmitEvent = new EventEmitter<any>();

  title = this.data.title;

  constructor(private fb: FormBuilder) {
    super();

    this.profileForm = this.fb.group({
      firstname: new FormControl(this.data.firstname, Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      gender: new FormControl(''),
      country: new FormControl(''),
    });
  }

  onSubmit() {
    if (!this.profileForm.invalid) {
      this.onSubmitEvent.emit(this.profileForm.value);
    }
  }
}
