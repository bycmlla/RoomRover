-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`adress`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`adress` (
  `idadress` INT NOT NULL AUTO_INCREMENT,
  `country` VARCHAR(100) NOT NULL,
  `adress` VARCHAR(100) NOT NULL,
  `city` VARCHAR(45) NOT NULL,
  `zipcode` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`idadress`),
  UNIQUE INDEX `idadress_UNIQUE` (`idadress` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`passport`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`passport` (
  `idpassport` INT NOT NULL AUTO_INCREMENT,
  `namepassport` VARCHAR(255) NOT NULL,
  `number` VARCHAR(8) GENERATED ALWAYS AS () VIRTUAL,
  `issuingcountry` VARCHAR(45) NOT NULL,
  `expirationdate` DATE NOT NULL,
  PRIMARY KEY (`idpassport`),
  UNIQUE INDEX `idpassport_UNIQUE` (`idpassport` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`client`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`client` (
  `idclient` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `phone` VARCHAR(11) NOT NULL,
  `birthdate` DATE NOT NULL,
  `nationality` VARCHAR(45) NOT NULL,
  `gender` VARCHAR(20) NOT NULL,
  `password` VARCHAR(8) NOT NULL,
  `idadressfk` INT NOT NULL,
  `idpassportfk` INT NOT NULL,
  PRIMARY KEY (`idclient`, `idadressfk`, `idpassportfk`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  INDEX `idadressfk_idx` (`idadressfk` ASC) VISIBLE,
  INDEX `idpassportfk_idx` (`idpassportfk` ASC) VISIBLE,
  CONSTRAINT `idadressfk`
    FOREIGN KEY (`idadressfk`)
    REFERENCES `mydb`.`adress` (`idadress`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `idpassportfk`
    FOREIGN KEY (`idpassportfk`)
    REFERENCES `mydb`.`passport` (`idpassport`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`hotel`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`hotel` (
  `idhotel` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `adress` VARCHAR(255) NOT NULL,
  `description` VARCHAR(300) NULL,
  PRIMARY KEY (`idhotel`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`rooms`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`rooms` (
  `idrooms` INT NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(100) NOT NULL,
  `capacity` INT NOT NULL,
  `priceroom` DOUBLE NOT NULL,
  `isavailable` TINYINT NOT NULL,
  `idhotelfk` INT NOT NULL,
  PRIMARY KEY (`idrooms`, `idhotelfk`),
  UNIQUE INDEX `idrooms_UNIQUE` (`idrooms` ASC) VISIBLE,
  INDEX `idhotelfk_idx` (`idhotelfk` ASC) VISIBLE,
  CONSTRAINT `idhotelfk`
    FOREIGN KEY (`idhotelfk`)
    REFERENCES `mydb`.`hotel` (`idhotel`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`reservation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`reservation` (
  `idreservation` INT NOT NULL AUTO_INCREMENT,
  `checkin` DATE NOT NULL,
  `checkout` DATE NOT NULL,
  `roomsavailable` INT NOT NULL,
  `guests` INT NOT NULL,
  `totalprice` DOUBLE NOT NULL,
  `idclientfk` INT NOT NULL,
  `idroomfk` INT NOT NULL,
  PRIMARY KEY (`idreservation`, `idclientfk`, `idroomfk`),
  INDEX `idclientfk_idx` (`idclientfk` ASC) VISIBLE,
  INDEX `idroomfk_idx` (`idroomfk` ASC) VISIBLE,
  CONSTRAINT `idclientfk`
    FOREIGN KEY (`idclientfk`)
    REFERENCES `mydb`.`client` (`idclient`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `idroomfk`
    FOREIGN KEY (`idroomfk`)
    REFERENCES `mydb`.`rooms` (`idrooms`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
