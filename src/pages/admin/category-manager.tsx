
import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Plus, Edit2, Trash2 } from 'lucide-react'

export default function CategoryManager() {
  const [categories] = useState([
    { id: 1, name: 'Technology', slug: 'technology', description: 'Tech-related posts', postCount: 5 },
    { id: 2, name: 'Design', slug: 'design', description: 'Design and UX posts', postCount: 3 },
    { id: 3, name: 'Business', slug: 'business', description: 'Business insights', postCount: 4 },
  ])

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Categories</h2>
          <p className="text-muted-foreground">Manage your content categories.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Add New Category</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Category name" />
            </div>
            <div>
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" placeholder="category-slug" />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Category description" />
            </div>
            <Button className="w-full">Create Category</Button>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Existing Categories</h3>
          <div className="divide-y">
            {categories.map((category) => (
              <div key={category.id} className="py-4 flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{category.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {category.postCount} posts • /{category.slug}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost">
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}