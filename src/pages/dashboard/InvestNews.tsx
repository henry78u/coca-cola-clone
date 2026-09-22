import React, { useState } from "react";
import { Newspaper, Calendar, ExternalLink, Filter, Sparkles } from "lucide-react";
import Card from "../../components/Card";
import { news, InvestmentNewsArticle } from "../../data/investment";

export const InvestNews: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<
    "All" | "KO" | "Beverages" | "Earnings" | "Dividends"
  >("All");

  const filteredNews = news.filter(
    (item) => selectedCategory === "All" || item.category === selectedCategory
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#F40009]">
            Financial Intelligence
          </span>
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-white mt-1">
            Investment News & SEC Filings
          </h2>
          <p className="text-xs md:text-sm text-white/60 mt-0.5">
            Quarterly earnings calls, dividend announcements, and macroeconomic reports across consumer staples.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-full bg-white/5 border border-white/10 overflow-x-auto max-w-full">
          {(["All", "KO", "Beverages", "Earnings", "Dividends"] as const).map(
            (category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === category
                    ? "bg-[#F40009] text-white shadow-sm"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {category}
              </button>
            )
          )}
        </div>
      </div>

      {/* News Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredNews.map((article) => (
          <Card
            key={article.id}
            className="p-6 flex flex-col justify-between hover:border-white/20 transition-all group"
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[#F40009] font-medium text-[11px] uppercase tracking-wider">
                  {article.category}
                </span>
                <span className="text-white/40 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {article.date}
                </span>
              </div>

              <h3 className="text-lg font-medium text-white tracking-tight group-hover:text-[#F40009] transition-colors leading-snug">
                {article.title}
              </h3>

              <p className="mt-3 text-sm text-white/70 line-clamp-3 leading-relaxed">
                {article.excerpt}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="font-semibold text-white/50">{article.source}</span>
              <a
                href={article.url}
                onClick={(e) => {
                  e.preventDefault();
                  alert(`Educational Preview: Opened full analyst dispatch from ${article.source}`);
                }}
                className="inline-flex items-center gap-1 text-[#F40009] font-medium hover:underline group-hover:translate-x-0.5 transition-transform"
              >
                <span>Read analysis</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default InvestNews;
