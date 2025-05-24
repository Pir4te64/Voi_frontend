
import logoGrande from "@/assets/LogoGrande.svg";

const Index = () => {
    return (
        <div className="flex h-full items-center justify-center bg-back">
            <img
                src={logoGrande}
                alt="Logo Grande VOI"
                loading="lazy"
                className="w-48 opacity-20 sm:w-64 md:w-80 lg:w-96"
            />
        </div>
    );
};

export default Index;
