import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star, Plus, Minus, Check, Truck, ShieldCheck, ChevronDown, Sparkles } from "lucide-react";
import PageHero from "../components/PageHero";
import Container from "../components/Container";
import Button from "../components/Button";
import Card from "../components/Card";
import { PRODUCTS } from "../data/products";

const sizes = ["12 fl oz Can", "20 fl oz Bottle", "6-Pack (12 oz)", "Heritage Glass (12 oz)"];

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];

  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<string | null>("nutrition");

  const toggleAccordion = (key: string) => {
    setActiveAccordion(activeAccordion === key ? null : key);
  };

  const handleAddToCart = () => {
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 3000);
  };

  return (
    <div className="w-full bg-[#000000] pb-24 md:pb-32">
      {/* Compact PageHero with Gradient Background */}
      <PageHero
        eyebrow={`THE COLLECTION • ${product.category.toUpperCase()}`}
        title={product.name}
        subtitle="Crafted with pure effervescence, balanced aromas, and timeless refreshment."
        backgroundType="gradient"
        height="compact"
        shinyWord={product.name.split(" ")[0]}
      />

      <Container className="mt-8 md:mt-12">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            to="/products"
            id="back-to-products"
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-[#F40009]" />
            <span>Back to All Products</span>
          </Link>
        </div>

        {/* Two-Column Layout: Left Image, Right Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Product Showcase */}
          <div className="lg:col-span-6">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white/5 border border-white/10 p-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover rounded-xl shadow-2xl"
              />
              {product.badge && (
                <span className="absolute top-6 left-6 px-4 py-1.5 rounded-full text-xs font-medium bg-[#F40009] text-white shadow-lg">
                  {product.badge}
                </span>
              )}
              <div className="absolute bottom-6 right-6 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-xs text-white flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span className="font-semibold">{product.rating}</span>
                <span className="text-white/50">(450+ student ratings)</span>
              </div>
            </div>

            {/* Quick trust metrics */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                <p className="text-xs uppercase text-white/50">Calories</p>
                <p className="text-lg font-medium text-white mt-0.5">{product.nutrition.calories}</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                <p className="text-xs uppercase text-white/50">Sugar</p>
                <p className="text-lg font-medium text-white mt-0.5">{product.nutrition.sugar}</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                <p className="text-xs uppercase text-white/50">Caffeine</p>
                <p className="text-lg font-medium text-white mt-0.5">{product.nutrition.caffeine}</p>
              </div>
            </div>
          </div>

          {/* Right Column: Purchasing & Specifications */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#F40009]">
                  {product.category} Series
                </span>
                <span className="text-white/40">•</span>
                <span className="text-xs text-white/60">SKU: CC-{product.id.slice(0, 6).toUpperCase()}</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-medium tracking-tighter text-white">
                {product.name}
              </h2>
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-3xl font-medium text-white">
                  ${(product.price * quantity).toFixed(2)}
                </span>
                <span className="text-sm text-white/60">
                  (${product.price.toFixed(2)} each)
                </span>
              </div>
            </div>

            <p className="text-sm md:text-base text-white/80 leading-relaxed border-t border-white/10 pt-4">
              {product.description}
            </p>

            {/* Size Selector Pills */}
            <div className="space-y-3">
              <label className="block text-xs uppercase tracking-wider text-white/70 font-medium">
                Select Format & Size:
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {sizes.map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setSelectedSize(sz)}
                    className={`py-3 px-4 rounded-xl text-xs md:text-sm font-medium transition-all text-center border cursor-pointer ${
                      selectedSize === sz
                        ? "bg-[#F40009] border-[#F40009] text-white shadow-md shadow-[#F40009]/20"
                        : "bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Stepper & Add to Cart */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4">
                {/* Stepper */}
                <div className="flex items-center bg-white/5 border border-white/10 rounded-full p-1">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center text-base font-medium text-white">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Primary Add to Cart Button */}
                <div className="flex-1">
                  <Button
                    id="add-to-cart-btn"
                    variant="primary"
                    size="lg"
                    onClick={handleAddToCart}
                    className="w-full justify-center"
                  >
                    {addedNotice ? "Added to Refreshment Cart!" : `Add to Cart • $${(product.price * quantity).toFixed(2)}`}
                  </Button>
                </div>
              </div>

              {addedNotice && (
                <div className="p-3 bg-[#F40009]/15 border border-[#F40009]/30 rounded-xl text-center text-xs text-white flex items-center justify-center gap-2">
                  <Check className="w-4 h-4 text-[#F40009]" />
                  <span>Class prototype cart updated with {quantity}x {product.name} ({selectedSize})!</span>
                </div>
              )}
            </div>

            {/* Accordion: Nutrition, Ingredients, Shipping */}
            <div className="space-y-3 pt-6 border-t border-white/10">
              {/* Accordion 1: Nutrition */}
              <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleAccordion("nutrition")}
                  className="w-full px-6 py-4 flex items-center justify-between text-left text-sm font-medium text-white hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <span>Nutritional Profile & Energy</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      activeAccordion === "nutrition" ? "rotate-180 text-[#F40009]" : "text-white/60"
                    }`}
                  />
                </button>
                {activeAccordion === "nutrition" && (
                  <div className="px-6 pb-5 pt-1 text-xs text-white/80 border-t border-white/5 space-y-2 leading-relaxed">
                    <p>Serving Size: {product.servingSize || "1 can (355ml)"}</p>
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
                      <div>Total Fat: <strong>0g (0% DV)</strong></div>
                      <div>Sodium: <strong>45mg (2% DV)</strong></div>
                      <div>Total Carbohydrates: <strong>{product.nutrition.sugar}</strong></div>
                      <div>Total Sugars: <strong>{product.nutrition.sugar}</strong></div>
                      <div>Protein: <strong>0g</strong></div>
                      <div>Caffeine: <strong>{product.nutrition.caffeine}</strong></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Accordion 2: Ingredients */}
              <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleAccordion("ingredients")}
                  className="w-full px-6 py-4 flex items-center justify-between text-left text-sm font-medium text-white hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <span>Ingredients & Formula</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      activeAccordion === "ingredients" ? "rotate-180 text-[#F40009]" : "text-white/60"
                    }`}
                  />
                </button>
                {activeAccordion === "ingredients" && (
                  <div className="px-6 pb-5 pt-1 text-xs text-white/80 border-t border-white/5 leading-relaxed">
                    <p className="font-semibold text-white mb-1.5">Official Formula Blend:</p>
                    <p>
                      {product.ingredients
                        ? product.ingredients.join(", ")
                        : "Carbonated Water, High Fructose Corn Syrup, Caramel Color, Phosphoric Acid, Natural Flavors, Caffeine."}
                    </p>
                    <p className="mt-3 text-white/50 text-[11px]">
                      No artificial preservatives added. Gluten-free, kosher certified, and GMO-free.
                    </p>
                  </div>
                )}
              </div>

              {/* Accordion 3: Shipping */}
              <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleAccordion("shipping")}
                  className="w-full px-6 py-4 flex items-center justify-between text-left text-sm font-medium text-white hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <span>Eco-Packaging & Shipping</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      activeAccordion === "shipping" ? "rotate-180 text-[#F40009]" : "text-white/60"
                    }`}
                  />
                </button>
                {activeAccordion === "shipping" && (
                  <div className="px-6 pb-5 pt-1 text-xs text-white/80 border-t border-white/5 space-y-2 leading-relaxed">
                    <p className="flex items-center gap-2">
                      <Truck className="w-3.5 h-3.5 text-[#F40009]" />
                      <span>Complimentary cold-insulated delivery on orders over $25.</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#F40009]" />
                      <span>100% recyclable corrugated protective shipping casing.</span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProductDetail;
