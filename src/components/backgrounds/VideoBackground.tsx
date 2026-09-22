import React from "react";

interface VideoBackgroundProps {
  src?: string;
  className?: string;
}

export const VideoBackground: React.FC<VideoBackgroundProps> = ({
  src = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_105406_16f4600d-7a92-4292-b96e-b19156c7830a.mp4",
  className = "",
}) => {
  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden bg-black pointer-events-none ${className}`}>
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={src} type="video/mp4" />
      </video>
      {/* Dark overlay: from-black/70 via-black/40 to-black/80 as specified in DNA */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
      {/* Subtle edge vignette */}
      <div className="absolute inset-0 bg-radial from-transparent via-black/30 to-black/80 pointer-events-none" />
    </div>
  );
};

export default VideoBackground;
