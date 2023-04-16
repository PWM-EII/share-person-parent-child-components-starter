import { Injectable } from '@angular/core';
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private  users: User[] =  [
    {
      id: 1,
      name: 'John Doe',
      email: 'johndoe@example.com',
    },
    {
      id: 2,
      name: 'Jane Doe',
      email: 'janedoe@example.com',
    },
    {
      id: 3,
      name: 'Bob Smith',
      email: 'bobsmith@example.com',
    },
    {
      id: 4,
      name: 'Alice Johnson',
      email: 'alicejohnson@example.com',
    }
  ];

  constructor() { }

  // Obtener todos los usuarios
  getUsers(): User[] {
    return this.users;
  }

  // Obtener un usuario por ID
  getUserById(userId: number): User | undefined {

    const user = this.users.find(user => user.id === userId) ;
    if(user) return {...user}
    else return undefined;
  }

  // Crear un nuevo usuario
  createUser(user: User): void {
    user.id = this.generateId();
    this.users.push(user);
  }

  // Actualizar un usuario existente
  updateUser(user: User): void {
    const index =
      this.users.findIndex(u => u.id === user.id);

    if (index !== -1) {
      this.users[index] = {...user};
    }
  }

  // Generar un nuevo ID para un usuario
  private generateId(): number {
    return this.users.length > 0
      ? Math.max(...this.users.map(user => user.id)) + 1 : 1;
  }

}
