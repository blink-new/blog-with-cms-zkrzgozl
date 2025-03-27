
import { useParams, Navigate } from 'react-router-dom'
import { postStore } from '../lib/posts'

export function Post() {
  const { id } = useParams()
  const post = id ? postStore.getPost(id) : null

  if (!post) {
    return <Navigate to="/" replace />
  }

  return (
    <article className="container mx-auto py-8 max-w-2xl">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <div className="text-sm text-muted-foreground mb-8">
        {new Date(post.createdAt).toLocaleDateString()}
      </div>
      <div className="prose dark:prose-invert max-w-none">
        {post.content.split('\n').map((paragraph, i) => (
          <p key={i} className="mb-4">{paragraph}</p>
        ))}
      </div>
    </article>
  )
}