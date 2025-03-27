
import { ComingSoon } from "@/components/coming-soon";
import { Layout } from "@/components/layout";

export default function AuthorsPage() {
  return (
    <Layout>
      <ComingSoon 
        title="Author Profiles Coming Soon"
        description="Meet the amazing writers behind our content. Author profiles and dedicated pages are on the way!"
      />
    </Layout>
  );
}