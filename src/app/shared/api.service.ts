import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
    host = 'http://localhost:8000';
    http = inject(HttpClient);

    getEmployees() {
      let url = `${this.host}/api/employees/`;
      return this.http.get(url);
    }
}
