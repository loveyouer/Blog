"use client";

import { motion } from "framer-motion";
import { FadeIn } from "@/components/FadeIn";
import { siteConfig } from "@/lib/config";
import { User, Heart, Coffee, BookOpen } from "lucide-react";

export default function AboutPage() {
  const interests = [
    { icon: BookOpen, label: "阅读" },
    { icon: Coffee, label: "咖啡" },
    { icon: Heart, label: "设计" },
    { icon: User, label: "开源" },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <FadeIn duration={1}>
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-24 h-24 rounded-full bg-muted-coral/20 mx-auto mb-6 flex items-center justify-center"
          >
            <User size={36} className="text-soft-coral" />
          </motion.div>
          <h1 className="text-3xl font-serif text-deep-blue mb-4">关于</h1>
          <p className="text-text-secondary leading-relaxed">
            {siteConfig.bio}
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="mb-12">
          <h2 className="text-xl font-serif text-deep-blue mb-4">关于这个博客</h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            这是一个安静的角落，用来记录学习、思考与生活中的点滴。技术文章侧重于实用与深入，
            设计思考关注简约与美感，生活随笔则是偶尔的心情记录。
          </p>
          <p className="text-text-secondary leading-relaxed">
            博客的设计灵感来自一幅骑行插画——柔和的蜜桃色天空、翠绿的草地与深蓝的道路，
            代表着一种安静而充满生命力的生活态度。我希望这里的每一篇文章，都能像那幅画一样，
            带给你片刻的宁静与思考。
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.3}>
        <div className="mb-12">
          <h2 className="text-xl font-serif text-deep-blue mb-4">兴趣标签</h2>
          <div className="flex flex-wrap gap-3">
            {interests.map((item) => (
              <motion.div
                key={item.label}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-border-light/30 text-text-secondary hover:bg-muted-coral/20 transition-colors duration-400"
              >
                <item.icon size={16} className="text-soft-coral" />
                <span className="text-sm">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.4}>
        <div className="p-6 rounded-lg bg-card-bg border border-border-light/50">
          <h2 className="text-xl font-serif text-deep-blue mb-4">联系方式</h2>
          <div className="space-y-2 text-sm text-text-secondary">
            <p>
              GitHub:{" "}
              <a href={siteConfig.github} className="text-soft-coral">
                {siteConfig.github}
              </a>
            </p>
            <p>
              Email:{" "}
              <a href={`mailto:${siteConfig.email}`} className="text-soft-coral">
                {siteConfig.email}
              </a>
            </p>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
