interface Exception {
  name: string;
  message: string;
}

export class EntityNotFoundException implements Exception {
  public readonly name: 'EntityNotFoundException';
  public readonly message: 'entity not found';
}

export class IncorrectPasswordException implements Exception {
  public readonly name: 'IncorrectPasswordException';
  public readonly message: 'passwords do not match';
}
