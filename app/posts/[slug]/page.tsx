import { notFound } from "next/navigation";
import { getPostBySlug, getPostSlugs, renderPost } from "@/lib/posts";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/lib/config";

interface PostPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PostPageProps) {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const post = getPostBySlug(params.slug);
  if (!post) {
    notFound();
  }

  const htmlContent = await renderPost(post.content);

  return (
    <article className="max-w-2xl mx-auto">
      <div className="animate-fade-in">
        <Link
          href="/categories/"
          className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-soft-coral transition-colors duration-400 mb-12"
        >
          <ArrowLeft size={16} />
          返回文章列表
        </Link>
      </div>

      <div className="animate-slide-up">
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-4 text-sm text-text-muted flex-wrap">
            <span className="text-soft-coral font-medium">{post.category}</span>
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              {post.date}
            </span>
            {post.readingTime && (
              <span className="flex items-center gap-1">
                <Clock size={14} />
                {post.readingTime}
              </span>
            )}
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif text-deep-blue leading-tight mb-4">
            {post.title}
          </h1>
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 rounded-full bg-muted-coral/20 text-soft-coral"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>
      </div>

      <div className="animate-slide-up-delay">
        <div
          className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-deep-blue prose-headings:font-normal prose-p:text-text-primary prose-p:leading-relaxed prose-a:text-soft-coral prose-a:no-underline hover:prose-a:underline prose-strong:text-deep-blue prose-li:text-text-secondary"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>

      <div className="mt-16 pt-8 border-t border-border-light/50 animate-slide-up-delay-2">
        <p className="text-sm text-text-muted italic text-center">
          感谢阅读。欢迎在{" "}
          <a href={siteConfig.github} className="text-soft-coral">
            GitHub
          </a>{" "}
          上与我交流。
        </p>
      </div>
    </article>
  );
}
