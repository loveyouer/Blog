"use client";

import { motion } from "framer-motion";
import { PostCard } from "./PostCard";
import { FadeIn } from "./FadeIn";
import { PostMeta } from "@/lib/posts";
import { siteConfig } from "@/lib/config";
import { PenLine } from "lucide-react";

interface HomeClientProps {
  posts: PostMeta[];
}

export function HomeClient({ posts }: HomeClientProps) {
  const latestPosts = posts.slice(0, 5);
  const quote = "处世如大梦，悟者能有几";

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="py-12 sm:py-20">
        <FadeIn duration={1}>
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <h1 className="text-4xl sm:text-5xl font-serif text-deep-blue mb-6 leading-tight">
                {siteConfig.name}
              </h1>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg text-text-secondary leading-relaxed mb-8"
            >
              {siteConfig.description}
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex items-center gap-3 text-text-muted"
            >
              <PenLine size={16} />
              <span className="text-sm italic">{quote}</span>
            </motion.div>
          </div>
        </FadeIn>
      </section>

      {/* Latest Posts */}
      {latestPosts.length > 0 && (
        <section>
          <FadeIn>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-serif text-deep-blue">最新文章</h2>
              <a
                href="/categories/"
                className="text-sm text-soft-coral hover:text-deep-blue transition-colors duration-400"
              >
                查看全部 →
              </a>
            </div>
          </FadeIn>
          <div className="space-y-2">
            {latestPosts.map((post, index) => (
              <PostCard key={post.slug} post={post} index={index} />
            ))}
          </div>
        </section>
      )}

      {/* Empty State */}
      {posts.length === 0 && (
        <FadeIn>
          <div className="text-center py-20">
            <p className="text-text-muted italic">文章正在撰写中，敬请期待...</p>
          </div>
        </FadeIn>
      )}
    </div>
  );
}
