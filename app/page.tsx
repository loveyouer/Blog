import { getAllPosts } from "@/lib/posts";
import { HomeClient } from "@/components/HomeClient";

export default function HomePage() {
  const posts = getAllPosts();
  return <HomeClient posts={posts} />;
}
