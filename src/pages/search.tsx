
import { useState } from 'react'
import { Search as SearchIcon } from 'lucide-react'

// Temporary mock data
const posts = [
  {
    id: '1',
    title: 'Getting Started with React',
    excerpt: 'Learn the basics of React and how to build your first component.',
    categoryId: '1',
    category: { name: 'React', slug: 'react' },
    createdAt: '2024-02-19T12:00:00Z',
  },
  {
    id: '2',
    title: 'Advanced TypeScript Patterns',
    excerpt: 'Explore advanced TypeScript patterns and best practices.',
    categoryId: '2',
    category: { name: 'TypeScript', slug: 'typescript' },
    createdAt: '2024-02-18T12:00:00Z',
  },
]

export function Search() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState(posts)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    
    // Simple client-side search
    const filtered = posts.filter(post => 
      post.title.toLowerCase().includes(value.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(value.toLowerCase())
    )
    setResults(filtered)
  }

  return (
    <div className="space-y-8">
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search posts..."
          value={query}
          onChange={handleSearch}
          className="w-full pl-10 pr-4 py-2 rounded-md border bg-background"
        />
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-serif font-bold">
          {query ? `Search Results for "${query}"` : 'Recent Posts'}
        </h2>
        
        {results.length === 0 ? (
          <p className="text-muted-foreground">No posts found.</p>
        ) : (
          <div className="space-y-4">
            {results.map(post => (
              <article key={post.id} className="p-4 border rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-sm text-primary">{post.category.name}</span>
                  <span className="text-muted-foreground">•</span>
                  <time className="text-sm text-muted-foreground">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </time>
                </div>
                <h3 className="text-xl font-serif font-bold mb-2">{post.title}</h3>
                <p className="text-muted-foreground">{post.excerpt}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}