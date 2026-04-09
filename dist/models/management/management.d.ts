import { Document } from "mongoose";
import { IManagement } from "../../types/management.js";
export interface IManagementDocument extends IManagement, Document {
    comparePassword(candidatePassword: string): Promise<boolean>;
}
declare const Management: import("mongoose").Model<IManagementDocument, {}, {}, {}, Document<unknown, {}, IManagementDocument, {}, import("mongoose").DefaultSchemaOptions> & IManagementDocument & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IManagementDocument>;
export default Management;
//# sourceMappingURL=management.d.ts.map