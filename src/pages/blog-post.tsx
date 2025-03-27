
import { useParams } from 'react-router-dom';
import { postStore } from '../lib/posts';

export function BlogPost() {
  const { slug } = useParams();
  const post = postStore.getPostBySlug(slug || '');

  if (!post) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold">Post not found</h1>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto">
      {post.coverImage && (
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-64 object-cover rounded-lg mb-8"
        />
      )}
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <div className="prose prose-invert max-w-none">
        {post.content}
      </div>
    </article>
  );
}