
import { useState } from "react";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save, Send } from 'lucide-react';

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  const buttons = [
    { label: 'Bold', action: () => editor.chain().focus().toggleBold().run(), isActive: editor.isActive('bold') },
    { label: 'Italic', action: () => editor.chain().focus().toggleItalic().run(), isActive: editor.isActive('italic') },
    { label: 'Strike', action: () => editor.chain().focus().toggleStrike().run(), isActive: editor.isActive('strike') },
    { label: 'H1', action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), isActive: editor.isActive('heading', { level: 1 }) },
    { label: 'H2', action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), isActive: editor.isActive('heading', { level: 2 }) },
    { label: 'List', action: () => editor.chain().focus().toggleBulletList().run(), isActive: editor.isActive('bulletList') },
    { label: 'Quote', action: () => editor.chain().focus().toggleBlockquote().run(), isActive: editor.isActive('blockquote') },
  ];

  return (
    <div className="border-b border-white/20 p-2 flex flex-wrap gap-1">
      {buttons.map((button) => (
        <Button
          key={button.label}
          onClick={button.action}
          className={`glass-button ${button.isActive ? 'bg-white/20' : ''}`}
          size="sm"
        >
          {button.label}
        </Button>
      ))}
    </div>
  );
};

export default function PostEditor() {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  
  const editor = useEditor({
    extensions: [StarterKit],
    content: '',
    editorProps: {
      attributes: {
        class: 'prose prose-invert prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[300px] p-4',
      },
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const content = editor?.getHTML();
    console.log({ title, content, status });
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
          <Button onClick={() => setStatus('draft')} className="glass-button">
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          <Button onClick={() => setStatus('published')} className="glass-button">
            <Send className="mr-2 h-4 w-4" />
            Publish
          </Button>
        </div>
      </div>

      <div className="glass-card p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
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
            <label className="text-sm font-medium text-white">Content</label>
            <div className="glass rounded-xl overflow-hidden">
              <MenuBar editor={editor} />
              <EditorContent editor={editor} className="min-h-[300px]" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}