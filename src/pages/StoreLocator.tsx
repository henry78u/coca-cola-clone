import React, { useState } from "react";
import { Search, MapPin, Phone, Clock, Navigation, ExternalLink, Sparkles } from "lucide-react";
import PageHero from "../components/PageHero";
import Container from "../components/Container";
import Card from "../components/Card";
import Button from "../components/Button";
import { STORES, StoreLocation } from "../data/stores";

export const StoreLocator: React.FC = () => {
  const [search, setSearch] = useState("");
  const [selectedStore, setSelectedStore] = useState<StoreLocation>(STORES[0]);

  const filteredStores = STORES.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.city.toLowerCase().includes(search.toLowerCase()) ||
      s.address.toLowerCase().includes(search.toLowerCase())
  );

  // Approximate SVG projection for US locations
  // Longitude: -125 (west) to -65 (east) -> SVG X: 50 to 750
  // Latitude: 50 (north) to 24 (south) -> SVG Y: 50 to 450
  const getMapCoordinates = (lat: number, lng: number) => {
    const x = ((lng - -125) / (-65 - -125)) * 700 + 50;
    const y = ((50 - lat) / (50 - 24)) * 400 + 40;
    return { x, y };
  };

  return (
    <div className="w-full bg-[#000000] pb-24 md:pb-32">
      {/* Page Hero with Gradient Background */}
      <PageHero
        eyebrow="FIND US"
        title="Stores Near You"
        subtitle="Locate flagship immersive tasting lounges, historical merchandise centers, and authorized retailers worldwide."
        backgroundType="gradient"
        shinyWord="Stores"
      />

      <Container className="mt-12 md:mt-16">
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              id="store-search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by city, address, or store name (e.g. Atlanta, Times Square)..."
              className="w-full pl-14 pr-6 py-4 rounded-full bg-white/5 border border-white/10 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#F40009] focus:ring-2 focus:ring-[#F40009]/30 transition-all"
            />
          </div>
        </div>

        {/* Two-Column Layout: Sidebar with store list + Map on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Store list */}
          <div className="lg:col-span-5 space-y-4 max-h-[640px] overflow-y-auto pr-2 custom-scrollbar">
            <div className="flex items-center justify-between pb-2 text-xs text-white/60">
              <span>{filteredStores.length} Flagship Destinations Available</span>
              <span>Click to Focus Map</span>
            </div>

            {filteredStores.map((store) => {
              const isSelected = selectedStore.id === store.id;

              return (
                <div
                  key={store.id}
                  id={`store-item-${store.id}`}
                  onClick={() => setSelectedStore(store)}
                  className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? "bg-white/10 border-[#F40009] shadow-lg shadow-[#F40009]/20"
                      : "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/8"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-[#F40009]">
                        {store.type}
                      </span>
                      <h3 className="text-xl font-medium text-white tracking-tight mt-1">
                        {store.name}
                      </h3>
                    </div>
                    {isSelected && (
                      <span className="w-2.5 h-2.5 rounded-full bg-[#F40009] animate-ping" />
                    )}
                  </div>

                  <p className="mt-3 text-sm text-white/80 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#F40009] shrink-0" />
                    <span>{store.address}, {store.city}</span>
                  </p>

                  <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs text-white/60">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{store.hours}</span>
                    </span>
                    <a
                      href={`tel:${store.phone.replace(/[^0-9]/g, "")}`}
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1.5 text-white/80 hover:text-[#F40009] transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#F40009]" />
                      <span>{store.phone}</span>
                    </a>
                  </div>
                </div>
              );
            })}

            {filteredStores.length === 0 && (
              <div className="p-8 text-center bg-white/5 rounded-2xl border border-white/10">
                <p className="text-white font-medium">No stores found matching your search</p>
                <p className="text-xs text-white/50 mt-1">Try searching "Atlanta" or "New York".</p>
              </div>
            )}
          </div>

          {/* Right Column: High-tech Vector Map with interactive pins */}
          <div className="lg:col-span-7">
            <Card className="p-0 overflow-hidden relative border border-white/10 bg-[#080808]">
              {/* Map Canvas Header */}
              <div className="p-4 md:p-6 bg-black/60 border-b border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#F40009] font-medium">
                    Interactive Grid
                  </span>
                  <p className="text-base font-medium text-white">
                    United States Flagship Network
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/60">
                  <span className="w-2 h-2 rounded-full bg-[#F40009]" />
                  <span>5 Major Hubs</span>
                </div>
              </div>

              {/* Map Visualization Area */}
              <div className="relative w-full h-[480px] bg-[#050505] overflow-hidden flex items-center justify-center">
                {/* SVG Map Canvas */}
                <svg
                  viewBox="0 0 800 500"
                  className="w-full h-full object-cover select-none"
                >
                  {/* Subtle Grid Lines */}
                  <defs>
                    <pattern id="map-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="800" height="500" fill="url(#map-grid)" />

                  {/* Stylized US Continental Landmass Contour */}
                  <path
                    d="M 120 100 Q 200 80 320 90 T 520 80 T 710 110 Q 740 180 720 250 Q 700 320 620 380 Q 560 410 480 390 Q 380 430 260 400 Q 150 380 110 320 Q 90 220 120 100 Z"
                    fill="rgba(255,255,255,0.02)"
                    stroke="rgba(255,255,255,0.12)"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />

                  {/* Store connection web lines */}
                  {STORES.map((s, idx) => {
                    const c1 = getMapCoordinates(s.lat, s.lng);
                    const nextStore = STORES[(idx + 1) % STORES.length];
                    const c2 = getMapCoordinates(nextStore.lat, nextStore.lng);
                    return (
                      <line
                        key={`line-${s.id}`}
                        x1={c1.x}
                        y1={c1.y}
                        x2={c2.x}
                        y2={c2.y}
                        stroke="rgba(244, 0, 9, 0.15)"
                        strokeWidth="1"
                        strokeDasharray="3 3"
                      />
                    );
                  })}

                  {/* Interactive Red Store Pins */}
                  {STORES.map((store) => {
                    const { x, y } = getMapCoordinates(store.lat, store.lng);
                    const isSelected = selectedStore.id === store.id;

                    return (
                      <g
                        key={`pin-${store.id}`}
                        onClick={() => setSelectedStore(store)}
                        className="cursor-pointer transition-all duration-300"
                      >
                        {/* Glow halo */}
                        {isSelected && (
                          <circle
                            cx={x}
                            cy={y}
                            r="22"
                            fill="rgba(244, 0, 9, 0.25)"
                            className="animate-pulse"
                          />
                        )}

                        {/* Outer Pin Ring */}
                        <circle
                          cx={x}
                          cy={y}
                          r={isSelected ? 10 : 7}
                          fill="#F40009"
                          stroke="#FFFFFF"
                          strokeWidth="2"
                        />

                        {/* Center core */}
                        <circle
                          cx={x}
                          cy={y}
                          r={isSelected ? 4 : 2.5}
                          fill="#FFFFFF"
                        />

                        {/* Text Label on Map */}
                        <text
                          x={x}
                          y={y - 14}
                          textAnchor="middle"
                          fill={isSelected ? "#FFFFFF" : "rgba(255,255,255,0.6)"}
                          fontSize={isSelected ? "12" : "10"}
                          fontWeight={isSelected ? "600" : "400"}
                          fontFamily="Inter, sans-serif"
                        >
                          {store.city.split(",")[0]}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                {/* Focused Store Overlay Box */}
                <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-xl border border-white/15 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-[#F40009] tracking-wider">
                      Selected Location
                    </span>
                    <h4 className="text-base font-medium text-white mt-0.5">
                      {selectedStore.name}
                    </h4>
                    <p className="text-xs text-white/70">
                      {selectedStore.address}, {selectedStore.city}
                    </p>
                  </div>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      `${selectedStore.name} ${selectedStore.address} ${selectedStore.city}`
                    )}`}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#F40009] hover:bg-[#C10007] text-white text-xs font-medium transition-all shrink-0"
                  >
                    <span>Get Directions</span>
                    <Navigation className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default StoreLocator;
