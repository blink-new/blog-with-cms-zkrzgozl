
export interface Post {
  id: string
  title: string
  content: string
  createdAt: string
  excerpt: string
}

class PostStore {
  private storageKey = 'blog-posts'

  getAllPosts(): Post[] {
    const posts = localStorage.getItem(this.storageKey)
    return posts ? JSON.parse(posts) : []
  }

  getPost(id: string): Post | undefined {
    return this.getAllPosts().find(post => post.id === id)
  }

  createPost(post: Omit<Post, 'id' | 'createdAt'>): Post {
    const posts = this.getAllPosts()
    const newPost: Post = {
      ...post,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    }
    posts.unshift(newPost)
    localStorage.setItem(this.storageKey, JSON.stringify(posts))
    return newPost
  }

  updatePost(id: string, updates: Partial<Post>): Post | undefined {
    const posts = this.getAllPosts()
    const index = posts.findIndex(p => p.id === id)
    if (index === -1) return undefined

    const updatedPost = { ...posts[index], ...updates }
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
}

export const postStore = new PostStore()