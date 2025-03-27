
interface Media {
  id: string;
  url: string;
  type: 'image' | 'video';
  filename: string;
  createdAt: string;
}

class MediaStore {
  private storageKey = 'blog-media';

  getAllMedia(): Media[] {
    const media = localStorage.getItem(this.storageKey);
    return media ? JSON.parse(media) : [];
  }

  addMedia(file: File): Promise<Media> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newMedia: Media = {
          id: crypto.randomUUID(),
          url: reader.result as string,
          type: file.type.startsWith('image/') ? 'image' : 'video',
          filename: file.name,
          createdAt: new Date().toISOString()
        };

        const media = this.getAllMedia();
        media.unshift(newMedia);
        localStorage.setItem(this.storageKey, JSON.stringify(media));
        resolve(newMedia);
      };
      reader.readAsDataURL(file);
    });
  }

  deleteMedia(id: string): boolean {
    const media = this.getAllMedia();
    const filtered = media.filter(m => m.id !== id);
    if (filtered.length === media.length) return false;
    localStorage.setItem(this.storageKey, JSON.stringify(filtered));
    return true;
  }
}

export const mediaStore = new MediaStore();