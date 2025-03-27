
import { ComingSoon } from "@/components/coming-soon";
import { Layout } from "@/components/layout";

export default function NewsletterPage() {
  return (
    <Layout>
      <ComingSoon 
        title="Newsletter Coming Soon"
        description="Stay up to date with our latest posts and updates. We're building a beautiful newsletter system just for you."
      />
    </Layout>
  );
}