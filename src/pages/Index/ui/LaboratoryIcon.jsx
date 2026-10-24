// SVG Isometric Pixel-art Pixelated Icons
export const LaboratoryIcon = ({ isHovered }) => (
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
    {/* Main Building Base */}
    <path
      d="M20 50 L60 30 L100 50 L60 70 Z"
      fill="#E2E8F0"
      stroke="#1E293B"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M20 50 L60 70 L60 85 L20 65 Z"
      fill="#CBD5E1"
      stroke="#1E293B"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M60 70 L100 50 L100 65 L60 85 Z"
      fill="#94A3B8"
      stroke="#1E293B"
      strokeWidth="2"
      strokeLinejoin="round"
    />

    {/* Top Roof Structure */}
    <path
      d="M30 45 L55 32 L80 45 L55 58 Z"
      fill="#FFFFFF"
      stroke="#1E293B"
      strokeWidth="2"
      strokeLinejoin="round"
    />

    {/* Windows grid lines */}
    <line
      x1="30"
      y1="56"
      x2="50"
      y2="66"
      stroke="#475569"
      strokeWidth="1.5"
      strokeDasharray="3 3"
    />
    <line
      x1="30"
      y1="60"
      x2="50"
      y2="70"
      stroke="#475569"
      strokeWidth="1.5"
      strokeDasharray="3 3"
    />

    {/* Industrial Tanks (Right) */}
    {/* Tank 1 */}
    <path
      d="M75 35 C75 30, 87 30, 87 35 L87 50 C87 55, 75 55, 75 50 Z"
      fill="#E2E8F0"
      stroke="#1E293B"
      strokeWidth="2"
    />
    <ellipse
      cx="81"
      cy="35"
      rx="6"
      ry="2.5"
      fill="#94A3B8"
      stroke="#1E293B"
      strokeWidth="1.5"
    />
    {/* Tank 2 */}
    <path
      d="M88 28 C88 23, 98 23, 98 28 L98 42 C98 47, 88 47, 88 42 Z"
      fill="#F1F5F9"
      stroke="#1E293B"
      strokeWidth="2"
    />
    <ellipse
      cx="93"
      cy="28"
      rx="5"
      ry="2"
      fill="#CBD5E1"
      stroke="#1E293B"
      strokeWidth="1.5"
    />
    {/* Tank 3 */}
    <path
      d="M96 22 C96 18, 104 18, 104 22 L104 34 C104 38, 96 38, 96 34 Z"
      fill="#CBD5E1"
      stroke="#1E293B"
      strokeWidth="1.5"
    />

    {/* Lab Pipes */}
    <path
      d="M55 35 L55 25 L75 25"
      fill="none"
      stroke="#64748B"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);
