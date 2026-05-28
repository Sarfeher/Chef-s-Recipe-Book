// Inline SVG logo. Uses currentColor so it inherits whatever color the parent
// sets — perfect for swapping between light and dark themes.
const Logo = ({ className = "brand-mark" }) => (
    <svg
        className={className}
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        {/* Chef hat: three rounded puffs */}
        <path d="M8.5 14C6 14 4.5 12.2 4.5 10.2c0-2 1.5-3.8 4-3.8 0.4-1.8 2-3.2 4-3.2 1.5 0 2.8 0.8 3.5 2 0.7-1.2 2-2 3.5-2 2 0 3.6 1.4 4 3.2 2.5 0 4 1.8 4 3.8 0 2-1.5 3.8-4 3.8z" fill="currentColor" fillOpacity="0.12" />
        {/* Band under the hat */}
        <path d="M9 14h14v3.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 9 17.5z" fill="currentColor" fillOpacity="0.25" />
        {/* Vertical stitches */}
        <path d="M13 14v5M19 14v5M16 14v5" strokeWidth="1.2" />
        {/* Steam wisps */}
        <path d="M12 22c1 1 -1 2 0 3.5" strokeWidth="1.2" />
        <path d="M16 22c1 1 -1 2 0 3.5" strokeWidth="1.2" />
        <path d="M20 22c1 1 -1 2 0 3.5" strokeWidth="1.2" />
    </svg>
);

export default Logo;
