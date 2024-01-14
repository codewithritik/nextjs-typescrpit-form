export type typeUser = {
  name: string;
  age: number;
  email: string;
  password: string;
};

export type initialFormData = {
  firstName: string,
  lastName: string,
  age: number,
  gender: string,
  grade: string,
  email: string,
  contactNumber: string,
  address: string,
};

export type Student = {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  grade: string;
  email: string;
  contactNumber: string;
  address: string;
}