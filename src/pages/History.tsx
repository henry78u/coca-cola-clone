import React from "react";
import PageHero from "../components/PageHero";
import Container from "../components/Container";
import SectionHeading from "../components/SectionHeading";
import Card from "../components/Card";
import Button from "../components/Button";

interface Milestone {
  year: string;
  title: string;
  tag: string;
  description: string;
  image: string;
}

const milestones: Milestone[] = [
  {
    year: "1886",
    title: "The Atlanta Apothecary Origins",
    tag: "The Formula",
    description: "Dr. John Stith Pemberton crafts the original aromatic syrup in a brass kettle in Atlanta, Georgia. Carried to nearby Jacob's Pharmacy, it is mixed with carbonated water and sampled for five cents a glass.",
    image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&w=800&q=80",
  },
  {
    year: "1899",
    title: "The Historic Bottling Agreement",
    tag: "Mass Scalability",
    description: "Two Chattanooga attorneys, Benjamin Thomas and Joseph Whitehead, secure exclusive rights to bottle and distribute the drink across nearly the entire United States, transforming a soda fountain treat into a household essential.",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80",
  },
  {
    year: "1915",
    title: "The Contour Bottle Patent",
    tag: "Design Masterpiece",
    description: "The Root Glass Company in Terre Haute, Indiana, patents the ribbed, curvaceous contour silhouette. Its distinctive ergonomic fluting ensures it can be recognized by touch alone in complete darkness.",
    image: "https://images.unsplash.com/photo-1581636625402-29b2a704ef13?auto=format&fit=crop&w=800&q=80",
  },
  {
    year: "1971",
    title: "The Hilltop Anthem for Unity",
    tag: "Global Harmony",
    description: "Filmed on a picturesque Italian hillside, the iconic 'I'd Like to Buy the World a Coke' commercial airs, capturing the global zeitgeist of peace, optimism, and cross-cultural friendship.",
    image: "https://images.unsplash.com/photo-1596803244618-8dbee441d70b?auto=format&fit=crop&w=800&q=80",
  },
  {
    year: "2026",
    title: "The Sustainable Zero Revolution",
    tag: "Next Century",
    description: "Through 100% recycled bottle-to-bottle material stewardship and cutting-edge zero-sugar molecular sensory balance, the brand marches forward towards pure circularity and timeless enjoyment.",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80",
  },
];

export const History: React.FC = () => {
  return (
    <div className="w-full bg-[#000000] pb-24 md:pb-32">
      {/* Page Hero with Grid Background */}
      <PageHero
        eyebrow="OUR JOURNEY"
        title="A Legacy Since 1886"
        subtitle="Chronicles of an indelible design revolution spanning three centuries of sparkling American pop culture."
        backgroundType="grid"
        shinyWord="1886"
      />

      <Container className="mt-16 md:mt-24">
        <SectionHeading
          eyebrow="CHRONOLOGICAL MILESTONES"
          title="Five Moments That Made History"
          subtitle="Explore the pivotal intersections of culinary invention, patent law, industrial design, and cultural advertising."
          shiny={true}
        />

        {/* Vertical Timeline Container */}
        <div className="relative mt-20 max-w-5xl mx-auto">
          {/* Central Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-4 bottom-4 -translate-x-1/2 w-0.5 bg-gradient-to-b from-[#F40009] via-white/20 to-[#F40009]" />

          <div className="space-y-16 md:space-y-24">
            {milestones.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={item.year}
                  className={`relative flex flex-col md:flex-row items-center gap-8 ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline Badge/Dot */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-20 w-10 h-10 rounded-full bg-black border-2 border-[#F40009] flex items-center justify-center shadow-lg shadow-[#F40009]/40">
                    <div className="w-3.5 h-3.5 rounded-full bg-white animate-pulse" />
                  </div>

                  {/* Content Card (Left or Right on desktop) */}
                  <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-10">
                    <Card className="p-6 md:p-8 hover:border-[#F40009]/50">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-3xl md:text-4xl font-semibold tracking-tighter text-[#F40009]">
                          {item.year}
                        </span>
                        <span className="text-xs uppercase tracking-wider px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70">
                          {item.tag}
                        </span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-medium text-white tracking-tight">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-sm md:text-base text-white/80 leading-relaxed">
                        {item.description}
                      </p>
                    </Card>
                  </div>

                  {/* Image Card on opposing side */}
                  <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-10">
                    <div className="aspect-16/10 rounded-2xl overflow-hidden border border-white/10 bg-white/5">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover filter contrast-110 hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-24 text-center">
          <Card className="max-w-2xl mx-auto p-10 text-center">
            <h3 className="text-2xl font-medium text-white">Experience The Living Legacy</h3>
            <p className="mt-3 text-sm text-white/80">
              Taste the formula that sparked a worldwide beverage empire, preserved with authentic craft in every bottle.
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <Button to="/products" variant="primary" icon={true}>
                Shop Heritage Glass
              </Button>
            </div>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default History;
