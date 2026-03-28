import { useState } from 'react';
import { Plus, Pencil, Trash2, BookOpen, Eye, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBlogs } from '@/hooks/useProfile';
import { toast } from 'sonner';

export function BlogManager() {
  const { blogs, loading, deleteBlog } = useBlogs();
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this article?')) {
      await deleteBlog(id);
      toast.success('Article deleted');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-amber/30 border-t-amber rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-semibold text-mist">
            Blog
          </h2>
          <p className="text-mist-dark mt-1">
            Manage your blog posts and insights.
          </p>
        </div>
        <Button onClick={() => setShowModal(true)} className="btn-accent">
          <Plus className="w-4 h-4" />
          Write Article
        </Button>
      </div>

      {/* Articles List */}
      <div className="space-y-4">
        {blogs.map((blog) => (
          <div key={blog.id} className="portfolio-card p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-24 h-16 rounded-lg bg-teal-light/50 flex items-center justify-center overflow-hidden">
                  {blog.coverImage ? (
                    <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover" />
                  ) : (
                    <BookOpen className="w-8 h-8 text-mist-dark/30" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-display text-lg font-semibold text-mist">
                      {blog.title}
                    </h3>
                    {!blog.isPublic && (
                      <span className="px-2 py-0.5 rounded-full text-xs bg-yellow-500/10 text-yellow-400">
                        Draft
                      </span>
                    )}
                    {blog.featured && (
                      <span className="px-2 py-0.5 rounded-full text-xs bg-amber/10 text-amber">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-mist-dark text-sm mt-1 line-clamp-2">
                    {blog.excerpt}
                  </p>
                  <div className="flex items-center gap-4 mt-3 text-sm text-mist-dark">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {blog.readTime} min read
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {blog.views} views
                    </span>
                    <span>
                      {new Date(blog.publishedAt || '').toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {blog.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 rounded-full text-xs bg-mist/5 text-mist-dark border border-mist/10">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-2 rounded-lg hover:bg-mist/5 text-mist-dark hover:text-amber">
                  <Pencil className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => handleDelete(blog.id)}
                  className="p-2 rounded-lg hover:bg-red-500/10 text-mist-dark hover:text-red-400"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {blogs.length === 0 && (
        <div className="portfolio-card p-12 text-center">
          <BookOpen className="w-12 h-12 text-mist-dark mx-auto mb-4" />
          <h3 className="font-display text-lg font-semibold text-mist mb-2">
            No articles yet
          </h3>
          <p className="text-mist-dark mb-4">
            Start writing to share your insights.
          </p>
          <Button onClick={() => setShowModal(true)} className="btn-accent">
            <Plus className="w-4 h-4" />
            Write Article
          </Button>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="portfolio-card w-full max-w-3xl p-6 max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-xl font-semibold text-mist">
                Write Article
              </h3>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-mist/5 text-mist-dark">
                Close
              </button>
            </div>
            <p className="text-mist-dark text-center py-8">
              Rich text editor would go here.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}