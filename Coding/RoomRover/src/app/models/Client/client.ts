import { Address } from '../Address/address';

export class Client {
  name: string = '';
  email: string = '';
  phone: string = '';
  birthdate: string = '';
  nationality: string = '';
  gender: string = '';
  password: string = '';
  address: Address;
  
  constructor(
    name: string,
    email: string,
    phone: string,
    birthdate: string,
    nationality: string,
    gender: string,
    password: string,
    address: Address
  ) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.birthdate = birthdate;
    this.nationality = nationality;
    this.gender = gender;
    this.password = password;
    this.address = address;
  }
}
