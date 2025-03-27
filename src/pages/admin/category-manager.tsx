
import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react'
import { postStore } from '@/lib/posts'
import { toast } from '@/components/ui/use-toast'
import { Category } from '@/lib/types'

export default function CategoryManager() {
  const [categories, setCategories] = useState<(Category & { postCount: number })[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  })

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = () => {
    const stats = postStore.getStats()
    setCategories(stats.postsByCategory)
  }

  const resetForm = () => {
    setFormData({ name: '', description: '' })
    setEditingId(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      if (editingId) {
        postStore.updateCategory(editingId, formData)
        toast({
          title: "Success",
          description: "Category updated successfully",
        })
      } else {
        postStore.createCategory(formData)
        toast({
          title: "Success",
          description: "Category created successfully",
        })
      }
      
      loadCategories()
      resetForm()
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save category",
        variant: "destructive",
      })
    }
  }

  const handleEdit = (category: Category) => {
    setEditingId(category.id)
    setFormData({
      name: category.name,
      description: category.description || ''
    })
  }

  const handleDelete = (id: string) => {
    try {
      postStore.deleteCategory(id)
      toast({
        title: "Success",
        description: "Category deleted successfully",
      })
      loadCategories()
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete category",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Categories
          </h2>
          <p className="text-white/70">Manage your content categories</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="glass-card p-6">
          <h3 className="text-xl font-semibold mb-6 text-white">
            {editingId ? 'Edit Category' : 'Add New Category'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-white">Name</Label>
              <Input
                id="name"
                placeholder="Category name"
                className="glass mt-1"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="description" className="text-white">Description</Label>
              <Textarea
                id="description"
                placeholder="Category description"
                className="glass mt-1"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit" className="flex-1 glass-button">
                <Save className="mr-2 h-4 w-4" />
                {editingId ? 'Update Category' : 'Create Category'}
              </Button>
              {editingId && (
                <Button 
                  type="button" 
                  variant="ghost" 
                  onClick={resetForm}
                  className="glass-button"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
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
                    {category.description && (
                      <p className="text-sm text-white/50 mt-1">{category.description}</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="glass-button"
                      onClick={() => handleEdit(category)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="glass-button text-red-400"
                      onClick={() => handleDelete(category.id)}
                      disabled={category.postCount > 0}
                      title={category.postCount > 0 ? "Cannot delete category with posts" : "Delete category"}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            
            {categories.length === 0 && (
              <div className="text-center py-8 text-white/50">
                No categories yet. Create your first category to get started.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}