
import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Plus, Edit2, Trash2, Save } from 'lucide-react'

export default function CategoryManager() {
  const [categories] = useState([
    { id: 1, name: 'Technology', slug: 'technology', description: 'Tech-related posts', postCount: 5 },
    { id: 2, name: 'Design', slug: 'design', description: 'Design and UX posts', postCount: 3 },
    { id: 3, name: 'Business', slug: 'business', description: 'Business insights', postCount: 4 },
  ])

  const [newCategory, setNewCategory] = useState({
    name: '',
    slug: '',
    description: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('New category:', newCategory)
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Categories
          </h2>
          <p className="text-white/70">Manage your content categories.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="glass-card p-6">
          <h3 className="text-xl font-semibold mb-6 text-white">Add New Category</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-white">Name</Label>
              <Input
                id="name"
                placeholder="Category name"
                className="glass mt-1"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="slug" className="text-white">Slug</Label>
              <Input
                id="slug"
                placeholder="category-slug"
                className="glass mt-1"
                value={newCategory.slug}
                onChange={(e) => setNewCategory({ ...newCategory, slug: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="description" className="text-white">Description</Label>
              <Textarea
                id="description"
                placeholder="Category description"
                className="glass mt-1"
                value={newCategory.description}
                onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
              />
            </div>
            <Button type="submit" className="w-full glass-button">
              <Save className="mr-2 h-4 w-4" />
              Create Category
            </Button>
          </form>
        </div>

        <div className="glass-card p-6">
          <h3 className="text-xl font-semibold mb-6 text-white">Existing Categories</h3>
          <div className="space-y-4">
            {categories.map((category, index) => (
              <div 
                key={category.id} 
                className="glass p-4 rounded-xl transition-all duration-300 hover:bg-white/10"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-white">{category.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-white/70">/{category.slug}</span>
                      <span className="text-white/30">•</span>
                      <span className="text-sm text-white/70">{category.postCount} posts</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" className="glass-button">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="glass-button text-red-400">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}