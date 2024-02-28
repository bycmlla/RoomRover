import { Address } from '../Address/address';
import { Passport } from '../Passport/passport';

export class Client {
  name: string = '';
  email: string = '';
  phone: string = '';
  birthdate: string = '';
  nationality: string = '';
  gender: string = '';
  password: string = '';
  address: Address;
  passport: Passport;
  
  constructor(
    name: string,
    email: string,
    phone: string,
    birthdate: string,
    nationality: string,
    gender: string,
    password: string,
    address: Address,
    passport: Passport,
  ) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.birthdate = birthdate;
    this.nationality = nationality;
    this.gender = gender;
    this.password = password;
    this.address = address;
    this.passport = passport;
  }
}
