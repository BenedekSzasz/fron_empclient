import { Component, inject } from '@angular/core';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-emp',
  imports: [],
  templateUrl: './emp.component.html',
  styleUrl: './emp.component.css',
})
export class EmpComponent {
  api = inject(ApiService);

  employees: any[] = [];

  ngOnInit() {
    this.showEmployees();
  }
  showEmployees() {
    this.api.getEmployees().subscribe({
      next: (res: any) => {
        console.log(res.data);
        this.employees = res.data;
      },
      error: () => {}
    })
  }

}
