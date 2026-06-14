"use client";

import { useState } from "react";
import { PostMeta } from "@/lib/posts";
import { PostCard } from "./PostCard";
import { FolderOpen } from "lucide-react";

interface CategoryFilterProps {
  posts: PostMeta[];
  categories: { name: string; count: number }[];
}

export function CategoryFilter({ posts, categories }: CategoryFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredPosts = selectedCategory
    ? posts.filter((post) => post.category === selectedCategory)
    : posts;

  return (
    <div className="space-y-12">
      <div className="flex flex-wrap gap-3 mb-8">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-full text-sm transition-all duration-400 ${
            selectedCategory === null
              ? "bg-deep-blue text-white"
              : "bg-border-light/30 text-text-secondary hover:bg-muted-coral/20"
          }`}
        >
          全部
        </button>
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setSelectedCategory(cat.name)}
            className={`px-4 py-2 rounded-full text-sm transition-all duration-400 flex items-center gap-2 ${
              selectedCategory === cat.name
                ? "bg-deep-blue text-white"
                : "bg-border-light/30 text-text-secondary hover:bg-muted-coral/20"
            }`}
          >
            <FolderOpen size={14} />
            {cat.name}
            <span className="text-xs opacity-60">({cat.count})</span>
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filteredPosts.map((post, index) => (
          <PostCard key={post.slug} post={post} index={index} />
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-text-muted italic">该分类下暂无文章</p>
        </div>
      )}
    </div>
  );
}
