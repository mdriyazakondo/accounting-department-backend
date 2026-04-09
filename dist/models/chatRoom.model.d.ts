import { Document } from "mongoose";
export interface IChatRoom extends Document {
    name: string;
    type: "public" | "private" | "direct";
    participants: string[];
    createdBy: string;
    lastMessage?: {
        content: string;
        sender: string;
        senderEmail: string;
        timestamp: Date;
    };
    createdAt: Date;
    updatedAt: Date;
}
declare const ChatRoom: import("mongoose").Model<IChatRoom, {}, {}, {}, Document<unknown, {}, IChatRoom, {}, import("mongoose").DefaultSchemaOptions> & IChatRoom & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IChatRoom>;
export default ChatRoom;
//# sourceMappingURL=chatRoom.model.d.ts.map