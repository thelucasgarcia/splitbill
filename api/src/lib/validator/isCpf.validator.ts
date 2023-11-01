import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { cpf } from 'cpf-cnpj-validator';

@ValidatorConstraint({ name: 'isCPF', async: false })
@Injectable()
export class IsCPFConstraint implements ValidatorConstraintInterface {
  validate(value: any) {
    if (value) {
      return cpf.isValid(value.toString().replace(/[^\d]+/g, ''));
    }
    return false;
  }

  defaultMessage() {
    return 'cpf invalid';
  }
}

export function IsCPF(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCPFConstraint,
    });
  };
}
