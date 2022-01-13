module.exports = class DateInvalidError extends Error {
  constructor() {
    super("The date you have entered is invalid.");
  }
}
