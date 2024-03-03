class ServerError extends Error {
  constructor() {
    super(
      "server encountered an unexpected condition that prevented it from fulfilling the request."
    );
    this.status = 500;
    this.name = "ServerError";
  }
}
class NotFoundUrlError extends Error {
  constructor() {
    super("Not Found");
    this.status = 404;
    this.name = "NotFoundUrlError";
  }
}
class NotFoundCRUD extends Error {
  constructor() {
    super("Not Found");
    this.status = 404;
    this.name = "NotFoundCRUD";
  }
}
class formErorr extends Error {
  constructor() {
    super("Invalid form data");
    this.status = 400;
    this.name = "formErorr";
  }
}
class RequiredIdError extends Error {
  constructor(action) {
    super("required id to " + action + " the pet.");
    this.status = 404;
    this.name = "RequiredIdError";
  }
}
class petAlreadyExists extends Error {
  constructor(name, age) {
    super(
      "Pet with name: " +
        name +
        " and age: " +
        age +
        " already exists in the list"
    );
    this.status = 409;
    this.name = "ReportExistsError";
  }
}
class petDoesntExist extends Error {
  constructor(id) {
    super("Pet with id: " + id + " does not exist");
    this.status = 404;
    this.name = "ReportDoesntExist";
  }
}
class NoDataError extends Error {
  constructor() {
    super("No data found");
    this.status = 404;
    this.name = "NoDataError";
  }
}
module.exports = {
  ServerError,
  NotFoundUrlError,
  NotFoundCRUD,
  RequiredIdError,
  petAlreadyExists,
  petDoesntExist,
  NoDataError,
  formErorr,
};
