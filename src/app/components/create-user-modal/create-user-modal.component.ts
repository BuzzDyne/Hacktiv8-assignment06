import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn, ValidationErrors, AbstractControl, FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserOut } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-user-modal',
  templateUrl: './create-user-modal.component.html',
  styleUrls: ['./create-user-modal.component.css']
})
export class CreateUserModalComponent {
  submitted = false
  form: FormGroup

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
      Email           : new FormControl('', [Validators.required, Validators.email]),
      Password        : new FormControl('', [Validators.required, Validators.minLength(6)]),  
      ConfirmPassword : new FormControl('', [Validators.required])
    }, {validator: this.validateConfirmPassword})

   }

   validateConfirmPassword (c: AbstractControl) {
    if (!c.get('ConfirmPassword')?.value) {
       c.get("ConfirmPassword")?.setErrors({required: true})
       return
    }
    
    if((c.get("Password")?.value === c.get("ConfirmPassword")?.value) || !c.get('ConfirmPassword')?.value) {
      c.get("ConfirmPassword")?.setErrors(null)
    } else {
      c.get("ConfirmPassword")?.setErrors({pwMismatch: true})
      
    }
  } 

  get f() {return this.form.controls}

  onSubmit() {
    this.submitted = true

    if(this.form.invalid) {
      return
    }

    // Post
    let u: UserOut = {
      "Title"           : this.f['Title'].value, 
      "FirstName"       : this.f['FirstName'].value, 
      "LastName"        : this.f['LastName'].value, 
      "Role"            : this.f['Role'].value,  
      "Email"           : this.f['Email'].value, 
      "Password"        : this.f['Password'].value, 
      "ConfirmPassword" : this.f['ConfirmPassword'].value
    }

    this.userService.createUser(u).subscribe(
      result => {
        console.log(result);
      },
      error => {
        alert(`Something Bad has happenned!\n Error;{${error}}`)
      },
      () => {
        //OnComplete
        this.activeModal.close("onSuccess")
      }
    )
    

    
  }
  
}