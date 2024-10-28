import { Component, OnInit } from '@angular/core';
import { TaskService } from './task.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SnackbarService } from '../../shared/services/snackbar.service';
import { ConfirmComponent } from '../../shared/components/confirm/confirm.component';
import { Task } from './models/task.model';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    MatPaginatorModule,
    MatTableModule,
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent implements OnInit {
  displayedColumns: string[] = [
    'completar',
    'Titulo',
    'Descripcion',
    'TareaCreada',
    'Estado',
    'actions',
  ];
  dataSource: Task[] = [];
  totalRecords: number = 0;
  page: number = 1;
  limit: number = 10;
  selectedTaskIds: string[] = [];

  constructor(
    private taskService: TaskService,
    private dialog: MatDialog,
    private snack: SnackbarService,
    private confirmDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  openCreateTaskDialog(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.taskService.createTask(result).subscribe((res) => {
          this.snack.open(res.message);
          this.loadTasks();
        });
      }
    });
  }

  loadTasks(): void {
    this.taskService.getTasks(this.page, this.limit).subscribe({
      next: (response) => {
        this.dataSource = response.data;
        this.totalRecords = response.totalRecords;
      },
      error: (error: HttpErrorResponse) => {
        this.snack.open(error.message || 'Error no controlado');
      },
    });
  }

  onPageChange(event: any): void {
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.loadTasks();
  }

  openEditTaskDialog(task: Task): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '500px',
      data: { task },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.taskService.updateTask(task.id!, result).subscribe({
          next: (res) => {
            this.snack.open(res.message);
            this.loadTasks();
          },
          error: (error: HttpErrorResponse) => {
            this.snack.open(error.message || 'Error no controlado');
          },
        });
      }
    });
  }

  deleteTask(taskId: string): void {
    const dialogRef = this.confirmDialog.open(ConfirmComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.taskService.deleteTask(taskId).subscribe({
          next: (res) => {
            this.loadTasks();
            this.snack.open(res.message);
          },
          error: (error: HttpErrorResponse) => {
            this.snack.open(error.message || 'Error no controlado');
          },
        });
      }
    });
  }

  toggleSelection(taskId: string): void {
    if (this.selectedTaskIds.includes(taskId)) {
      this.selectedTaskIds = this.selectedTaskIds.filter((id) => id !== taskId);
    } else {
      this.selectedTaskIds.push(taskId);
    }
  }

  toggleSelectAll(isChecked: boolean): void {
    if (isChecked) {
      this.selectedTaskIds = this.dataSource.map((task) => task.id!);
    } else {
      this.selectedTaskIds = [];
    }
  }

  areAllTasksSelected(): boolean {
    return this.selectedTaskIds.length === this.dataSource.length;
  }

  completeSelectedTasks(): void {
    if (this.selectedTaskIds.length === 0) {
      this.snack.open('No has seleccionado ninguna tarea');
      return;
    }

    this.taskService.completeTasks(this.selectedTaskIds).subscribe({
      next: (res) => {
        this.snack.open(res.message);
        this.loadTasks();
      },
      error: (error: HttpErrorResponse) => {
        this.snack.open(error.message || 'Error no controlado');
      },
    });
  }
}
