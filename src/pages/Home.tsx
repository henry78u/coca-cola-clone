import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDown, ArrowRight, Sparkles, ShieldCheck, Zap } from "lucide-react";
import ShinyText from "../components/ShinyText";
import Button from "../components/Button";
import VideoBackground from "../components/backgrounds/VideoBackground";
import Container from "../components/Container";
import SectionHeading from "../components/SectionHeading";
import Card from "../components/Card";
import { PRODUCTS } from "../data/products";

export const Home: React.FC = () => {
  const featuredProducts = PRODUCTS.slice(0, 3);

  return (
    <div className="w-full bg-[#000000]">
      {/* ═══════════════════════════════════════════════════════════════
          HERO SECTION — EXACT DESIGN DNA FROM ORIGINAL SPECIFICATION
         ═══════════════════════════════════════════════════════════════ */}
      <section
        id="hero-section"
        className="relative w-full h-screen min-h-screen flex flex-col justify-between overflow-hidden bg-black"
      >
        {/* Full-screen looping video background */}
        <VideoBackground src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_105406_16f4600d-7a92-4292-b96e-b19156c7830a.mp4" />

        {/* Top spacer to account for absolute navbar */}
        <div className="pt-28 md:pt-32" />

        {/* Center / Hero Main Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center">
          {/* Two-column top text: left paragraph, right servings stat */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end mb-8 md:mb-12 border-b border-white/10 pb-6">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm md:text-base text-white/80 leading-relaxed max-w-md"
            >
              Every bottle represents more than just a chilled beverage; it is a timeless invitation to share authentic moments of connection and vitality.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="md:text-right"
            >
              <p className="text-xl md:text-2xl font-medium tracking-tight text-white">
                1.9 Billion+ Servings Enjoyed Daily !
              </p>
              <p className="text-xs uppercase tracking-wider text-white/50 mt-1">
                Across 200+ Global Markets
              </p>
            </motion.div>
          </div>

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4"
          >
            <span className="text-xs md:text-sm uppercase tracking-tight text-white/80 font-medium inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F40009]" />
              Refreshing the World Since 1886
            </span>
          </motion.div>

          {/* Main Heading: "Taste the" (white) + "Feeling." (shiny gradient) */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl lg:text-9xl font-medium tracking-tighter leading-[0.85] text-white"
          >
            Taste the <ShinyText>Feeling.</ShinyText>
          </motion.h1>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 md:mt-12 flex flex-wrap items-center gap-4"
          >
            <Button
              id="hero-explore-btn"
              variant="primary"
              size="lg"
              to="/products"
              icon={true}
            >
              Explore Our Products
            </Button>
            <Button
              id="hero-story-btn"
              variant="ghost"
              size="lg"
              to="/about"
            >
              Our Story
            </Button>
          </motion.div>
        </div>

        {/* Scroll indicator: animated chevron, white/60 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="relative z-10 w-full pb-8 flex flex-col items-center justify-center pointer-events-none"
        >
          <a
            href="#featured-preview"
            className="pointer-events-auto flex flex-col items-center gap-1 group text-white/60 hover:text-white transition-colors"
          >
            <span className="text-[11px] uppercase tracking-widest font-medium">Scroll to Discover</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            >
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </a>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          FEATURED PRODUCTS SHOWCASE
         ═══════════════════════════════════════════════════════════════ */}
      <section id="featured-preview" className="py-24 md:py-32 border-t border-white/10 bg-black relative">
        <Container>
          <SectionHeading
            eyebrow="ICONIC SELECTION"
            title="The Taste That Defined Generations"
            subtitle="Explore hallmark varieties crafted with master precision, crisp effervescence, and unforgettable taste balance."
            shiny={true}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="flex flex-col justify-between group">
                <div>
                  <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-black/40 mb-6 border border-white/10">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    {product.badge && (
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium bg-[#F40009] text-white shadow-md">
                        {product.badge}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-xs text-white/60 mb-2">
                    <span className="uppercase tracking-wider font-medium text-[#F40009]">
                      {product.category}
                    </span>
                    <span>{product.servingSize}</span>
                  </div>
                  <h3 className="text-2xl font-medium text-white tracking-tight group-hover:text-[#F40009] transition-colors">
                    {product.name}
                  </h3>
                  <p className="mt-2 text-sm text-white/80 line-clamp-2">
                    {product.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xl font-medium text-white">
                    ${product.price.toFixed(2)}
                  </span>
                  <Link
                    to={`/products/${product.id}`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[#F40009] hover:text-white transition-colors"
                  >
                    <span>View Product</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Button to="/products" variant="ghost" size="lg" icon={true}>
              View All 12 Flavors
            </Button>
          </div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          HERITAGE SPOTLIGHT CALLOUT
         ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 border-t border-white/10 bg-gradient-to-b from-black via-zinc-950 to-black">
        <Container>
          <div className="relative rounded-3xl border border-white/10 overflow-hidden bg-white/5 p-8 md:p-14">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#F40009]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative z-10">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#F40009] font-medium">
                  Since May 8, 1886
                </span>
                <h2 className="mt-3 text-3xl md:text-5xl font-medium tracking-tighter text-white leading-tight">
                  Over 140 Years of Sparkling Design History
                </h2>
                <p className="mt-4 text-sm md:text-base text-white/80 leading-relaxed">
                  From Jacob's Pharmacy in downtown Atlanta to the patented 1915 contour glass bottle, discover how a small soda fountain beverage blossomed into an enduring icon of global pop culture.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Button to="/history" variant="primary" icon={true}>
                    Explore Timeline
                  </Button>
                  <Button to="/about" variant="ghost">
                    Meet The Project
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Card className="text-center p-6">
                  <p className="text-3xl md:text-4xl font-semibold text-[#F40009]">1886</p>
                  <p className="text-xs uppercase tracking-wider text-white/60 mt-1">First Formula Served</p>
                </Card>
                <Card className="text-center p-6">
                  <p className="text-3xl md:text-4xl font-semibold text-white">1915</p>
                  <p className="text-xs uppercase tracking-wider text-white/60 mt-1">Contour Bottle Patented</p>
                </Card>
                <Card className="text-center p-6">
                  <p className="text-3xl md:text-4xl font-semibold text-white">200+</p>
                  <p className="text-xs uppercase tracking-wider text-white/60 mt-1">Countries Reached</p>
                </Card>
                <Card className="text-center p-6">
                  <p className="text-3xl md:text-4xl font-semibold text-[#F40009]">100%</p>
                  <p className="text-xs uppercase tracking-wider text-white/60 mt-1">Educational Purpose</p>
                </Card>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Home;
