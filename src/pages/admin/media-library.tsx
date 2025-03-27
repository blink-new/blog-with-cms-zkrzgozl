
import { useState } from 'react';
import { mediaStore } from '@/lib/media';
import { Button } from '@/components/ui/button';
import { Upload, Trash2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

export default function MediaLibrary() {
  const [media, setMedia] = useState(() => mediaStore.getAllMedia());

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    for (const file of files) {
      try {
        const newMedia = await mediaStore.addMedia(file);
        setMedia(prev => [newMedia, ...prev]);
        toast({
          title: "Success",
          description: "Media uploaded successfully",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to upload media",
          variant: "destructive",
        });
      }
    }
  };

  const handleDelete = (id: string) => {
    if (mediaStore.deleteMedia(id)) {
      setMedia(prev => prev.filter(m => m.id !== id));
      toast({
        title: "Success",
        description: "Media deleted successfully",
      });
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Media Library
        </h2>
        <p className="text-white/70">Manage your images and media files</p>
      </div>

      <div className="glass-card p-6">
        <div className="mb-6">
          <label className="relative group">
            <div className="glass-button flex items-center justify-center gap-2 p-4 rounded-lg border-2 border-dashed border-white/20 hover:border-white/40 transition-colors cursor-pointer">
              <Upload className="h-6 w-6" />
              <span>Upload Media</span>
            </div>
            <input
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={handleUpload}
              className="hidden"
            />
          </label>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {media.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-square rounded-lg overflow-hidden bg-black/20"
            >
              {item.type === 'image' ? <img
                  src={item.url}
                  alt={item.filename}
                  className="w-full h-full object-cover"
                />
                :
                <video
                  src={item.url}
                  className="w-full h-full object-cover"
                />
              }
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDelete(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}