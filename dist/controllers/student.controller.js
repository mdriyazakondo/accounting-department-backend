import Student from "../models/student/student.model.js";
import sendResponse from "../utils/sendResponse.js";
// REGISTER a new student
export const registerStudent = async (req, res) => {
    try {
        const { name, email, phone, password, photo, department, studentId, class_role, gender, year, dateOfBirth, father_name, mother_name, hobbies, } = req.body;
        // Validate required fields
        if (!name ||
            !email ||
            !phone ||
            !password ||
            !department ||
            !studentId ||
            !gender ||
            !year ||
            !dateOfBirth) {
            return sendResponse(res, {
                statusCode: 400,
                success: false,
                message: "All required fields must be provided",
                data: null,
            });
        }
        // Validate password length
        if (password.length < 6) {
            return sendResponse(res, {
                statusCode: 400,
                success: false,
                message: "Password must be at least 6 characters long",
                data: null,
            });
        }
        // Check if email already exists
        const existingStudent = await Student.findOne({ email });
        if (existingStudent) {
            return sendResponse(res, {
                statusCode: 400,
                success: false,
                message: "Email already registered",
                data: null,
            });
        }
        // Create new student
        const newStudent = await Student.create({
            name,
            email,
            phone,
            password,
            photo: photo || undefined,
            department,
            studentId,
            class_role: class_role || undefined,
            gender,
            year,
            dateOfBirth,
            father_name: father_name || undefined,
            mother_name: mother_name || undefined,
            hobbies: hobbies || undefined,
        });
        return sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "Student registered successfully",
            data: newStudent,
        });
    }
    catch (error) {
        console.error(error);
        return sendResponse(res, {
            statusCode: 500,
            success: false,
            message: "Error registering student",
            data: error,
        });
    }
};
// LOGIN student
export const loginStudent = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Validate inputs
        if (!email || !password) {
            return sendResponse(res, {
                statusCode: 400,
                success: false,
                message: "Email and password are required",
                data: null,
            });
        }
        // Find student by email
        const student = await Student.findOne({ email });
        if (!student) {
            return sendResponse(res, {
                statusCode: 401,
                success: false,
                message: "Invalid email or password",
                data: null,
            });
        }
        // Compare passwords
        const isPasswordValid = await student.comparePassword(password);
        if (!isPasswordValid) {
            return sendResponse(res, {
                statusCode: 401,
                success: false,
                message: "Invalid email or password",
                data: null,
            });
        }
        return sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Login successful",
            data: student,
        });
    }
    catch (error) {
        console.error(error);
        return sendResponse(res, {
            statusCode: 500,
            success: false,
            message: "Error during login",
            data: error,
        });
    }
};
// CREATE a new student
export const studentDataCreate = async (req, res) => {
    try {
        const { name, email, phone, password, photo, department, studentId, class_role, gender, year, dateOfBirth, father_name, mother_name, hobbies, } = req.body;
        if (!name ||
            !email ||
            !phone ||
            !password ||
            !department ||
            !studentId ||
            !gender ||
            !year ||
            !dateOfBirth) {
            return sendResponse(res, {
                statusCode: 400,
                success: false,
                message: "All required fields must be provided",
                data: null,
            });
        }
        const newStudent = await Student.create({
            name,
            email,
            phone,
            password,
            photo: photo || undefined,
            department,
            studentId,
            class_role: class_role || undefined,
            gender,
            year,
            dateOfBirth,
            father_name: father_name || undefined,
            mother_name: mother_name || undefined,
            hobbies: hobbies || undefined,
        });
        return sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "Student created successfully",
            data: newStudent,
        });
    }
    catch (error) {
        console.error(error);
        return sendResponse(res, {
            statusCode: 500,
            success: false,
            message: "Server error",
            data: error,
        });
    }
};
// GET all students
export const getAllStudents = async (_req, res) => {
    try {
        const students = await Student.find();
        return sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Students retrieved successfully",
            data: students,
        });
    }
    catch (error) {
        console.error(error);
        return sendResponse(res, {
            statusCode: 500,
            success: false,
            message: "Server error",
            data: error,
        });
    }
};
// GET single student by ID
export const getStudentById = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await Student.findById(id);
        if (!student) {
            return sendResponse(res, {
                statusCode: 404,
                success: false,
                message: "Student not found",
                data: null,
            });
        }
        return sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Student retrieved successfully",
            data: student,
        });
    }
    catch (error) {
        console.error(error);
        return sendResponse(res, {
            statusCode: 500,
            success: false,
            message: "Server error",
            data: error,
        });
    }
};
// UPDATE student
export const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedStudent = await Student.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        if (!updatedStudent) {
            return sendResponse(res, {
                statusCode: 404,
                success: false,
                message: "Student not found",
                data: null,
            });
        }
        return sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Student updated successfully",
            data: updatedStudent,
        });
    }
    catch (error) {
        console.error(error);
        return sendResponse(res, {
            statusCode: 500,
            success: false,
            message: "Server error",
            data: error,
        });
    }
};
// DELETE student
export const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedStudent = await Student.findByIdAndDelete(id);
        if (!deletedStudent) {
            return sendResponse(res, {
                statusCode: 404,
                success: false,
                message: "Student not found",
                data: null,
            });
        }
        return sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Student deleted successfully",
            data: null,
        });
    }
    catch (error) {
        console.error(error);
        return sendResponse(res, {
            statusCode: 500,
            success: false,
            message: "Server error",
            data: error,
        });
    }
};
//# sourceMappingURL=student.controller.js.map