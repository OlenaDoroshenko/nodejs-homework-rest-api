class contactsError extends Error {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class ParameterError extends Error {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}

module.exports = {
  contactsError,
  ValidationError,
  ParameterError,
};
