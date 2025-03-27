
import { useParams, Link, Navigate } from 'react-router-dom'
import { postStore } from '../lib/posts'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function BlogPost() {
  const { slug } = useParams()
  const post = slug ? postStore.getPost(slug) : null
  const category = post ? postStore.getCategory(post.categoryId) : null

  if (!post) {
    return <Navigate to="/" replace />
  }

  return (
    <article className="max-w-3xl mx-auto">
      <Button
        variant="ghost"
        asChild
        className="mb-8 -ml-2"
      >
        <Link to="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </Button>

      {post.coverImage && (
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full aspect-video object-cover rounded-lg mb-8"
        />
      )}

      <header className="mb-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          {category && (
            <>
              <Link 
                to={`/category/${category.slug}`}
                className="text-primary hover:underline"
              >
                {category.name}
              </Link>
              <span>•</span>
            </>
          )}
          <time dateTime={post.createdAt}>
            {new Date(post.createdAt).toLocaleDateString()}
          </time>
        </div>
        <h1 className="text-4xl font-bold font-serif mb-4">{post.title}</h1>
        <p className="text-xl text-muted-foreground">{post.excerpt}</p>
      </header>

      <div className="prose dark:prose-invert max-w-none">
        {post.content.split('\n\n').map((paragraph, i) => {
          if (paragraph.startsWith('## ')) {
            return (
              <h2 key={i} className="text-2xl font-bold mt-8 mb-4">
                {paragraph.replace('## ', '')}
              </h2>
            )
          }
          if (paragraph.startsWith('```')) {
            const code = paragraph.replace(/```[a-z]*\n/, '').replace(/```$/, '')
            return (
              <pre key={i} className="bg-muted p-4 rounded-lg overflow-x-auto">
                <code>{code}</code>
              </pre>
            )
          }
          return <p key={i} className="mb-4">{paragraph}</p>
        })}
      </div>
    </article>
  )
}