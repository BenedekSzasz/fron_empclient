import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { PositionService } from '../shared/position.service';

@Component({
  selector: 'app-emp',
  imports: [ReactiveFormsModule],
  templateUrl: './emp.component.html',
  styleUrl: './emp.component.css',
})
export class EmpComponent {
  employeeApi = inject(EmployeeService);
  positionApi = inject(PositionService);
  cdr = inject(ChangeDetectorRef);
  builder = inject(FormBuilder);


  employees: any[] = [];
  positions: any[] = [];
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
    this.getEmployees();
    this.getPositions();
  }
  getEmployees() {
    this.employeeApi.getEmployees().subscribe({
      next: (res: any) => {
        console.log(res.data);
        this.employees = res.data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getPositions() {
    this.positionApi.getPosition().subscribe({
      next: (res: any) => {
        console.log(res);
        this.positions = res.data;
        this.cdr.detectChanges();
      }
      ,
      error: (err) => {
        console.log(err);
      }
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
    this.getEmployees();
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
