export interface IBlog extends Document {
  title: string;
  slug: string;
  content: string;
  photo: string;
  category: string;
  author: string;
  tags?: string[];
  isPublished: boolean;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}
