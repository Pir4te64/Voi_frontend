
import logoGrande from "@/assets/LogoGrande.svg";

const Index = () => {
    return (
        <div className="flex items-center  bg-back justify-center h-full w-full">
            <img
                src={logoGrande}
                alt="Logo Grande VOI"
                loading="lazy"
                className="opacity-20 w-48 sm:w-64 md:w-80 lg:w-96"
            />
        </div>
    );
};

export default Index;
