export class ErrorResponse {
  constructor(
    public readonly code: string,
    public readonly status: number,
    public readonly details: string,
    public readonly cause?: any,
  ) {}
}

export class ValidationDetails {
  constructor(
    public readonly code: string,
    public readonly field: string = null,
    public readonly details: string = null,
    public readonly values: string[] = null,
  ) {}
}
