
import { Card } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Blog</h1>
        <p className="text-lg text-muted-foreground">
          Discover amazing stories and insights
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-2">Featured Post</h2>
          <p className="text-muted-foreground">
            This is a featured post preview. Click to read more.
          </p>
        </Card>
        {/* Add more cards for recent posts */}
      </section>
    </div>
  )
}