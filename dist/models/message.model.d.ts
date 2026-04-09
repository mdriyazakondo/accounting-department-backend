import { Document } from "mongoose";
export interface IMessage extends Document {
    sender: string;
    senderEmail: string;
    roomId: string;
    content: string;
    messageType: "text" | "image" | "file";
    timestamp: Date;
    readBy: string[];
}
declare const Message: import("mongoose").Model<IMessage, {}, {}, {}, Document<unknown, {}, IMessage, {}, import("mongoose").DefaultSchemaOptions> & IMessage & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IMessage>;
export default Message;
//# sourceMappingURL=message.model.d.ts.map