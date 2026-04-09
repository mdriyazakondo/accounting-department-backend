import { Document } from "mongoose";
export interface IOTP extends Document {
    email: string;
    otp: string;
    expiresAt: Date;
    createdAt: Date;
}
declare const OTP: import("mongoose").Model<IOTP, {}, {}, {}, Document<unknown, {}, IOTP, {}, import("mongoose").DefaultSchemaOptions> & IOTP & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IOTP>;
export default OTP;
//# sourceMappingURL=otp.model.d.ts.map