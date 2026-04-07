export interface IStudent {
  name: string;
  email: string;
  phone: string;
  password: string; // Auth field
  photo?: string;
  department: string;
  studentId: string;
  class_role?: string;
  gender: "Male" | "Female" | "Other";
  year: number;
  createdAt?: Date;
  updatedAt?: Date;
  dateOfBirth: Date;
  father_name?: string;
  mother_name?: string;
  hobbies?: string[];
}
