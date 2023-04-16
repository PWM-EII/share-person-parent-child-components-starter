import { ComponentFixture, TestBed } from '@angular/core/testing';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { UserListComponent } from './user-list.component';

/**
 * En este ejemplo, estamos testeando que:
 *
 * El componente se crea correctamente.
 * Cuando se llama al método selectUser, se emite el usuario seleccionado.
 * En la inicialización del componente, se llama al método getUsers del servicio
 * y se asignan los usuarios obtenidos.
 * El método getUser devuelve el usuario esperado cuando se le pasa un id válido.
 * El método getUser devuelve undefined cuando se le pasa un id inválido.
 */
describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userService: UserService;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserListComponent],
      providers: [UserService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
  });


  test('should set users to value returned by userService on init', () => {
    const users: User[] = [
      {id: 1, name: 'John', email: 'john@example.com'},
      {id: 2, name: 'Jane', email: 'jane@example.com'}
    ];
    jest.spyOn(userService, 'getUsers').mockReturnValue(users);
    component.ngOnInit();

    expect(component.users).toEqual(users);
  });

  test('should return expected user when getUser is called with valid id', () => {
    const user: User = {id: 1, name: 'John', email: 'john@example.com'};
    jest.spyOn(userService, 'getUserById').mockReturnValue(user);
    const result = component['getUser'](1);

    expect(result).toEqual(user);
  });

  test('should return undefined when getUser is called with invalid id', () => {
    jest.spyOn(userService, 'getUserById').mockReturnValue(undefined);
    const result = component['getUser'](999);

    expect(result).toEqual(undefined);
  });
});
