
export interface Post {
  id: string
  title: string
  content: string
  excerpt: string
  slug: string
  categoryId: string
  coverImage?: string
  createdAt: string
  updatedAt: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
}

class PostStore {
  private storageKey = 'blog-posts'
  private categoryKey = 'blog-categories'

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  getAllPosts(): Post[] {
    const posts = localStorage.getItem(this.storageKey)
    return posts ? JSON.parse(posts) : []
  }

  getPost(slug: string): Post | undefined {
    return this.getAllPosts().find(post => post.slug === slug)
  }

  getAllCategories(): Category[] {
    const categories = localStorage.getItem(this.categoryKey)
    return categories ? JSON.parse(categories) : []
  }

  getCategory(slug: string): Category | undefined {
    return this.getAllCategories().find(category => category.slug === slug)
  }

  createPost(post: Omit<Post, 'id' | 'slug' | 'createdAt' | 'updatedAt'>): Post {
    const posts = this.getAllPosts()
    const now = new Date().toISOString()
    const newPost: Post = {
      ...post,
      id: crypto.randomUUID(),
      slug: this.generateSlug(post.title),
      createdAt: now,
      updatedAt: now
    }
    posts.unshift(newPost)
    localStorage.setItem(this.storageKey, JSON.stringify(posts))
    return newPost
  }

  updatePost(id: string, updates: Partial<Post>): Post | undefined {
    const posts = this.getAllPosts()
    const index = posts.findIndex(p => p.id === id)
    if (index === -1) return undefined

    const updatedPost = { 
      ...posts[index], 
      ...updates,
      slug: updates.title ? this.generateSlug(updates.title) : posts[index].slug,
      updatedAt: new Date().toISOString()
    }
    posts[index] = updatedPost
    localStorage.setItem(this.storageKey, JSON.stringify(posts))
    return updatedPost
  }

  deletePost(id: string): boolean {
    const posts = this.getAllPosts()
    const filtered = posts.filter(p => p.id !== id)
    if (filtered.length === posts.length) return false
    localStorage.setItem(this.storageKey, JSON.stringify(filtered))
    return true
  }

  createCategory(category: Omit<Category, 'id' | 'slug'>): Category {
    const categories = this.getAllCategories()
    const newCategory: Category = {
      ...category,
      id: crypto.randomUUID(),
      slug: this.generateSlug(category.name)
    }
    categories.push(newCategory)
    localStorage.setItem(this.categoryKey, JSON.stringify(categories))
    return newCategory
  }

  updateCategory(id: string, updates: Partial<Category>): Category | undefined {
    const categories = this.getAllCategories()
    const index = categories.findIndex(c => c.id === id)
    if (index === -1) return undefined

    const updatedCategory = { 
      ...categories[index], 
      ...updates,
      slug: updates.name ? this.generateSlug(updates.name) : categories[index].slug
    }
    categories[index] = updatedCategory
    localStorage.setItem(this.categoryKey, JSON.stringify(categories))
    return updatedCategory
  }

  deleteCategory(id: string): boolean {
    const categories = this.getAllCategories()
    const filtered = categories.filter(c => c.id !== id)
    if (filtered.length === categories.length) return false
    localStorage.setItem(this.categoryKey, JSON.stringify(filtered))
    return true
  }

  // Initialize with some sample data if empty
  initializeData() {
    if (this.getAllCategories().length === 0) {
      this.createCategory({
        name: 'Technology',
        description: 'Posts about software development and tech trends'
      })
      this.createCategory({
        name: 'Design',
        description: 'UI/UX design principles and case studies'
      })
    }

    if (this.getAllPosts().length === 0) {
      this.createPost({
        title: 'Getting Started with React',
        content: `React is a popular JavaScript library for building user interfaces. It was developed by Facebook and has become one of the most widely used frontend technologies.

In this post, we'll cover the basics of React and how to create your first component.

## Why React?

React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.

## Creating Your First Component

Here's a simple example of a React component:

\`\`\`jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
\`\`\`

This component can be used like this:

\`\`\`jsx
<Welcome name="Sara" />
\`\`\`

## Next Steps

In the next post, we'll dive deeper into React hooks and state management.`,
        excerpt: 'Learn the fundamentals of React and create your first component',
        categoryId: this.getAllCategories()[0].id,
        coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80'
      })
    }
  }
}

export const postStore = new PostStore()