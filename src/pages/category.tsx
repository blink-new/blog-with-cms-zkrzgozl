
import { useParams, Link, Navigate } from 'react-router-dom'
import { postStore } from '../lib/posts'

export function CategoryPage() {
  const { slug } = useParams()
  const category = slug ? postStore.getCategory(slug) : null
  const allPosts = postStore.getAllPosts()
  const posts = category ? allPosts.filter(post => post.categoryId === category.id) : []

  if (!category) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-4xl font-serif font-bold">{category.name}</h1>
        <p className="text-muted-foreground">{category.description}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map(post => (
          <article
            key={post.id}
            className="group rounded-lg border p-4 space-y-4 transition-all hover:shadow-lg"
          >
            {post.coverImage && (
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-48 object-cover rounded-md"
              />
            )}
            <div className="space-y-2">
              <h2 className="text-2xl font-serif font-bold group-hover:text-primary">
                <Link to={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="text-muted-foreground">{post.excerpt}</p>
              <time className="text-sm text-muted-foreground">
                {new Date(post.createdAt).toLocaleDateString()}
              </time>
            </div>
          </article>
        ))}
      </div>

      {posts.length === 0 && (
        <p className="text-center text-muted-foreground py-12">
          No posts in this category yet.
        </p>
      )}
    </div>
  )
}