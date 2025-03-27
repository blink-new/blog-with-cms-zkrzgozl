
import { Post, Category } from './types';

class PostStore {
  private posts: Post[] = [];
  private categories: Category[] = [];

  constructor() {
    // Load from localStorage if available
    const savedPosts = localStorage.getItem('posts');
    const savedCategories = localStorage.getItem('categories');
    
    if (savedPosts) this.posts = JSON.parse(savedPosts);
    if (savedCategories) this.categories = JSON.parse(savedCategories);

    // Initialize with sample data if empty
    if (this.posts.length === 0 || this.categories.length === 0) {
      this.initializeData();
    }
  }

  private save() {
    localStorage.setItem('posts', JSON.stringify(this.posts));
    localStorage.setItem('categories', JSON.stringify(this.categories));
  }

  // Post Operations
  getAllPosts(): Post[] {
    return this.posts.sort((a, b) => 
      new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime()
    );
  }

  getPostBySlug(slug: string): Post | undefined {
    return this.posts.find(post => post.slug === slug);
  }

  getPostsByCategory(categoryId: string): Post[] {
    return this.posts.filter(post => post.categoryId === categoryId);
  }

  getDraftPosts(): Post[] {
    return this.posts.filter(post => post.status === 'draft');
  }

  getPublishedPosts(): Post[] {
    return this.posts.filter(post => post.status === 'published');
  }

  createPost(post: Omit<Post, 'id' | 'slug' | 'createdAt' | 'updatedAt'>): Post {
    const newPost: Post = {
      id: crypto.randomUUID(),
      slug: this.generateSlug(post.title),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...post
    };

    this.posts.unshift(newPost);
    this.save();
    return newPost;
  }

  updatePost(id: string, updates: Partial<Post>): Post {
    const index = this.posts.findIndex(post => post.id === id);
    if (index === -1) throw new Error('Post not found');

    const updatedPost = {
      ...this.posts[index],
      ...updates,
      updatedAt: new Date().toISOString(),
      // Update slug if title changed
      slug: updates.title ? this.generateSlug(updates.title) : this.posts[index].slug
    };

    this.posts[index] = updatedPost;
    this.save();
    return updatedPost;
  }

  deletePost(id: string): boolean {
    const initialLength = this.posts.length;
    this.posts = this.posts.filter(post => post.id !== id);
    
    if (this.posts.length !== initialLength) {
      this.save();
      return true;
    }
    return false;
  }

  // Category Operations
  getAllCategories(): Category[] {
    return this.categories;
  }

  getCategoryBySlug(slug: string): Category | undefined {
    return this.categories.find(category => category.slug === slug);
  }

  createCategory(category: Omit<Category, 'id' | 'slug'>): Category {
    const newCategory: Category = {
      id: crypto.randomUUID(),
      slug: this.generateSlug(category.name),
      ...category
    };

    this.categories.push(newCategory);
    this.save();
    return newCategory;
  }

  updateCategory(id: string, updates: Partial<Category>): Category {
    const index = this.categories.findIndex(category => category.id === id);
    if (index === -1) throw new Error('Category not found');

    const updatedCategory = {
      ...this.categories[index],
      ...updates,
      // Update slug if name changed
      slug: updates.name ? this.generateSlug(updates.name) : this.categories[index].slug
    };

    this.categories[index] = updatedCategory;
    this.save();
    return updatedCategory;
  }

  deleteCategory(id: string): boolean {
    // Check if category has posts
    const hasPost = this.posts.some(post => post.categoryId === id);
    if (hasPost) {
      throw new Error('Cannot delete category with existing posts');
    }

    const initialLength = this.categories.length;
    this.categories = this.categories.filter(category => category.id !== id);
    
    if (this.categories.length !== initialLength) {
      this.save();
      return true;
    }
    return false;
  }

  // Stats
  getStats() {
    return {
      totalPosts: this.posts.length,
      publishedPosts: this.getPublishedPosts().length,
      draftPosts: this.getDraftPosts().length,
      categories: this.categories.length,
      recentPosts: this.getAllPosts().slice(0, 5),
      postsByCategory: this.categories.map(category => ({
        ...category,
        postCount: this.getPostsByCategory(category.id).length
      }))
    };
  }

  // Utility functions
  private generateSlug(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }

  private initializeData() {
    // Sample categories
    const categories = [
      {
        name: 'Technology',
        description: 'All about technology and innovation'
      },
      {
        name: 'Design',
        description: 'UI/UX and design principles'
      },
      {
        name: 'Development',
        description: 'Programming and software development'
      }
    ];

    // Create categories
    categories.forEach(category => {
      if (!this.categories.some(c => c.name === category.name)) {
        this.createCategory(category);
      }
    });

    // Sample posts if no posts exist
    if (this.posts.length === 0) {
      const samplePosts = [
        {
          title: 'Getting Started with Our CMS',
          content: '<h1>Welcome to Our CMS</h1><p>This is a sample post to help you get started with our content management system...</p>',
          excerpt: 'Learn the basics of our CMS platform',
          categoryId: this.categories[0].id,
          status: 'published' as const,
          coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1000&q=80'
        },
        {
          title: 'Design Principles for Better UX',
          content: '<h1>Design Principles</h1><p>Understanding core design principles is essential for creating better user experiences...</p>',
          excerpt: 'Essential design principles for UX',
          categoryId: this.categories[1].id,
          status: 'published' as const,
          coverImage: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=1000&q=80'
        }
      ];

      samplePosts.forEach(post => this.createPost(post));
    }
  }
}

export const postStore = new PostStore();