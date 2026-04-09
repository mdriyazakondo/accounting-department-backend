import { Document } from "mongoose";
import { IStudent } from "../../types/Student.js";
export interface IStudentDocument extends IStudent, Document {
    comparePassword(candidatePassword: string): Promise<boolean>;
}
declare const Student: import("mongoose").Model<IStudentDocument, {}, {}, {}, Document<unknown, {}, IStudentDocument, {}, import("mongoose").DefaultSchemaOptions> & IStudentDocument & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IStudentDocument>;
export default Student;
//# sourceMappingURL=student.model.d.ts.map