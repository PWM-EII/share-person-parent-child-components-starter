import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {User} from "../../models/user.model";

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnChanges {

  @Input() sharedUser?: User;

  @Output()
  onParentUserUpdated = new EventEmitter<User>();

  childUser: User = {
    id: 0,
    name: '',
    email: ''
  };

  ngOnChanges(changes: SimpleChanges): void {

  }

  updateUser() {

  }

}
