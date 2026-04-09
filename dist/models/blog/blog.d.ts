import { Document } from "mongoose";
import { IBlog } from "../../types/blog.js";
declare const Blog: import("mongoose").Model<IBlog, {}, {}, {}, Document<unknown, {}, IBlog, {}, import("mongoose").DefaultSchemaOptions> & IBlog & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, IBlog>;
export default Blog;
//# sourceMappingURL=blog.d.ts.map