import { Document } from "mongoose";
import { ITeacher } from "../../types/teacher.js";
export interface ITeacherDocument extends ITeacher, Document {
    comparePassword(candidatePassword: string): Promise<boolean>;
}
export declare const Teacher: import("mongoose").Model<ITeacherDocument, {}, {}, {}, Document<unknown, {}, ITeacherDocument, {}, import("mongoose").DefaultSchemaOptions> & ITeacherDocument & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, ITeacherDocument>;
export default Teacher;
//# sourceMappingURL=teacher.d.ts.map