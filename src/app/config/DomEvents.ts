export class DomEvents {
  /** User session has been set, destroyed or changed. */
  static MUTATED_USER_SESSION = "updateUserSession";

  /** Keeps a registry of which app DOM events have been added to window (global scope). */
  static added = {
    [this.MUTATED_USER_SESSION]: false,
  };
}
