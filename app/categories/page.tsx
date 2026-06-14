import { getAllPosts, getCategories } from "@/lib/posts";
import { CategoryFilter } from "@/components/CategoryFilter";
import { FadeIn } from "@/components/FadeIn";

export default function CategoriesPage() {
  const posts = getAllPosts();
  const categories = getCategories();

  return (
    <div className="space-y-12">
      <FadeIn>
        <div className="mb-12">
          <h1 className="text-3xl font-serif text-deep-blue mb-4">文章列表</h1>
          <p className="text-text-secondary">按分类浏览所有文章</p>
        </div>
      </FadeIn>
      <CategoryFilter posts={posts} categories={categories} />
    </div>
  );
}
