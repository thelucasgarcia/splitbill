import { HttpStatus } from '@nestjs/common';

export class ErrorMessage {
  constructor(
    public readonly code: string,
    public readonly message: string,
    public readonly status: HttpStatus,
  ) {}

  static readonly INTERNAL_SERVER_ERROR = new ErrorMessage(
    'INTERNAL_SERVER_ERROR',
    'Ocorreu um erro interno no servidor, tente novamente mais tarde.',
    HttpStatus.INTERNAL_SERVER_ERROR,
  );

  // Auth
  static readonly INVALID_EMAIL_PASSWORD = new ErrorMessage(
    'INVALID_EMAIL_PASSWORD',
    'E-mail ou senha inválida. Por favor, verifique suas credenciais e tente novamente.',
    HttpStatus.UNAUTHORIZED,
  );

  static readonly NOT_AUTHENTICATED = new ErrorMessage(
    'NOT_AUTHENTICATED',
    'Usuário não autenticado. Por favor, faça login para acessar esta funcionalidade.',
    HttpStatus.UNAUTHORIZED,
  );

  static readonly REFRESH_TOKEN_INVALID = new ErrorMessage(
    'REFRESH_TOKEN_INVALID',
    'Token inválido',
    HttpStatus.UNAUTHORIZED,
  );

  static readonly USERNAME_IS_TAKEN = new ErrorMessage(
    'USERNAME_IS_TAKEN',
    'Este nome de usuário já está em uso. Por favor, escolha outro.',
    HttpStatus.CONFLICT,
  );

  static readonly EMAIL_IS_TAKEN = new ErrorMessage(
    'EMAIL_IS_TAKEN',
    'Este endereço de e-mail já está cadastrado. Por favor, use outro.',
    HttpStatus.CONFLICT,
  );

  static readonly PHONE_IS_TAKEN = new ErrorMessage(
    'PHONE_IS_TAKEN',
    'Este número de telefone já está associado a outra conta. Por favor, forneça um número diferente.',
    HttpStatus.CONFLICT,
  );

  static readonly CPF_IS_TAKEN = new ErrorMessage(
    'CPF_IS_TAKEN',
    'Este CPF já está associado a outra conta. Por favor, forneça um CPF diferente.',
    HttpStatus.CONFLICT,
  );

  static readonly USER_NOT_FOUND = new ErrorMessage(
    'USER_NOT_FOUND',
    'Usuário não encontrado. Por favor, verifique as informações fornecidas.',
    HttpStatus.NOT_FOUND,
  );

  static readonly BILL_NOT_FOUND = new ErrorMessage(
    'BILL_NOT_FOUND',
    'Despesa não encontrado. Por favor, verifique as informações fornecidas.',
    HttpStatus.NOT_FOUND,
  );

  static readonly RESOURCE_NOT_FOUND = new ErrorMessage(
    'RESOURCE_NOT_FOUND',
    'Recurso não encontrado. Por favor, verifique as informações fornecidas.',
    HttpStatus.NOT_FOUND,
  );

  static readonly BILL_ITEM_NOT_FOUND = new ErrorMessage(
    'BILL_ITEM_NOT_FOUND',
    'Item não encontrado. Por favor, verifique as informações fornecidas.',
    HttpStatus.NOT_FOUND,
  );

  // Add other error messages as needed...
}
