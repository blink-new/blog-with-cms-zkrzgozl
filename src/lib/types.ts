
export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  categoryId: string;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface Media {
  id: string;
  url: string;
  type: 'image' | 'video';
  filename: string;
  createdAt: string;
}