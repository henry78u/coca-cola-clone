import React from "react";
import { Link } from "react-router-dom";
import { Clock, Calendar, ArrowRight, User } from "lucide-react";
import PageHero from "../components/PageHero";
import Container from "../components/Container";
import Card from "../components/Card";
import { POSTS } from "../data/posts";

export const Blog: React.FC = () => {
  return (
    <div className="w-full bg-[#000000] pb-24 md:pb-32">
      {/* Page Hero with Particles Background */}
      <PageHero
        eyebrow="STORIES"
        title="From the Fizz Journal"
        subtitle="Dispatches on design systems, sensory chemistry, sustainable packaging, and the enduring craft of brand identity."
        backgroundType="particles"
        shinyWord="Journal"
      />

      <Container className="mt-12 md:mt-16">
        {/* 6 Post Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {POSTS.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              id={`post-card-${post.slug}`}
              className="group block h-full focus:outline-none"
            >
              <Card className="flex flex-col justify-between h-full p-6 group-hover:border-[#F40009]/40">
                <div>
                  {/* Article Thumbnail */}
                  <div className="relative aspect-16/10 w-full rounded-xl overflow-hidden bg-black/40 mb-6 border border-white/10">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium bg-black/80 backdrop-blur-md text-white border border-white/10">
                      {post.category}
                    </span>
                  </div>

                  {/* Metadata Header */}
                  <div className="flex items-center gap-3 text-xs text-white/50 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-medium text-white tracking-tight group-hover:text-[#F40009] transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="mt-3 text-sm text-white/80 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                {/* Author & Read Link */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-white/70">
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white">
                      <User className="w-3.5 h-3.5" />
                    </div>
                    <span>{post.author}</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#F40009] group-hover:translate-x-1 transition-transform">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Blog;
