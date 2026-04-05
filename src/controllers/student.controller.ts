import { Request, Response } from "express";
import Student from "../models/student/student.model.js";
import { IStudent } from "../types/Student.js";

// CREATE a new student
export const studentDataCreate = async (req: Request, res: Response) => {
  try {
    const {
      name,
      email,
      phone,
      photo,
      department,
      studentId,
      class_role,
      gender,
      year,
      dateOfBirth,
      father_name,
      mother_name,
      hobbies,
    }: Partial<IStudent> = req.body;
    if (
      !name ||
      !email ||
      !phone ||
      !department ||
      !studentId ||
      !gender ||
      !year ||
      !dateOfBirth
    ) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided" });
    }

    console.log(req, res);

    const newStudent = await Student.create({
      name,
      email,
      phone,
      photo,
      department,
      studentId,
      class_role,
      gender,
      year,
      dateOfBirth,
      father_name,
      mother_name,
      hobbies,
    } as IStudent);

    res
      .status(201)
      .json({ message: "Student created successfully", data: newStudent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

// GET all students
export const getAllStudents = async (_req: Request, res: Response) => {
  try {
    const students: IStudent[] = await Student.find();
    res.status(200).json({ data: students });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

// GET single student by ID
export const getStudentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const student: IStudent | null = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ data: student });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

// UPDATE student
export const updateStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedStudent: IStudent | null = await Student.findByIdAndUpdate(
      id,
      req.body,
      { new: true },
    );
    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ message: "Student updated", data: updatedStudent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

// DELETE student
export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedStudent: IStudent | null = await Student.findByIdAndDelete(id);
    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};
