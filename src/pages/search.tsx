
import { useState } from 'react';
import { postStore } from '../lib/posts';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const posts = postStore.getAllPosts().filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <header className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">Search Posts</h1>
        <div className="max-w-xl mx-auto">
          <Input
            type="search"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map(post => (
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
        ))}
      </div>
    </div>
  );
}