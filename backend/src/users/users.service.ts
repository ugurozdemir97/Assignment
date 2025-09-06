import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    {id: 1, isAdmin: true, name: 'Da Vinci', username: 'leonardo97', email: 'leo@example.com', password: "321"},
    {id: 2, isAdmin: false, name: 'Zeliş', username: 'şişi', email: 'zelis@example.com', password: "123"},
    {id: 3, isAdmin: false, name: 'Uğur', username: 'miora', email: 'ugur@example.com', password: "124"},
    {id: 4, isAdmin: false, name: 'Ümit', username: 'umitcoban', email: 'umit@example.com', password: "125"},
    {id: 5, isAdmin: false, name: 'Hasan', username: 'hbs', email: 'hasan@example.com', password: "126"}
  ];

  // Don't return the mails and passwords even though they are fake :)
  findAll() {return this.users.map(({id, isAdmin, name, username}) => ({id, isAdmin, name, username}))}

  // Find specific user by Id
  findOne(id: number) {return this.users.map(({id, isAdmin, name, username}) => ({id, isAdmin, name, username})).find(user => user.id === id);}

  /*

  create(user: any) {
    user.id = this.users.length + 1;
    this.users.push(user);
    return user;
  }

  update(id: number, updatedUser: any) {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) return null;
    this.users[index] = { ...this.users[index], ...updatedUser };
    return this.users[index];
  }

  delete(id: number) {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) return null;
    return this.users.splice(index, 1)[0];
  }
  */
}