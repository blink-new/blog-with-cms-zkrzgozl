
import { Card } from '@/components/ui/card'
import { FileText, Image, Users, Eye } from 'lucide-react'

export default function Dashboard() {
  const stats = [
    { name: 'Total Posts', value: '12', icon: FileText },
    { name: 'Media Items', value: '48', icon: Image },
    { name: 'Total Views', value: '2.4k', icon: Eye },
    { name: 'Active Users', value: '320', icon: Users },
  ]

  const recentPosts = [
    { id: 1, title: 'Getting Started with Our CMS', date: '2024-02-19', views: 156 },
    { id: 2, title: 'Best Practices for Content Creation', date: '2024-02-18', views: 98 },
    { id: 3, title: 'How to Optimize Your Content', date: '2024-02-17', views: 234 },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">Welcome back to your CMS dashboard.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.name} className="p-6">
              <div className="flex items-center gap-4">
                <Icon className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">{stat.name}</p>
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Posts</h3>
        <div className="divide-y">
          {recentPosts.map((post) => (
            <div key={post.id} className="py-4 flex items-center justify-between">
              <div>
                <h4 className="font-medium">{post.title}</h4>
                <p className="text-sm text-muted-foreground">{post.date}</p>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{post.views}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}