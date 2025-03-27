
interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  categoryId: string;
  createdAt: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
}

class PostStore {
  private posts: Post[] = [];
  private categories: Category[] = [];

  constructor() {
    // Load from localStorage if available
    const savedPosts = localStorage.getItem('posts');
    const savedCategories = localStorage.getItem('categories');
    
    if (savedPosts) this.posts = JSON.parse(savedPosts);
    if (savedCategories) this.categories = JSON.parse(savedCategories);
  }

  private save() {
    localStorage.setItem('posts', JSON.stringify(this.posts));
    localStorage.setItem('categories', JSON.stringify(this.categories));
  }

  getAllPosts(): Post[] {
    return this.posts;
  }

  getPostBySlug(slug: string): Post | undefined {
    return this.posts.find(post => post.slug === slug);
  }

  getPostsByCategory(categoryId: string): Post[] {
    return this.posts.filter(post => post.categoryId === categoryId);
  }

  getAllCategories(): Category[] {
    return this.categories;
  }

  getCategoryBySlug(slug: string): Category | undefined {
    return this.categories.find(category => category.slug === slug);
  }

  initializeData() {
    // Sample categories
    this.categories = [
      {
        id: '1',
        name: 'React',
        slug: 'react',
        description: 'All about React development'
      },
      {
        id: '2',
        name: 'TypeScript',
        slug: 'typescript',
        description: 'TypeScript tips and tricks'
      }
    ];

    // Sample posts
    this.posts = [
      {
        id: '1',
        title: 'Getting Started with React',
        slug: 'getting-started-with-react',
        content: 'React is a popular JavaScript library for building user interfaces...',
        excerpt: 'Learn the basics of React and start building awesome UIs',
        coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1000&q=80',
        categoryId: '1',
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        title: 'TypeScript Best Practices',
        slug: 'typescript-best-practices',
        content: 'TypeScript adds static typing to JavaScript...',
        excerpt: 'Write better TypeScript code with these best practices',
        coverImage: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=1000&q=80',
        categoryId: '2',
        createdAt: new Date().toISOString()
      }
    ];

    this.save();
  }
}

export const postStore = new PostStore();