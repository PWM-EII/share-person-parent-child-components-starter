import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {User} from "../../models/user.model";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  @Output()
  onParentUserSelected = new EventEmitter<User>();

  users: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {

  }

  selectUser(id: number) {

  }

}
