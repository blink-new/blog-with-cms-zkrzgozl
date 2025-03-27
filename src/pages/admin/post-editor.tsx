
import { useState, useCallback, useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card } from '@/components/ui/card'
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Image as ImageIcon,
  Save,
  Send
} from 'lucide-react'

interface Post {
  id?: string;
  title: string;
  content: string;
  categoryId: string;
  status: 'draft' | 'published';
}

const AUTOSAVE_DELAY = 2000

export function PostEditor() {
  const [post, setPost] = useState<Post>({
    title: '',
    content: '',
    categoryId: '',
    status: 'draft'
  })

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image
    ],
    content: post.content,
    onUpdate: ({ editor }) => {
      setPost(prev => ({
        ...prev,
        content: editor.getHTML()
      }))
    }
  })

  // Autosave functionality
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('Autosaving...', post)
      // TODO: Implement actual save
      localStorage.setItem('draft-post', JSON.stringify(post))
    }, AUTOSAVE_DELAY)

    return () => clearTimeout(timer)
  }, [post])

  // Load draft on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('draft-post')
    if (savedDraft) {
      const parsedDraft = JSON.parse(savedDraft)
      setPost(parsedDraft)
      editor?.commands.setContent(parsedDraft.content)
    }
  }, [])

  const handlePublish = () => {
    setPost(prev => ({ ...prev, status: 'published' }))
    // TODO: Implement actual publish
    console.log('Publishing...', post)
  }

  const handleImageUpload = useCallback(() => {
    const url = window.prompt('Enter image URL')
    if (url && editor) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }, [editor])

  return (
    <div className="space-y-8 pb-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Post Editor</h1>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => console.log('Saving...', post)}
          >
            <Save className="w-4 h-4 mr-2" />
            Save Draft
          </Button>
          <Button onClick={handlePublish}>
            <Send className="w-4 h-4 mr-2" />
            Publish
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={post.title}
            onChange={(e) => setPost(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Enter post title..."
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select 
            value={post.categoryId}
            onValueChange={(value) => setPost(prev => ({ ...prev, categoryId: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tech">Technology</SelectItem>
              <SelectItem value="lifestyle">Lifestyle</SelectItem>
              <SelectItem value="travel">Travel</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card className="p-4">
          <div className="border-b pb-2 mb-4">
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor?.chain().focus().toggleBold().run()}
                className={editor?.isActive('bold') ? 'bg-muted' : ''}
              >
                <Bold className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor?.chain().focus().toggleItalic().run()}
                className={editor?.isActive('italic') ? 'bg-muted' : ''}
              >
                <Italic className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor?.chain().focus().toggleBulletList().run()}
                className={editor?.isActive('bulletList') ? 'bg-muted' : ''}
              >
                <List className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                className={editor?.isActive('orderedList') ? 'bg-muted' : ''}
              >
                <ListOrdered className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleImageUpload}
              >
                <ImageIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <EditorContent 
            editor={editor} 
            className="min-h-[400px] prose prose-sm max-w-none focus:outline-none"
          />
        </Card>
      </div>
    </div>
  )
}