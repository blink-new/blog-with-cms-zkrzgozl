
import { useState, useCallback } from "react";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Save, Send, Image as ImageIcon, Link as LinkIcon, Bold, Italic, Heading1, Heading2, List, Quote } from 'lucide-react';
import { postStore } from "@/lib/posts";
import { mediaStore } from "@/lib/media";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

const MenuBar = ({ editor }: { editor: any }) => {
  const [linkUrl, setLinkUrl] = useState('');
  const [showLinkInput, setShowLinkInput] = useState(false);

  const addImage = useCallback(async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async () => {
      const file = input.files?.[0];
      if (file) {
        const media = await mediaStore.addMedia(file);
        editor.chain().focus().setImage({ src: media.url }).run();
      }
    };
    input.click();
  }, [editor]);

  if (!editor) return null;

  const buttons = [
    { icon: Bold, label: 'Bold', action: () => editor.chain().focus().toggleBold().run(), isActive: editor.isActive('bold') },
    { icon: Italic, label: 'Italic', action: () => editor.chain().focus().toggleItalic().run(), isActive: editor.isActive('italic') },
    { icon: Heading1, label: 'H1', action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), isActive: editor.isActive('heading', { level: 1 }) },
    { icon: Heading2, label: 'H2', action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), isActive: editor.isActive('heading', { level: 2 }) },
    { icon: List, label: 'List', action: () => editor.chain().focus().toggleBulletList().run(), isActive: editor.isActive('bulletList') },
    { icon: Quote, label: 'Quote', action: () => editor.chain().focus().toggleBlockquote().run(), isActive: editor.isActive('blockquote') },
  ];

  return (
    <div className="border-b border-white/20 p-2 flex flex-wrap gap-1 items-center">
      {buttons.map(({ icon: Icon, label, action, isActive }) => (
        <Button
          key={label}
          onClick={action}
          className={`h-8 px-2 ${isActive ? 'bg-white/20' : ''}`}
          variant="ghost"
          size="sm"
        >
          <Icon className="h-4 w-4" />
        </Button>
      ))}
      
      <div className="h-4 w-px bg-white/20 mx-2" />
      
      <Button
        onClick={addImage}
        className="h-8 px-2"
        variant="ghost"
        size="sm"
      >
        <ImageIcon className="h-4 w-4" />
      </Button>

      <div className="relative">
        <Button
          onClick={() => setShowLinkInput(!showLinkInput)}
          className={`h-8 px-2 ${editor.isActive('link') ? 'bg-white/20' : ''}`}
          variant="ghost"
          size="sm"
        >
          <LinkIcon className="h-4 w-4" />
        </Button>
        
        {showLinkInput && (
          <div className="absolute top-full left-0 mt-1 flex gap-1 bg-background border rounded-md p-1 z-10">
            <Input
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="Enter URL"
              className="h-8 w-48"
            />
            <Button
              size="sm"
              onClick={() => {
                editor.chain().focus().setLink({ href: linkUrl }).run();
                setLinkUrl('');
                setShowLinkInput(false);
              }}
            >
              Add
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default function PostEditor() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'prose prose-invert prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[300px] p-4',
      },
    },
  });

  const handleCoverImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const media = await mediaStore.addMedia(file);
      setCoverImage(media.url);
    }
  };

  const handleSave = async (publishStatus: 'draft' | 'published') => {
    if (!title || !editor?.getHTML()) {
      toast({
        title: "Error",
        description: "Title and content are required",
        variant: "destructive",
      });
      return;
    }

    try {
      const post = postStore.createPost({
        title,
        content: editor.getHTML(),
        excerpt: excerpt || title,
        categoryId,
        coverImage,
        status: publishStatus,
      });

      toast({
        title: "Success",
        description: `Post ${publishStatus === 'published' ? 'published' : 'saved as draft'}`,
      });

      navigate('/admin/dashboard');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save post",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Create New Post
          </h2>
          <p className="text-white/70">Write and publish your content</p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={() => handleSave('draft')} 
            variant="outline"
            className="bg-background/50 backdrop-blur-sm"
          >
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          <Button 
            onClick={() => handleSave('published')}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
          >
            <Send className="mr-2 h-4 w-4" />
            Publish
          </Button>
        </div>
      </div>

      <div className="glass-card p-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium text-white">
              Post Title
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title"
              className="glass"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="excerpt" className="text-sm font-medium text-white">
              Excerpt
            </label>
            <Textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Brief description of your post"
              className="glass"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">
                Category
              </label>
              <Select value={categoryId} onValueChange={setCategoryId}>
                <SelectTrigger className="glass">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {postStore.getAllCategories().map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white">
                Cover Image
              </label>
              <div className="flex gap-2 items-center">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleCoverImageUpload}
                  className="glass"
                />
                {coverImage && (
                  <img 
                    src={coverImage} 
                    alt="Cover preview" 
                    className="h-10 w-10 object-cover rounded"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Content</label>
            <div className="glass rounded-xl overflow-hidden">
              <MenuBar editor={editor} />
              <EditorContent editor={editor} className="min-h-[300px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}