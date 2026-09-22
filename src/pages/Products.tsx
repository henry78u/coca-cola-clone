import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Star, Flame, Sparkles } from "lucide-react";
import PageHero from "../components/PageHero";
import Container from "../components/Container";
import Card from "../components/Card";
import Button from "../components/Button";
import { PRODUCTS, Product } from "../data/products";

type CategoryFilter = "All" | "Classic" | "Zero" | "Flavors";

export const Products: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory =
      activeCategory === "All" || product.category === activeCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full bg-[#000000] pb-24 md:pb-32">
      {/* Page Hero with Particles Background */}
      <PageHero
        eyebrow="OUR RANGE"
        title="Crafted for Every Moment"
        subtitle="Explore all 12 signature blends, from timeless caramel originals and crisp zero sugar varieties to bold fruit-infused sensations."
        backgroundType="particles"
        shinyTitle={true}
      />

      <Container className="mt-12 md:mt-16">
        {/* Filter Controls & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/10">
          {/* Pill Tabs */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-full bg-white/5 border border-white/10">
            {(["All", "Classic", "Zero", "Flavors"] as CategoryFilter[]).map(
              (category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                    activeCategory === category
                      ? "bg-[#F40009] text-white shadow-md shadow-[#F40009]/30"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {category === "All" ? "All Varieties" : category}
                </button>
              )
            )}
          </div>

          {/* Quick Search */}
          <div className="w-full md:w-72">
            <input
              type="text"
              placeholder="Search flavors, calories, ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#F40009] focus:ring-1 focus:ring-[#F40009]"
            />
          </div>
        </div>

        {/* Product Count & Notice */}
        <div className="flex items-center justify-between py-4 text-xs text-white/60">
          <span>
            Showing <strong className="text-white">{filteredProducts.length}</strong> of {PRODUCTS.length} creations
          </span>
          <span className="hidden sm:inline">100% Recyclable Packaging & Zero Artificial Colors</span>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
            <p className="text-xl font-medium text-white">No products found</p>
            <p className="text-sm text-white/60 mt-2">
              Try adjusting your category filter or search keywords.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory("All");
                setSearchQuery("");
              }}
              className="mt-6 px-6 py-2.5 rounded-full bg-[#F40009] text-white text-sm font-medium hover:bg-[#C10007] transition-all"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                id={`product-card-${product.id}`}
                className="flex flex-col justify-between group h-full"
              >
                <div>
                  {/* Image container */}
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
                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs bg-black/70 backdrop-blur-md text-white/90 border border-white/10 flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span>{product.rating}</span>
                    </span>
                  </div>

                  {/* Metadata */}
                  <div className="flex items-center justify-between text-xs text-white/60 mb-2">
                    <span className="uppercase tracking-wider font-semibold text-[#F40009]">
                      {product.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Flame className="w-3 h-3 text-white/50" />
                      {product.nutrition.calories} kcal
                    </span>
                  </div>

                  <h3 className="text-2xl font-medium text-white tracking-tight group-hover:text-[#F40009] transition-colors">
                    {product.name}
                  </h3>

                  <p className="mt-2 text-sm text-white/80 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  <div className="mt-4 flex items-center gap-3 text-xs text-white/50">
                    <span>Sugar: {product.nutrition.sugar}</span>
                    <span>•</span>
                    <span>Caffeine: {product.nutrition.caffeine}</span>
                  </div>
                </div>

                {/* Footer with Price and View button */}
                <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-xs uppercase text-white/50 block">MSRP</span>
                    <span className="text-xl font-medium text-white">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                  <Link
                    to={`/products/${product.id}`}
                    id={`view-btn-${product.id}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F40009] hover:bg-[#C10007] text-white text-sm font-medium transition-all shadow-md group-hover:shadow-lg shadow-[#F40009]/20"
                  >
                    <span>View</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};

export default Products;
