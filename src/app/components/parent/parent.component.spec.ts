import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { ChildComponent } from '../child/child.component';
import { ParentComponent } from './parent.component';
import {UserListComponent} from "../user-list/user-list.component";
import {By} from "@angular/platform-browser";

describe('ParentComponent', () => {
  let component: ParentComponent;
  let fixture: ComponentFixture<ParentComponent>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParentComponent, ChildComponent, UserListComponent],
      imports: [FormsModule],
      providers: [UserService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
  });


  test('should update parentUser', () => {
    const user: User = {id: 1, name: 'John Doe', email: 'johndoe@example.com'};
    component.onSelectUser(user);

    expect(component.parentUser).toEqual(user);
  });


  test('should reset parentUser and sharedUser', () => {
    component.parentUser = {id: 3, name: 'Bob Smith', email: 'bobsmith@example.com'};
    component.sharedUser = {id: 4, name: 'Alice Smith', email: 'alicesmith@example.com'};
    component.cleanUser();

    expect(component.parentUser).toEqual({id: 0, name: '', email: ''});
    expect(component.sharedUser).toBeUndefined();
  });


  test('should update parentUser and reset sharedUser', () => {
    const user: User = {id: 6, name: 'Alice Johnson', email: 'alicejohnson@example.com'};
    component.sharedUser = {id: 7, name: 'Bob Johnson', email: 'bobjohnson@example.com'};
    component.onUpdateUser(user);

    expect(component.parentUser).toEqual(user);
    expect(component.sharedUser).toBeUndefined();
  });


  test('should create a new user when user ID is 0', () => {
    const createUserSpy =
      jest.spyOn(userService, 'createUser');
    const updateUserSpy =
      jest.spyOn(userService, 'updateUser');

    component.parentUser = {
      id: 0,
      name: 'John',
      email: 'john@example.com',
    };
    component.saveUser();

    expect(createUserSpy).toHaveBeenCalledWith(component.parentUser);
    expect(updateUserSpy).not.toHaveBeenCalled();
  });

  test('should update an existing user when user ID is not 0', () => {
    const createUserSpy =
      jest.spyOn(userService, 'createUser');
    const updateUserSpy =
      jest.spyOn(userService, 'updateUser');

    component.parentUser = {
      id: 1,
      name: 'John',
      email: 'john@example.com',
    };
    component.saveUser();

    expect(updateUserSpy).toHaveBeenCalledWith(component.parentUser);
    expect(createUserSpy).not.toHaveBeenCalled();
  });


  test('should copy parentUser to sharedUser', () => {
    component.parentUser = {id: 5, name: 'John Smith', email: 'johnsmith@example.com'};
    component.shareUser();

    expect(component.sharedUser).toEqual(component.parentUser);
  });

  test('should update parent user when a user is selected from list', () => {
    const userList = fixture.debugElement.componentInstance;
    const user =
      { id: 2, name: 'Jane Smith', email: 'janesmith@example.com' };

    userList.onSelectUser(user);

    expect(component.parentUser).toEqual(user);
  });

  test('should copy parentUser to sharedUser when a user is selected', () => {
    const userList = fixture.debugElement.componentInstance;
    const user =
      { id: 2, name: 'Jane Smith', email: 'janesmith@example.com' };

    userList.onSelectUser(user);
    component.shareUser();

    expect(component.sharedUser).toEqual(component.parentUser);
  });


  test('should update parent user when child component emits an event', () => {
    const childComponent =
      fixture.debugElement.query(By.directive(ChildComponent)).componentInstance;
    const user =
      { id: 3, name: 'Bob Johnson', email: 'bobjohnson@example.com' };

    childComponent.onParentUserUpdated.emit(user);

    expect(component.parentUser).toEqual(user);
  });

  test('should hide "Share" button when parent user has an ID=0', () => {
    component.parentUser = { id: 0, name: 'New User', email: 'newuser@example.com' };
    fixture.detectChanges();
    const shareButton = fixture.nativeElement.querySelector('button[data-test="share"]');

    expect(shareButton).toBeFalsy();
  });

  test('should show "Share" button when parent user has not an ID=0', () => {
    component.parentUser = { id: 6, name: 'New User', email: 'newuser@example.com' };
    fixture.detectChanges();
    const shareButton = fixture.nativeElement.querySelector('button[data-test="share"]');

    expect(shareButton).toBeTruthy();
  });

  test('should disable "Save" button when parent user is undefined', () => {

    const saveButton = fixture.nativeElement.querySelector('button[data-test="save"]');

    expect(saveButton.disabled).toBeTruthy();
  });

  test('should enable "Save" button when parent user is not undefined', () => {
    component.parentUser = { id: 0, name: 'New User', email: 'newuser@example.com' };
    fixture.detectChanges();
    const saveButton = fixture.nativeElement.querySelector('button[data-test="save"]');

    expect(saveButton.disabled).toBeFalsy();
  });

  test('should create a new user when "Save" button is clicked', () => {
    jest.spyOn(userService, 'createUser');
    component.parentUser = { id: 0, name: 'New User', email: 'newuser@example.com' };
    fixture.detectChanges();

    const saveButton = fixture.nativeElement.querySelector('button[data-test="save"]');
    saveButton.click();
    fixture.detectChanges();

    expect(userService.createUser).toHaveBeenCalledWith(component.parentUser);
  });


  test('should disable save button when parentUser has empty name or email', () => {
    const saveButton = fixture.nativeElement.querySelector('button[data-test="save"]');
    expect(saveButton.disabled).toBeTruthy();

    component.parentUser.name = 'Test';
    fixture.detectChanges();
    expect(saveButton.disabled).toBeTruthy();

    component.parentUser.name = '';
    component.parentUser.email = 'test@test.com';
    fixture.detectChanges();
    expect(saveButton.disabled).toBeTruthy();


    component.parentUser.name = 'Test';
    component.parentUser.email = 'test@test.com';
    fixture.detectChanges();
    expect(saveButton.disabled).toBeFalsy();
  });

});

