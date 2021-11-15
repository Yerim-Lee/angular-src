export interface User {
  name: string;
  email: string;
  username: string;
  password: string;
}

export interface Login {
  username: string;
  password: string;
}

export interface UserNoPW {
  _id: string;
  name: string;
  email: string;
  username: string;
}
