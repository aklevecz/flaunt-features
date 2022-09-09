export type Photo = {
  fieldId: string;
  url: string;
  alt: string | null;
};

export type Feature = {
  authorId: string;
  ["content-block-1"]: string;
  ["created-by"]: string;
  ["created-on"]: string;
  name: string;
  photo: Photo;
  ["published-by"]: string;
  ["published-on"]: string;
  slug: string;
  ["updated-on"]: string;
  ["updated-by"]: string;
  _archived: boolean;
  _cid: string;
  _draft: boolean;
  _id: string;
};
