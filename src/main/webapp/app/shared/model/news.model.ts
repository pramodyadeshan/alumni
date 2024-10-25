export interface INews {
  id?: number;
  authorName?: string | null;
  title?: string | null;
  publishDate?: string | null;
  coverArea?: string | null;
  group?: string | null;
  expireDate?: string | null;
  fileUpload?: string | null;
}

export const defaultValue: Readonly<INews> = {};
