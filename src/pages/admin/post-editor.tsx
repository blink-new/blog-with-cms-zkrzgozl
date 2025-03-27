
import { useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Select } from '@/components/ui/select'
import { Save, Image, Eye } from 'lucide-react'

export default function PostEditor() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [preview, setPreview] = useState(false)

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log('Saving post:', { title, content })
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Post Editor</h2>
          <p className="text-muted-foreground">Create and edit your blog posts.</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => setPreview(!preview)}>
            <Eye className="mr-2 h-4 w-4" />
            {preview ? 'Edit' : 'Preview'}
          </Button>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
        </div>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select>
                <option>Technology</option>
                <option>Design</option>
                <option>Business</option>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select>
                <option>Draft</option>
                <option>Published</option>
                <option>Archived</option>
              </Select>
            </div>
          </div>

          <div className="min-h-[500px] border rounded-md">
            {preview ? (
              <div className="prose max-w-none p-6" dangerouslySetInnerHTML={{ __html: content }} />
            ) : (
              <Editor
                apiKey="your-tinymce-api-key"
                value={content}
                onEditorChange={setContent}
                init={{
                  height: 500,
                  menubar: false,
                  plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                  ],
                  toolbar: 'undo redo | blocks | ' +
                    'bold italic forecolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                }}
              />
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}