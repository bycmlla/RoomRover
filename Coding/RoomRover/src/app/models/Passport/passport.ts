export class Passport {
  namePassport: string = '';
  number: string = '';
  issuingCountry: string = '';
  expirationDate: string = '';

  constructor(
    namePassport: string,
    number: string,
    issuingCountry: string,
    expirationDate: string
  ) {
    this.namePassport = namePassport;
    this.number = number;
    this.issuingCountry = issuingCountry;
    this.expirationDate = expirationDate;
  }
}
