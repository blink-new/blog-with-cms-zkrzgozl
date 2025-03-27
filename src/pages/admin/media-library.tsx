
import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Upload, Trash2, Search } from 'lucide-react'

export default function MediaLibrary() {
  const [searchQuery, setSearchQuery] = useState('')

  // Mock data - replace with real media items
  const mediaItems = [
    { id: 1, name: 'hero-image.jpg', url: 'https://images.unsplash.com/photo-1707343843437-caacff5cfa74', size: '2.4 MB' },
    { id: 2, name: 'blog-cover.jpg', url: 'https://images.unsplash.com/photo-1707343843437-caacff5cfa74', size: '1.8 MB' },
    { id: 3, name: 'profile.jpg', url: 'https://images.unsplash.com/photo-1707343843437-caacff5cfa74', size: '1.2 MB' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Media Library</h2>
        <p className="text-muted-foreground">Manage your images and media files.</p>
      </div>

      <Card className="p-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search media..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Upload
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {mediaItems.map((item) => (
              <div key={item.id} className="group relative">
                <img
                  src={item.url}
                  alt={item.name}
                  className="aspect-square w-full rounded-lg object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100 rounded-lg">
                  <Button size="sm" variant="secondary">View</Button>
                  <Button size="sm" variant="destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-2">
                  <p className="font-medium truncate">{item.name}</p>
                  <p className="text-sm text-muted-foreground">{item.size}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}