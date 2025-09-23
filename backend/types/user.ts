export type UserType = {
  email: string;
  name: string;
  password: string;
};

export type DbUserType = {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};
