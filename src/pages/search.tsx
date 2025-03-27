
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search as SearchIcon } from 'lucide-react'
import { postStore } from '../lib/posts'
import type { Post } from '../lib/posts'

export function SearchPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Post[]>([])
  const [allPosts, setAllPosts] = useState<Post[]>([])

  useEffect(() => {
    setAllPosts(postStore.getAllPosts())
  }, [])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    
    if (!value.trim()) {
      setResults(allPosts)
      return
    }

    const searchValue = value.toLowerCase()
    const filtered = allPosts.filter(post => 
      post.title.toLowerCase().includes(searchValue) ||
      post.excerpt.toLowerCase().includes(searchValue) ||
      post.content.toLowerCase().includes(searchValue)
    )
    setResults(filtered)
  }

  // Initialize with all posts
  useEffect(() => {
    setResults(allPosts)
  }, [allPosts])

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
          {query ? `Search Results for "${query}"` : 'All Posts'}
        </h2>
        
        {results.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            No posts found. Try a different search term.
          </p>
        ) : (
          <div className="space-y-4">
            {results.map(post => {
              const category = postStore.getCategory(post.categoryId)
              return (
                <article key={post.id} className="p-4 border rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    {category && (
                      <>
                        <Link 
                          to={`/category/${category.slug}`}
                          className="text-sm text-primary hover:underline"
                        >
                          {category.name}
                        </Link>
                        <span className="text-muted-foreground">•</span>
                      </>
                    )}
                    <time className="text-sm text-muted-foreground">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </time>
                  </div>
                  <h3 className="text-xl font-serif font-bold mb-2">
                    <Link 
                      to={`/blog/${post.slug}`}
                      className="hover:text-primary"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-muted-foreground">{post.excerpt}</p>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}