
import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { FileText, Image, FileEdit, Eye, ArrowUp, ArrowDown } from 'lucide-react'
import { postStore } from '@/lib/posts'
import { mediaStore } from '@/lib/media'
import { Post } from '@/lib/types'
import { formatDistance } from 'date-fns'

export default function Dashboard() {
  const [stats, setStats] = useState({
    posts: { total: 0, change: '0%' },
    media: { total: 0, change: '0%' },
    drafts: { total: 0, change: '0%' },
    categories: { total: 0, change: '0%' }
  })
  const [recentPosts, setRecentPosts] = useState<Post[]>([])

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = () => {
    const postStats = postStore.getStats()
    const mediaItems = mediaStore.getAllMedia()
    
    setStats({
      posts: { 
        total: postStats.publishedPosts,
        change: '+2.4%' // In a real app, compare with last period
      },
      media: { 
        total: mediaItems.length,
        change: '+5.7%'
      },
      drafts: { 
        total: postStats.draftPosts,
        change: '+1.2%'
      },
      categories: { 
        total: postStats.categories,
        change: '+0.8%'
      }
    })

    setRecentPosts(postStats.recentPosts)
  }

  const statsConfig = [
    { 
      name: 'Published Posts', 
      value: stats.posts.total, 
      change: stats.posts.change,
      trend: 'up',
      icon: FileText 
    },
    { 
      name: 'Media Items', 
      value: stats.media.total, 
      change: stats.media.change,
      trend: 'up',
      icon: Image 
    },
    { 
      name: 'Draft Posts', 
      value: stats.drafts.total, 
      change: stats.drafts.change,
      trend: 'up',
      icon: FileEdit 
    },
    { 
      name: 'Categories', 
      value: stats.categories.total, 
      change: stats.categories.change,
      trend: 'up',
      icon: Eye 
    },
  ]

  return (
    <div className="space-y-8">
      <div className="animate-slide-up">
        <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Dashboard
        </h2>
        <p className="text-white/70">Welcome back to your CMS dashboard.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 animate-fade-in">
        {statsConfig.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div 
              key={stat.name} 
              className="glass-card p-6 transition-transform duration-300 hover:scale-105"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-white/10">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-white/70">{stat.name}</p>
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                    <span className={`flex items-center text-sm ${stat.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                      {stat.trend === 'up' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                      {stat.change}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="glass-card p-6 animate-fade-in" style={{ animationDelay: '400ms' }}>
        <h3 className="text-xl font-semibold mb-4 text-white">Recent Posts</h3>
        <div className="divide-y divide-white/10">
          {recentPosts.map((post) => (
            <div key={post.id} className="py-4 flex items-center justify-between transition-colors hover:bg-white/5 px-4 rounded-lg">
              <div>
                <h4 className="font-medium text-white">{post.title}</h4>
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <span>{formatDistance(new Date(post.createdAt || ''), new Date(), { addSuffix: true })}</span>
                  <span>•</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    post.status === 'published' ? 'bg-green-400/20 text-green-400' : 'bg-yellow-400/20 text-yellow-400'
                  }`}>
                    {post.status}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-white/70">
                <Eye className="h-4 w-4" />
                <span className="text-sm">-</span>
              </div>
            </div>
          ))}

          {recentPosts.length === 0 && (
            <div className="py-8 text-center text-white/50">
              No posts yet. Start creating content to see it here.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}