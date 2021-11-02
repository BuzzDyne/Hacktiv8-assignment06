import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserIn, UserOut } from './models/User';
import { UserService } from './services/user.service';
import { isEmailExistErrorMsg } from './utils/Utils';
import { CreateUserModalComponent } from './components/create-user-modal/create-user-modal.component';
import { EditUserModalComponent } from './components/edit-user-modal/edit-user-modal.component';
import { DeleteUserModalComponent } from './components/delete-user-modal/delete-user-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'crud-staff';
  users : UserIn[] = []
  postError : any

  toastText: string = ""
  isToastShowing: boolean = false

  constructor(
    private modalService: NgbModal,
    public userService: UserService) {
      
      this.refreshUserTable()
      
    }

  ngOnInit() {
    
  }

  refreshUserTable() {
    this.userService.getAllUsers().subscribe(res => this.users = res)
  }

  open() {
    const modalRef = this.modalService.open(CreateUserModalComponent).result.then(
      (res) => { //Success (closed)
        console.log(`Res = ${res}`);
        if(res == "onSuccess") {
          // TODO 1 
          // this.modalService.open(CreateUserModalComponent)
          this.showToast("Data Created!")
          this.refreshUserTable()
        }
      }, 
      (reason) => { //Dismissed
        console.log(`Reason = ${reason}`);
      }
    )
  }

  handleCreate() {
    let u = {
      "Title"           : "Mr", 
      "FirstName"       : "TUkang", 
      "LastName"        : "Post", 
      "Role"            : "User",  
      "Email"           : "postpost1@gmail.com", 
      "Password"        : "password", 
      "ConfirmPassword" : "password"
    }

    this.userService.createUser(u).subscribe(
      result => {
        console.log(result);
        alert(`Result :${result}`)
      },
      error => {
        this.postError = error
        console.log(error)
      },
      () => {
        alert(`On Complete`)
        // this.refreshUserTable()
      }
    )
  }

  handleEdit(id: number) {
    const modalRef = this.modalService.open(EditUserModalComponent)
    modalRef.componentInstance.userID = id

    modalRef.result.then(
      (res) => { //Success (closed)
        console.log(`Res = ${res}`);
        if(res == "onSuccess") {
          // TODO 1 
          // this.modalService.open(CreateUserModalComponent)
          this.showToast("Data Edited!")
          this.refreshUserTable()
        }
      }, 
      (reason) => { //Dismissed
        console.log(`Reason = ${reason}`);
      }
    )

  }

  handleDelete(id: number) {
    const modalRef = this.modalService.open(DeleteUserModalComponent)
    modalRef.componentInstance.userID = id

    modalRef.result.then(
      (res) => { //Success (closed)
        this.userService.deleteUserById(id).subscribe(() => this.refreshUserTable())
        this.showToast("Data Deleted!")
      }, 
      (reason) => { //Dismissed
        console.log(`Reason = ${reason}`);
      }
    )


  }

  showToast(text: string) {
    this.toastText = text
    this.isToastShowing = true
  }

  onToastHidden() {
    this.isToastShowing = false
    // setTimeout(() => this.isToastShowing = true, 2000);
  }
}