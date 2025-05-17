import logoGrande from "@/assets/LogoGrande.svg"

const Logos = () => {
    return (
        <div className="relative flex w-full items-center justify-center overflow-hidden p-4 py-16 md:mt-0 md:w-1/2 md:p-8 md:py-0">
            {/* Glow bajo el logo grande:
                - Mobile: bottom-right (visible solo mitad para desktop/tablet)
                - Tablet+ (md): centered bajo la imagen y recortado por overflow */}
            <span
                className="pointer-events-none absolute -right-5 bottom-0 h-24 w-24 rounded-full bg-secondary opacity-80 blur-3xl filter md:-bottom-40 md:left-1/2 md:h-64 md:w-52 md:-translate-x-1/2 md:transform"
            />
            <img
                src={logoGrande}
                alt="Logo Grande"
                className="relative z-10 h-auto w-80 md:w-3/4"
            />
        </div>
    )
}

export default Logos
