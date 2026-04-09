import { Document } from "mongoose";
export interface IUserStatus extends Document {
    userId: string;
    email: string;
    isOnline: boolean;
    lastSeen: Date;
    socketId?: string;
}
declare const UserStatus: import("mongoose").Model<IUserStatus, {}, {}, {}, Document<unknown, {}, IUserStatus, {}, import("mongoose").DefaultSchemaOptions> & IUserStatus & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IUserStatus>;
export default UserStatus;
//# sourceMappingURL=userStatus.model.d.ts.map