import logoGrande from "@/assets/LogoGrande.svg"

const Logos = () => {
    return (
        <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8 relative overflow-hidden py-16 md:py-0  md:mt-0">
            {/* Glow bajo el logo grande:
                - Mobile: bottom-right (visible solo mitad para desktop/tablet)
                - Tablet+ (md): centered bajo la imagen y recortado por overflow */}
            <span
                className="absolute bottom-0 -right-5  md:left-1/2 md:-bottom-40 md:transform md:-translate-x-1/2
                    w-24 h-24 md:w-52 md:h-64
                    bg-secondary rounded-full
                    filter blur-3xl opacity-80
                    pointer-events-none"
            />
            <img
                src={logoGrande}
                alt="Logo Grande"
                className="w-52 md:w-3/4 h-auto relative z-10"
            />
        </div>
    )
}

export default Logos
