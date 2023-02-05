class contactsErrors extends Error {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}

class ValidationError extends contactsErrors {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class ParameterError extends contactsErrors {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}

class NotAuthorizedError extends contactsErrors {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}

class ConflictError extends contactsErrors {
  constructor(message) {
    super(message);
    this.status = 409;
  }
}


module.exports = {
  contactsErrors,
  ValidationError,
  ParameterError,
  NotAuthorizedError,
  ConflictError,
};
