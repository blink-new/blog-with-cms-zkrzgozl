
import { useState } from 'react'
import { Post, postStore } from '../lib/posts'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'
import { Card } from '../components/ui/card'
import { Pencil, Trash2 } from 'lucide-react'

export function Admin() {
  const [posts, setPosts] = useState<Post[]>(() => postStore.getAllPosts())
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingId) {
      postStore.updatePost(editingId, { title, content, excerpt })
    } else {
      postStore.createPost({ title, content, excerpt })
    }
    setPosts(postStore.getAllPosts())
    setTitle('')
    setContent('')
    setExcerpt('')
    setEditingId(null)
  }

  const handleEdit = (post: Post) => {
    setTitle(post.title)
    setContent(post.content)
    setExcerpt(post.excerpt)
    setEditingId(post.id)
  }

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      postStore.deletePost(id)
      setPosts(postStore.getAllPosts())
    }
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? 'Edit Post' : 'Create New Post'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Post title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Excerpt</label>
            <Input
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              required
              placeholder="Brief description"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Content</label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              placeholder="Post content"
              className="min-h-[200px]"
            />
          </div>
          <Button type="submit">
            {editingId ? 'Update Post' : 'Create Post'}
          </Button>
          {editingId && (
            <Button
              type="button"
              variant="outline"
              className="ml-2"
              onClick={() => {
                setTitle('')
                setContent('')
                setExcerpt('')
                setEditingId(null)
              }}
            >
              Cancel
            </Button>
          )}
        </form>
      </Card>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">All Posts</h2>
        {posts.map(post => (
          <Card key={post.id} className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{post.title}</h3>
                <p className="text-sm text-muted-foreground">{post.excerpt}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEdit(post)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(post.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
        {posts.length === 0 && (
          <p className="text-muted-foreground text-center py-8">
            No posts yet. Create your first post above!
          </p>
        )}
      </div>
    </div>
  )
}