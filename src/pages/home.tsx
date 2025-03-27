
import { Link } from 'react-router-dom'
import { Card } from "@/components/ui/card"
import { postStore } from '../lib/posts'

export function HomePage() {
  const posts = postStore.getAllPosts()
  const categories = postStore.getAllCategories()

  // Initialize sample data if needed
  if (posts.length === 0) {
    postStore.initializeData()
  }

  return (
    <div className="space-y-12">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Blog</h1>
        <p className="text-lg text-muted-foreground">
          Discover amazing stories and insights
        </p>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Latest Posts</h2>
          <Link 
            to="/search"
            className="text-primary hover:underline"
          >
            View all posts
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => {
            const category = categories.find(c => c.id === post.categoryId)
            return (
              <Card key={post.id} className="overflow-hidden group">
                {post.coverImage && (
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6">
                  {category && (
                    <Link
                      to={`/category/${category.slug}`}
                      className="text-sm text-primary hover:underline"
                    >
                      {category.name}
                    </Link>
                  )}
                  <h3 className="text-xl font-semibold mt-2 mb-2 group-hover:text-primary">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {post.excerpt}
                  </p>
                  <time className="text-sm text-muted-foreground">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </time>
                </div>
              </Card>
            )
          })}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map(category => (
            <Link
              key={category.id}
              to={`/category/${category.slug}`}
              className="block p-6 rounded-lg border bg-card hover:bg-accent transition-colors"
            >
              <h3 className="font-semibold mb-2">{category.name}</h3>
              <p className="text-sm text-muted-foreground">
                {category.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}