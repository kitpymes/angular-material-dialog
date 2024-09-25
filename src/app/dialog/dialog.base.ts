import { inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

export abstract class TypedDialog<TComponent, TData, TResult = any> {
  dialogRef = inject<MatDialogRef<TComponent, TResult>>(MatDialogRef);
  data: TData = inject(MAT_DIALOG_DATA);
}
