import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-emp',
  imports: [ReactiveFormsModule],
  templateUrl: './emp.component.html',
  styleUrl: './emp.component.css',
})
export class EmpComponent {
  employeeApi = inject(EmployeeService);
  cdr = inject(ChangeDetectorRef);
  builder = inject(FormBuilder);


  employees: any[] = [];
  showModal = false;
  empForm = this.builder.group({
    id: ['',],
    name: [''],
    city: [''],
    salary: [''],
    positionId: ['']
  })
  addMode = true;

  ngOnInit() {
    this.showEmployees();
  }
  showEmployees() {
    this.employeeApi.getEmployees().subscribe({
      next: (res: any) => {
        console.log(res.data);
        this.employees = res.data;
        this.cdr.detectChanges();
      },
      error: () => {}
    })
  }

  startShowModal() {
    this.showModal = true;
  }

  startCloseModal() {
    this.showModal = false;
  }

  save() {
    console.log("Mentés.......")
    if(this.addMode){
      this.addEmployee();
    } else {
      this.updateEmployee();
    }
    this.startCloseModal();
    this.showEmployees();
  }

  addEmployee() {
    console.log("Hozzáadás...")
    console.log(this.empForm.value)
    const empForCreate = {
      name: this.empForm.value.name,
      city: this.empForm.value.city,
      salary: this.empForm.value.salary,
      positionId: this.empForm.value.positionId
    }
    this.employeeApi.createEmployee(empForCreate).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  updateEmployee() {
    console.log("Mentés...")
  }
}
