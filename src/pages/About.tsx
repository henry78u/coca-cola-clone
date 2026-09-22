import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, HeartHandshake, Compass, Award, Users, BookOpen } from "lucide-react";
import PageHero from "../components/PageHero";
import Container from "../components/Container";
import SectionHeading from "../components/SectionHeading";
import Card from "../components/Card";
import Button from "../components/Button";

export const About: React.FC = () => {
  return (
    <div className="w-full bg-[#000000] pb-24 md:pb-32">
      {/* Page Hero with Gradient Background */}
      <PageHero
        eyebrow="WHO WE ARE"
        title="Born to Refresh"
        subtitle="Exploring the timeless chemistry of design, brand identity, and the universal thirst for human optimism."
        backgroundType="gradient"
        shinyWord="Refresh"
      />

      <Container className="mt-16 md:mt-24 space-y-24">
        {/* Intro Paragraph Section */}
        <section className="max-w-4xl mx-auto text-center">
          <span className="text-xs uppercase tracking-widest text-[#F40009] font-medium block mb-3">
            The Educational Initiative
          </span>
          <h2 className="text-3xl md:text-5xl font-medium tracking-tighter text-white leading-tight">
            A Masterclass in Iconic Design Systems
          </h2>
          <p className="mt-6 text-base md:text-lg text-white/80 leading-relaxed">
            "Coca-Cola Clone" was conceptualized as a rigorous university product design and frontend engineering assignment. Our mandate: disassemble the world's most ubiquitous beverage brand and rebuild its design DNA from atomic first principles—investigating how typography, kinetic motion, and bold primary pigments evoke deep emotional resonance.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button to="/history" variant="primary" icon={true}>
              Read Our Heritage
            </Button>
            <Button to="/products" variant="ghost">
              Browse Varieties
            </Button>
          </div>
        </section>

        {/* Our Values — 3-Column Icon Grid (Boldness, Refreshment, Community) */}
        <section>
          <SectionHeading
            eyebrow="OUR CORE PILLARS"
            title="The Values That Guide Us"
            subtitle="Three simple tenets that have defined more than a century of product design and global engagement."
            shiny={true}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {/* Value 1: Boldness */}
            <Card className="flex flex-col items-start p-8">
              <div className="w-14 h-14 rounded-2xl bg-[#F40009]/10 border border-[#F40009]/20 flex items-center justify-center text-[#F40009] mb-6">
                <Sparkles className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-medium text-white tracking-tight">
                Boldness
              </h3>
              <p className="mt-3 text-sm md:text-base text-white/80 leading-relaxed">
                Refusing to blend into the background. Embracing deep, high-contrast reds, unmistakable silhouette contouring, and typography that commands the gaze in any environment.
              </p>
            </Card>

            {/* Value 2: Refreshment */}
            <Card className="flex flex-col items-start p-8">
              <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white mb-6">
                <Compass className="w-7 h-7 text-[#F40009]" />
              </div>
              <h3 className="text-2xl font-medium text-white tracking-tight">
                Refreshment
              </h3>
              <p className="mt-3 text-sm md:text-base text-white/80 leading-relaxed">
                Elevating the mundane through multisensory craft. From the precise tactile chill of fluted glass to the lively acoustic pop of carbonation in a crystal glass.
              </p>
            </Card>

            {/* Value 3: Community */}
            <Card className="flex flex-col items-start p-8">
              <div className="w-14 h-14 rounded-2xl bg-[#F40009]/10 border border-[#F40009]/20 flex items-center justify-center text-[#F40009] mb-6">
                <HeartHandshake className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-medium text-white tracking-tight">
                Community
              </h3>
              <p className="mt-3 text-sm md:text-base text-white/80 leading-relaxed">
                Uniting diverse souls around an affordable luxury. Over 1.9 billion times each day, people pause, smile, and connect over a universal symbol of togetherness.
              </p>
            </Card>
          </div>
        </section>

        {/* Founder & Academic Architect Profile Card */}
        <section>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-14 overflow-hidden relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-5">
                <div className="relative aspect-4/5 w-full rounded-2xl overflow-hidden border border-white/10 bg-zinc-900">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
                    alt="Dr. John S. Pemberton and student design lead"
                    className="w-full h-full object-cover filter grayscale contrast-125"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-xs uppercase tracking-wider text-[#F40009] font-medium">Historical Inspiration</p>
                    <p className="text-lg font-medium text-white">Dr. John Stith Pemberton</p>
                    <p className="text-xs text-white/60">Pharmacist & Inventor of the Original Formula (1886)</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/80">
                  <BookOpen className="w-3.5 h-3.5 text-[#F40009]" />
                  <span>Curator's Statement</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-medium tracking-tighter text-white">
                  "A Beverage So Distinctive It Can Be Identified in the Dark"
                </h3>
                <p className="text-sm md:text-base text-white/80 leading-relaxed">
                  When Frank Robinson penned the legendary Spencerian logo in 1886 and Earl R. Dean later drafted the contour bottle mold inspired by the grooves of a cocoa pod, neither could have foreseen that their geometric curves would endure through centuries of technological disruption.
                </p>
                <p className="text-sm md:text-base text-white/80 leading-relaxed">
                  As modern design students, studying this identity teaches us restraint: great products do not rely on gimmicks. They build emotional familiarity through consistent tokens, high typography standards, and unwavering commitment to customer delight.
                </p>

                <div className="pt-4 flex items-center gap-8 border-t border-white/10">
                  <div>
                    <p className="text-xl font-medium text-white">1886</p>
                    <p className="text-xs uppercase text-white/50">Founded in Atlanta</p>
                  </div>
                  <div className="w-px h-8 bg-white/10" />
                  <div>
                    <p className="text-xl font-medium text-white">1.9B+</p>
                    <p className="text-xs uppercase text-white/50">Servings Daily</p>
                  </div>
                  <div className="w-px h-8 bg-white/10" />
                  <div>
                    <p className="text-xl font-medium text-white">200+</p>
                    <p className="text-xs uppercase text-white/50">Territories</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default About;
