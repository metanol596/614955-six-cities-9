const AUTH_TOKEN_KEY_NAME = 'six-cities-token';

export type Token = string;

export const saveToken = (token: Token): void => {
  localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);
};
