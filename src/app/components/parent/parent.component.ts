import { Component } from '@angular/core';
import {User} from "../../models/user.model";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent {

  sharedUser?: User;

  parentUser: User = {
    id: 0,
    name: '',
    email: ''
  };

  constructor(private userService: UserService) { }

  shareUser() {

  }

  onUpdateUser(user: User) {

  }

  onSelectUser(user: User) {

  }

  saveUser() {

  }

  private updateUser() {

  }

  private createUser() {

  }

  cleanUser() {

  }

}
