import React from "react";
import { Link } from "react-router-dom";

interface SmallLogoProps {
    /** Path to link to when logo is clicked */
    to?: string;
    /** Logo image source */
    src: string;
    /** Alt text for the image */
    alt?: string;
    /** Optional class names for wrapper div */
    wrapperClassName?: string;
    /** Optional sizing classes for the Link container */
    sizeClassName?: string;
}

/**
 * Reusable small logo component with glowing background.
 *
 * @param to - Route path when clicking the logo. Defaults to '/'.
 * @param src - Image source for the logo.
 * @param alt - Alt text for the logo image.
 * @param wrapperClassName - Extra classes for positioning wrapper.
 * @param sizeClassName - Width/height classes for the logo container.
 */
const SmallLogo: React.FC<SmallLogoProps> = ({
    to = "/",
    src,
    alt = "Logo Pequeño",
    wrapperClassName = "", sizeClassName ="w-8 h-8 md:w-16 md:h-16",
}) => {
    return (
        <div className={`absolute top-4 right-4 ${wrapperClassName}`.trim()}>
            <Link to={to} className={`relative ${sizeClassName}`.trim()}>
                {/* Glow detrás: visible en todos los breakpoints */}
                <span
                    className={
                        "absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 " +
                        "w-32 h-32 md:w-52 md:h-52 bg-secondary rounded-full " +
                        "filter blur-3xl md:blur-3xl opacity-80 pointer-events-none"
                    }
                />
                <img
                    src={src}
                    alt={alt}
                    className="relative z-10 w-full cursor-pointer object-cover"
                />
            </Link>
        </div>
    );
};

export default SmallLogo;
