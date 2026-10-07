import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PositionService {
  http = inject(HttpClient);
  host = 'http://localhost:8000';


  getPosition() {
    const url = this.host + "/api/positions";
    return this.http.get(url);
  }
  
}
