export const TechWorkshopIcon = ({ isHovered }) => (
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
        ? "drop-shadow(0 12px 16px rgba(0,0,0,0.18))"
        : "drop-shadow(0 4px 6px rgba(0,0,0,0.08))",
    }}
  >
    {/* Red Brick Main Factory Building */}
    {/* Roof */}
    <path
      d="M25 45 L60 25 L95 45 L60 65 Z"
      fill="#881337"
      stroke="#0F172A"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    {/* Left Wall */}
    <path
      d="M25 45 L60 65 L60 85 L25 65 Z"
      fill="#9F1239"
      stroke="#0F172A"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    {/* Right Wall */}
    <path
      d="M60 65 L95 45 L95 65 L60 85 Z"
      fill="#BE123C"
      stroke="#0F172A"
      strokeWidth="2"
      strokeLinejoin="round"
    />

    {/* Entrance Canopy */}
    <path
      d="M50 70 L60 76 L70 70 L60 64 Z"
      fill="#E2E8F0"
      stroke="#0F172A"
      strokeWidth="1.5"
    />
    <path
      d="M50 70 L60 76 L60 85 L50 79 Z"
      fill="#94A3B8"
      stroke="#0F172A"
      strokeWidth="1.5"
    />
    <path
      d="M60 76 L70 70 L70 79 L60 85 Z"
      fill="#64748B"
      stroke="#0F172A"
      strokeWidth="1.5"
    />

    {/* OCHAKOVO White Banner Sign */}
    <polygon
      points="40,50 80,27 80,37 40,60"
      fill="#FFFFFF"
      stroke="#0F172A"
      strokeWidth="1.5"
    />
    <text
      x="44"
      y="52"
      transform="rotate(-30 40 50)"
      fill="#E30613"
      fontSize="7.5"
      fontWeight="900"
      fontFamily="monospace"
    >
      ОЧАКОВО
    </text>

    {/* Windows Grid */}
    <rect
      x="32"
      y="53"
      width="5"
      height="7"
      fill="#FEF08A"
      stroke="#0F172A"
      strokeWidth="1"
    />
    <rect
      x="40"
      y="58"
      width="5"
      height="7"
      fill="#FEF08A"
      stroke="#0F172A"
      strokeWidth="1"
    />
    <rect
      x="70"
      y="52"
      width="5"
      height="7"
      fill="#FEF08A"
      stroke="#0F172A"
      strokeWidth="1"
    />
    <rect
      x="78"
      y="47"
      width="5"
      height="7"
      fill="#FEF08A"
      stroke="#0F172A"
      strokeWidth="1"
    />

    {/* Roof Logo Signboard */}
    <path
      d="M55 22 L65 22 L65 14 L55 14 Z"
      fill="#E30613"
      stroke="#0F172A"
      strokeWidth="1.5"
    />
    <circle cx="60" cy="18" r="2" fill="#FFFFFF" />
  </svg>
);
