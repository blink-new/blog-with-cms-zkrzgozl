
import { Link } from 'react-router-dom'
import { postStore } from '../lib/posts'
import { Card } from '../components/ui/card'

export function Home() {
  const posts = postStore.getAllPosts()

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
      <div className="grid gap-6">
        {posts.map(post => (
          <Card key={post.id} className="p-6">
            <h2 className="text-2xl font-bold mb-2">
              <Link to={`/post/${post.id}`} className="hover:underline">
                {post.title}
              </Link>
            </h2>
            <p className="text-muted-foreground mb-4">{post.excerpt}</p>
            <div className="text-sm text-muted-foreground">
              {new Date(post.createdAt).toLocaleDateString()}
            </div>
          </Card>
        ))}
        {posts.length === 0 && (
          <p className="text-center text-muted-foreground py-8">
            No posts yet. Visit the admin page to create some!
          </p>
        )}
      </div>
    </div>
  )
}