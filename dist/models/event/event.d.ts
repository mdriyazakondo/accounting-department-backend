import { Document } from "mongoose";
import { IEvent } from "../../types/event.js";
export interface IEventDocument extends IEvent, Document {
}
declare const Event: import("mongoose").Model<IEventDocument, {}, {}, {}, Document<unknown, {}, IEventDocument, {}, import("mongoose").DefaultSchemaOptions> & IEventDocument & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IEventDocument>;
export default Event;
//# sourceMappingURL=event.d.ts.map