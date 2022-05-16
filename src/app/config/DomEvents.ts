export class DomEvents {
  /** User session has been set, or the value has been changed. */
  static UPDATE_USER_SESSION = "updateUserSession";

  /** Keeps a registry of which app DOM events have been added to window (global scope). */
  static added = {
    [this.UPDATE_USER_SESSION]: false,
  };
}
