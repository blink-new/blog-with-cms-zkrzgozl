
import { Card } from '@/components/ui/card'
import { FileText, Image, Users, Eye, ArrowUp, ArrowDown } from 'lucide-react'

export default function Dashboard() {
  const stats = [
    { 
      name: 'Total Posts', 
      value: '12', 
      change: '+2.4%',
      trend: 'up',
      icon: FileText 
    },
    { 
      name: 'Media Items', 
      value: '48', 
      change: '+5.7%',
      trend: 'up',
      icon: Image 
    },
    { 
      name: 'Total Views', 
      value: '2.4k', 
      change: '-0.3%',
      trend: 'down',
      icon: Eye 
    },
    { 
      name: 'Active Users', 
      value: '320', 
      change: '+4.2%',
      trend: 'up',
      icon: Users 
    },
  ]

  const recentPosts = [
    { id: 1, title: 'Getting Started with Our CMS', date: '2024-02-19', views: 156, status: 'published' },
    { id: 2, title: 'Best Practices for Content Creation', date: '2024-02-18', views: 98, status: 'draft' },
    { id: 3, title: 'How to Optimize Your Content', date: '2024-02-17', views: 234, status: 'published' },
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
        {stats.map((stat, index) => {
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
                  <span>{post.date}</span>
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
                <span className="text-sm">{post.views}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}