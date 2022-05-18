export enum Categories {
  ANIME = "anime",
  MANGA = "manga",
}

export enum ErrorResponseMessages {
  SER01 = "Validation error",
  SER02 = "Entry not found error",
  SER03 = "Incorrect username or password",
  SER04 = "Entry already exists",
  SYS01 = "Unexpected error",
  SYS02 = "Unexpected error",
}

// Default category of the search view
export const defaultCategory = Categories.ANIME;
