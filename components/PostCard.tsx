"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { PostMeta } from "@/lib/posts";
import { ArrowRight, Clock } from "lucide-react";

interface PostCardProps {
  post: PostMeta;
  index: number;
}

export function PostCard({ post, index }: PostCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
      className="group"
    >
      <Link href={`/posts/${post.slug}/`} className="block">
        <div className="py-6 border-b border-border-light/50 transition-all duration-600 group-hover:pl-2">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs text-soft-coral tracking-wide-2 font-medium">
              {post.category}
            </span>
            <span className="text-xs text-text-muted">
              {post.date}
            </span>
            {post.readingTime && (
              <span className="text-xs text-text-muted flex items-center gap-1">
                <Clock size={12} />
                {post.readingTime}
              </span>
            )}
          </div>
          <h3 className="text-xl font-serif text-text-primary group-hover:text-deep-blue transition-colors duration-400 mb-2">
            {post.title}
          </h3>
          <p className="text-sm text-text-secondary leading-relaxed mb-3 line-clamp-2">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-1 text-sm text-soft-coral opacity-0 group-hover:opacity-100 transition-opacity duration-400">
            <span>阅读全文</span>
            <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform duration-400" />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
