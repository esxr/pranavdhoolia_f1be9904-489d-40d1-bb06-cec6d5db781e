module.exports = class UnstagedChangesError extends Error {
  constructor() {
    super("You can't have unstaged changes to run this.");
  }
}
