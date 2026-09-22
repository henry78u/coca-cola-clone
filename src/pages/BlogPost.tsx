import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, User, Share2, Bookmark, Heart } from "lucide-react";
import PageHero from "../components/PageHero";
import Container from "../components/Container";
import Card from "../components/Card";
import Button from "../components/Button";
import { POSTS } from "../data/posts";

export const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = POSTS.find((p) => p.slug === slug) || POSTS[0];

  return (
    <div className="w-full bg-[#000000] pb-24 md:pb-32">
      {/* Compact PageHero with Grid Background */}
      <PageHero
        eyebrow={`THE FIZZ JOURNAL • ${post.category.toUpperCase()}`}
        title={post.title}
        subtitle={post.excerpt}
        backgroundType="grid"
        height="compact"
        shinyWord="Bottle"
      />

      <Container className="mt-8 md:mt-12">
        {/* Back to Blog link */}
        <div className="max-w-3xl mx-auto mb-8">
          <Link
            to="/blog"
            id="back-to-blog-link"
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-[#F40009]" />
            <span>Back to All Stories</span>
          </Link>
        </div>

        {/* Centered Prose Column (max-w-3xl) */}
        <article className="max-w-3xl mx-auto">
          {/* Author and Date Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-6 border-y border-white/10 mb-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#F40009]/20 border border-[#F40009]/30 flex items-center justify-center text-[#F40009]">
                <User className="w-6 h-6" />
              </div>
              <div>
                <p className="text-base font-medium text-white">{post.author}</p>
                <p className="text-xs text-white/60">{post.authorRole}</p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-xs text-white/60">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
            </div>
          </div>

          {/* Hero Featured Article Image */}
          <div className="relative aspect-16/9 w-full rounded-2xl overflow-hidden mb-12 border border-white/10 bg-white/5">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Article Paragraphs */}
          <div className="space-y-6 text-base md:text-lg text-white/80 leading-relaxed font-normal">
            {post.content.map((paragraph, index) => (
              <p key={index} className="leading-relaxed">
                {paragraph}
              </p>
            ))}

            <div className="my-10 p-8 rounded-2xl bg-white/5 border-l-4 border-[#F40009] text-white">
              <p className="text-xl md:text-2xl font-medium tracking-tight italic">
                "Design is not merely how a package appears under showroom lighting—it is how the user's hand remembers it when reaching into a cooler on a scorching afternoon."
              </p>
              <p className="mt-3 text-xs uppercase tracking-wider text-white/60">
                — Excerpt from the Coca-Cola Clone Design Thesis
              </p>
            </div>

            <p className="leading-relaxed">
              As we explore the interaction paradigms of the modern web, these foundational branding principles retain profound relevance. Balance, rhythm, sensory expectation, and typographic clarity form the unbreakable link between brand intention and human memory.
            </p>
          </div>

          {/* Share & Feedback Footer */}
          <div className="mt-16 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white hover:bg-white/10 flex items-center gap-2 transition-colors cursor-pointer"
                onClick={() => alert("Story link copied to clipboard!")}
              >
                <Share2 className="w-3.5 h-3.5 text-[#F40009]" />
                <span>Share Story</span>
              </button>
              <button
                type="button"
                className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white hover:bg-white/10 flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>Save for Class</span>
              </button>
            </div>

            <Link
              to="/blog"
              className="text-xs uppercase font-semibold text-[#F40009] hover:underline"
            >
              Explore More Articles →
            </Link>
          </div>
        </article>
      </Container>
    </div>
  );
};

export default BlogPost;
