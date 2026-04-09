export interface IStudent {
    name: string;
    email: string;
    phone: string;
    password: string;
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
//# sourceMappingURL=Student.d.ts.map