export const BottlingShopIcon = ({ isHovered }) => (
  <svg
    width="120"
    height="100"
    viewBox="0 0 120 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      transition: "transform 0.3s ease",
      transform: isHovered ? "translateY(-6px) scale(1.05)" : "none",
      filter: isHovered
        ? "drop-shadow(0 12px 16px rgba(0,0,0,0.15))"
        : "drop-shadow(0 4px 6px rgba(0,0,0,0.08))",
    }}
  >
    {/* Sawtooth Industrial Factory Roof & Walls */}
    {/* Left Wall */}
    <path
      d="M20 52 L60 72 L60 90 L20 70 Z"
      fill="#991B1B"
      stroke="#0F172A"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    {/* Right Wall */}
    <path
      d="M60 72 L100 52 L100 70 L60 90 Z"
      fill="#B91C1C"
      stroke="#0F172A"
      strokeWidth="2"
      strokeLinejoin="round"
    />

    {/* Sawtooth Roof sections */}
    <path
      d="M20 52 L35 38 L35 48 L50 34 L50 44 L65 30 L80 42 L100 52 L60 72 Z"
      fill="#64748B"
      stroke="#0F172A"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M35 38 L50 44 L35 48 Z"
      fill="#CBD5E1"
      stroke="#0F172A"
      strokeWidth="1.5"
    />
    <path
      d="M50 34 L65 40 L50 44 Z"
      fill="#CBD5E1"
      stroke="#0F172A"
      strokeWidth="1.5"
    />

    {/* Smoke Stacks / Chimneys */}
    <path
      d="M72 26 L80 26 L80 38 L72 38 Z"
      fill="#475569"
      stroke="#0F172A"
      strokeWidth="1.5"
    />
    {/* Smoke Clouds */}
    <circle cx="76" cy="18" r="4" fill="#94A3B8" opacity="0.8" />
    <circle cx="82" cy="12" r="6" fill="#CBD5E1" opacity="0.7" />
    <circle cx="90" cy="8" r="7" fill="#E2E8F0" opacity="0.5" />

    {/* Windows & Doors */}
    <rect
      x="30"
      y="60"
      width="6"
      height="8"
      fill="#BAE6FD"
      stroke="#0F172A"
      strokeWidth="1"
    />
    <rect
      x="40"
      y="65"
      width="6"
      height="8"
      fill="#BAE6FD"
      stroke="#0F172A"
      strokeWidth="1"
    />
    <rect
      x="70"
      y="64"
      width="6"
      height="8"
      fill="#BAE6FD"
      stroke="#0F172A"
      strokeWidth="1"
    />
    <rect
      x="80"
      y="59"
      width="6"
      height="8"
      fill="#BAE6FD"
      stroke="#0F172A"
      strokeWidth="1"
    />
  </svg>
);
