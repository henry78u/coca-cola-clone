import React from "react";
import ShinyText from "../components/ShinyText";
import Button from "../components/Button";
import GridBackground from "../components/backgrounds/GridBackground";
import Container from "../components/Container";

export const NotFound: React.FC = () => {
  return (
    <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-black py-24">
      {/* Grid Background */}
      <GridBackground />

      <Container className="relative z-10 text-center flex flex-col items-center max-w-2xl mx-auto">
        <div className="mb-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/70">
          <span className="w-2 h-2 rounded-full bg-[#F40009]" />
          <span>Error 404 • Missing Route</span>
        </div>

        {/* Big 404 in shiny gradient */}
        <h1 className="text-7xl md:text-9xl font-extrabold tracking-tighter leading-none mb-6">
          <ShinyText>404</ShinyText>
        </h1>

        <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-white mb-4">
          This Bottle Has Already Been Emptied
        </h2>

        <p className="text-sm md:text-base text-white/80 leading-relaxed mb-8 max-w-md">
          The page you are looking for might have been retired, moved to a different shelf, or does not exist in our educational catalog.
        </p>

        <Button to="/" variant="primary" size="lg" icon={true}>
          Back to Home
        </Button>
      </Container>
    </div>
  );
};

export default NotFound;
