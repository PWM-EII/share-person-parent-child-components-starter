import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ChildComponent } from './child.component';
import { User } from '../../models/user.model';
import {SimpleChange, SimpleChanges} from "@angular/core";
import {FormsModule} from "@angular/forms";

describe('ChildComponent', () => {
  let component: ChildComponent;
  let fixture: ComponentFixture<ChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildComponent ],
      imports: [FormsModule],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  test('should update child user on input change', () => {
    const ngOnChangesSpy =
      jest.spyOn(component, 'ngOnChanges')

    const user: User = {
      id: 1,
      name: 'Test User',
      email: 'test@test.com'
    };

    const changes: SimpleChanges = {
      sharedUser: new SimpleChange(undefined, user,true),
    };

    component.sharedUser = user;
    component.ngOnChanges(changes);

    expect(ngOnChangesSpy).toHaveBeenCalledTimes(1);
    expect(component.childUser).toEqual(user);
  });

  test('should emit event on user update', () => {
    jest.spyOn(component.onParentUserUpdated, 'emit');

    const user: User = {
      id: 1,
      name: 'Test User',
      email: 'test@test.com'
    };

    component.sharedUser = user;
    fixture.detectChanges();

    const nameInput = fixture.debugElement
      .query(By.css('#name'))
      .nativeElement;
    nameInput.value = 'Updated Name';
    nameInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const emailInput = fixture.debugElement
      .query(By.css('#email'))
      .nativeElement;
    emailInput.value = 'updated@test.com';
    emailInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const button = fixture.debugElement
      .query(By.css('button[test-data="update"]'))
      .nativeElement;

    button.click();
    fixture.detectChanges();

    expect(component.onParentUserUpdated.emit)
      .toHaveBeenCalledWith(component.childUser);
  });

});

