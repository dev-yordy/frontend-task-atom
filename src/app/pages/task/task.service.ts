import { Injectable } from '@angular/core';
import { env } from '../../../environments/enviroment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedResponse } from '../../shared/models/pagination-response';
import { Task } from './models/task.model';
import { SimpleResponse } from '../../shared/models/api-response';

const API_BASE = env.baseAPI;

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  getTasks(
    page: number = 1,
    limit: number = 5
  ): Observable<PaginatedResponse<Task>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<PaginatedResponse<Task>>(`${API_BASE}/task/getAll`, { params });
  }

  createTask(taskData: any): Observable<SimpleResponse> {
    return this.http.post<SimpleResponse>(`${API_BASE}/task/create`, taskData);
  }

  updateTask(taskId: string, taskData: any): Observable<SimpleResponse> {
    return this.http.put<SimpleResponse>(`${API_BASE}/task/update/${taskId}`, taskData);
  }

  deleteTask(taskId: string): Observable<SimpleResponse> {
    return this.http.delete<SimpleResponse>(`${API_BASE}/task/delete/${taskId}`);
  }

  completeTasks(taskIds: string[]): Observable<SimpleResponse> {
    return this.http.post<SimpleResponse>(`${API_BASE}/task/complete`, { taskIds });
  }
}
