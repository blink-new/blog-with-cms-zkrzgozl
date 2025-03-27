
import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Upload, Trash2, Search, Eye, Download } from 'lucide-react'

export default function MediaLibrary() {
  const [searchQuery, setSearchQuery] = useState('')

  const mediaItems = [
    { 
      id: 1, 
      name: 'hero-image.jpg', 
      url: 'https://images.unsplash.com/photo-1707343843437-caacff5cfa74', 
      size: '2.4 MB',
      type: 'image',
      uploadedAt: '2024-02-19' 
    },
    { 
      id: 2, 
      name: 'blog-cover.jpg', 
      url: 'https://images.unsplash.com/photo-1707343843437-caacff5cfa74', 
      size: '1.8 MB',
      type: 'image',
      uploadedAt: '2024-02-18'
    },
    { 
      id: 3, 
      name: 'profile.jpg', 
      url: 'https://images.unsplash.com/photo-1707343843437-caacff5cfa74', 
      size: '1.2 MB',
      type: 'image',
      uploadedAt: '2024-02-17'
    },
  ]

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Media Library
        </h2>
        <p className="text-white/70">Manage your images and media files.</p>
      </div>

      <div className="glass-card p-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-white/50" />
              <Input
                placeholder="Search media..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 glass"
              />
            </div>
            <Button className="glass-button">
              <Upload className="mr-2 h-4 w-4" />
              Upload
            </Button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {mediaItems.map((item, index) => (
              <div 
                key={item.id} 
                className="group glass-card p-4 transition-transform duration-300 hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative aspect-square rounded-lg overflow-hidden">
                  <img
                    src={item.url}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                    <Button size="sm" variant="secondary" className="glass-button">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="secondary" className="glass-button">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="destructive" className="glass-button">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-white truncate">{item.name}</p>
                    <span className="text-xs text-white/50">{item.size}</span>
                  </div>
                  <p className="text-sm text-white/70 mt-1">{item.uploadedAt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}