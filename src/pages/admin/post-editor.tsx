
import { useState, useCallback, useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import Typography from '@tiptap/extension-typography'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card } from '@/components/ui/card'
import { toast } from 'sonner'
import { postStore } from '@/lib/posts'
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Image as ImageIcon,
  Link as LinkIcon,
  Save,
  Send,
  Undo,
  Redo,
  Heading1,
  Heading2,
  Quote,
  Code,
  Loader2
} from 'lucide-react'

const AUTOSAVE_DELAY = 2000

export function PostEditor() {
  const [post, setPost] = useState({
    title: '',
    content: '',
    categoryId: '',
    status: 'draft' as const,
    excerpt: '',
    coverImage: ''
  })
  const [isSaving, setIsSaving] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)
  const [categories] = useState(() => postStore.getAllCategories())

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: false,
      }),
      Placeholder.configure({
        placeholder: 'Begin your story...',
      }),
      Typography,
    ],
    content: post.content,
    onUpdate: ({ editor }) => {
      setPost(prev => ({
        ...prev,
        content: editor.getHTML()
      }))
    },
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none focus:outline-none min-h-[300px] px-4 py-2',
      },
    },
  })

  // Autosave functionality
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (post.title && post.content && !isSaving) {
        await handleSave(true)
      }
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

  const handleSave = async (isAutosave = false) => {
    if (!post.title || !post.content) {
      toast.error('Please add a title and content')
      return
    }

    setIsSaving(true)
    try {
      if (post.id) {
        await postStore.updatePost(post.id, post)
      } else {
        const newPost = await postStore.createPost(post)
        setPost(prev => ({ ...prev, id: newPost.id }))
      }
      localStorage.setItem('draft-post', JSON.stringify(post))
      if (!isAutosave) {
        toast.success('Draft saved successfully')
      }
    } catch (error) {
      toast.error('Failed to save draft')
    } finally {
      setIsSaving(false)
    }
  }

  const handlePublish = async () => {
    if (!post.title || !post.content || !post.categoryId) {
      toast.error('Please fill in all required fields')
      return
    }

    setIsPublishing(true)
    try {
      const publishedPost = {
        ...post,
        status: 'published' as const
      }
      
      if (post.id) {
        await postStore.updatePost(post.id, publishedPost)
      } else {
        const newPost = await postStore.createPost(publishedPost)
        setPost(newPost)
      }
      
      localStorage.removeItem('draft-post')
      toast.success('Post published successfully')
    } catch (error) {
      toast.error('Failed to publish post')
    } finally {
      setIsPublishing(false)
    }
  }

  const handleImageUpload = useCallback(() => {
    const url = window.prompt('Enter image URL')
    if (url && editor) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }, [editor])

  const handleLinkAdd = useCallback(() => {
    const url = window.prompt('Enter URL')
    if (url && editor) {
      editor.chain().focus().setLink({ href: url }).run()
    }
  }, [editor])

  if (!editor) {
    return null
  }

  return (
    <div className="space-y-8 pb-8 max-w-[1000px] mx-auto">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Post Editor</h1>
          <p className="text-muted-foreground">
            Create and edit your blog posts
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => handleSave()}
            disabled={isSaving}
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            Save Draft
          </Button>
          <Button 
            onClick={handlePublish}
            disabled={isPublishing}
          >
            {isPublishing ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Send className="w-4 h-4 mr-2" />
            )}
            Publish
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={post.title}
              onChange={(e) => setPost(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Enter post title..."
              className="text-lg"
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
                {categories.map(category => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="coverImage">Cover Image URL</Label>
          <Input
            id="coverImage"
            value={post.coverImage}
            onChange={(e) => setPost(prev => ({ ...prev, coverImage: e.target.value }))}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <Card className="overflow-hidden border-2">
          <div className="border-b p-2 bg-muted/50">
            <div className="flex flex-wrap gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo()}
                className="h-8 w-8 p-0"
              >
                <Undo className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}
                className="h-8 w-8 p-0"
              >
                <Redo className="h-4 w-4" />
              </Button>
              <div className="w-px h-8 bg-border mx-2" />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={`h-8 w-8 p-0 ${editor.isActive('heading', { level: 1 }) ? 'bg-muted' : ''}`}
              >
                <Heading1 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`h-8 w-8 p-0 ${editor.isActive('heading', { level: 2 }) ? 'bg-muted' : ''}`}
              >
                <Heading2 className="h-4 w-4" />
              </Button>
              <div className="w-px h-8 bg-border mx-2" />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`h-8 w-8 p-0 ${editor.isActive('bold') ? 'bg-muted' : ''}`}
              >
                <Bold className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`h-8 w-8 p-0 ${editor.isActive('italic') ? 'bg-muted' : ''}`}
              >
                <Italic className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`h-8 w-8 p-0 ${editor.isActive('bulletList') ? 'bg-muted' : ''}`}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`h-8 w-8 p-0 ${editor.isActive('orderedList') ? 'bg-muted' : ''}`}
              >
                <ListOrdered className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={`h-8 w-8 p-0 ${editor.isActive('blockquote') ? 'bg-muted' : ''}`}
              >
                <Quote className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                className={`h-8 w-8 p-0 ${editor.isActive('codeBlock') ? 'bg-muted' : ''}`}
              >
                <Code className="h-4 w-4" />
              </Button>
              <div className="w-px h-8 bg-border mx-2" />
              <Button
                variant="ghost"
                size="sm"
                onClick={handleImageUpload}
                className="h-8 w-8 p-0"
              >
                <ImageIcon className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLinkAdd}
                className={`h-8 w-8 p-0 ${editor.isActive('link') ? 'bg-muted' : ''}`}
              >
                <LinkIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <EditorContent editor={editor} />
        </Card>

        <div className="space-y-2">
          <Label htmlFor="excerpt">Excerpt</Label>
          <Input
            id="excerpt"
            value={post.excerpt}
            onChange={(e) => setPost(prev => ({ ...prev, excerpt: e.target.value }))}
            placeholder="Brief description of your post..."
          />
        </div>
      </div>
    </div>
  )
}