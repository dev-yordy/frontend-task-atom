import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-task-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    CommonModule,
    MatButtonModule,
  ],
  templateUrl: './task-dialog.component.html',
  styleUrl: './task-dialog.component.scss',
})
export class TaskDialogComponent implements OnInit {
  taskForm: FormGroup;
  isEditMode: boolean;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!data?.task;

    this.taskForm = this.fb.group({
      Titulo: [data?.task?.Titulo || '', [Validators.required]],
      Descripcion: [data?.task?.Descripcion || ''],
    });
  }

  ngOnInit(): void {}

  onSave(): void {
    if (this.taskForm.valid) {
      const taskData = {
        ...this.taskForm.value,
        Titulo: this.taskForm.value.Titulo.trim(),
      };
      this.dialogRef.close(taskData);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
