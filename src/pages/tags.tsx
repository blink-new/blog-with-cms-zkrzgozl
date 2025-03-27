
import { ComingSoon } from "@/components/coming-soon";
import { Layout } from "@/components/layout";

export default function TagsPage() {
  return (
    <Layout>
      <ComingSoon 
        title="Tags Coming Soon"
        description="We're working on an awesome tagging system to help you discover related content more easily."
      />
    </Layout>
  );
}