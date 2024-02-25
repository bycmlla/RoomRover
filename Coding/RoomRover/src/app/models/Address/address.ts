export class Address {
  country: string = '';
  address: string = '';
  city: string = '';
  zipcode: string = '';

  constructor(country: string, address: string, city: string, zipcode: string) {
    this.country = country;
    this.address = address;
    this.city = city;
    this.zipcode = zipcode;
  }
}
