import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserIn } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.css']
})
export class EditUserModalComponent implements OnInit {
  @Input() userID: number = 0
  
  submitted = false
  form: FormGroup
  postError: string = ''

  constructor(
    public activeModal: NgbActiveModal, 
    private fb: FormBuilder,
    public userService: UserService
  ) { 
    this.form = this.fb.group({
      Title           : new FormControl('', [Validators.required]),
      FirstName       : new FormControl('', [Validators.required]),
      LastName        : new FormControl('', [Validators.required]),
      Role            : new FormControl('', [Validators.required]),  
      Email           : new FormControl('', [Validators.required, Validators.email])
    })
   }

  ngOnInit() {
    console.log(this.userID);
    
    this.userService.getUserById(this.userID)
      .subscribe(res => {
        this.f['Title'].setValue(res.title)
        this.f['FirstName'].setValue(res.firstName)
        this.f['LastName'].setValue(res.lastName)
        this.f['Role'].setValue(res.role)
        this.f['Email'].setValue(res.email)
      })
  }

  get f() {return this.form.controls}

  onSubmit() {
    let u = {
      "Title"           : this.f["Title"].value,
      "FirstName"       : this.f["FirstName"].value,
      "LastName"        : this.f["LastName"].value,
      "Role"            : this.f["Role"].value,
      "Email"           : this.f["Email"].value,
      "Password"        : "",
      "ConfirmPassword" : ""
    }
    this.userService.updateUser(this.userID, u).subscribe(
      result => {
        console.log(`Updated ${result.Email}`);
      },
      error => {
        this.postError = error
      },
      () => this.activeModal.close("onSuccess")
    )
  }

}
