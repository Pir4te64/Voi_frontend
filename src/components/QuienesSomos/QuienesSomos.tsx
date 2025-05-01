
import ticketGrande from "@/assets/ticketGrande.png";

const QuienesSomos = () => {
    return (
        <section
            aria-labelledby="qs-title"
            className="relative w-full bg-primary overflow-hidden"
        >
            {/* Glows */}
            <div
                className="
          absolute top-0 right-0
          w-64 sm:w-80 h-64 sm:h-80
          rounded-full
          filter blur-3xl opacity-80
          bg-gradient-to-tr from-secondary to-secondary
          transform translate-x-1/3 -translate-y-1/3
        "
            />
            <div
                className="
          absolute bottom-0 left-0
          w-64 sm:w-80 h-64 sm:h-80
          rounded-full
          filter blur-3xl opacity-50
          bg-gradient-to-br from-secondary to-secondary
          transform translate-x-1/4 translate-y-1/4 z-0
        "
            />

            {/* Main content: image & text each half width on desktop */}
            <div className="container mx-auto px-4 lg:px-0">
                <div className="flex flex-col lg:flex-row w-full">
                    {/* Image half */}
                    <div className="w-full lg:w-1/2 flex justify-center items-center py-8">
                        <img
                            src={ticketGrande}
                            alt="Ticket VOI rosa inclinada"
                            loading="lazy"
                            className="
                w-full
                max-w-[200px] sm:max-w-[256px] md:max-w-[320px] lg:max-w-[480px]
                h-auto
                rotate-12
              "
                        />
                    </div>

                    {/* Text half */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center items-center lg:items-start text-center lg:text-left py-8">
                        <h2 id="qs-title" className="text-4xl sm:text-6xl font-bold mb-4 text-white">
                            ¿QUIÉNES SOMOS?
                        </h2>
                        <p className="text-base font-bold sm:text-lg leading-relaxed text-white">
                            Somos una plataforma de ticketing diseñada para ofrecer soluciones
                            rápidas, seguras y eficientes para la gestión de eventos de música
                            electrónica, fiestas y eventos sociales.
                        </p>
                    </div>
                </div>

                {/* Secondary description box */}
                <div className="my-12 flex justify-center ">
                    <div className="max-w-5xl bg-back rounded-lg p-6 z-50">
                        <p className="text-gray-300 mb-4">
                            Nacimos con la misión de simplificar el acceso a las mejores
                            experiencias, conectando a organizadores y asistentes a través de
                            una herramienta intuitiva que facilita la compra de entradas y la
                            gestión integral del evento.
                        </p>
                        <p className="text-gray-300">
                            Nos diferenciamos no solo por la venta de entradas, sino también
                            por los servicios adicionales que ofrecemos a los organizadores.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default QuienesSomos;
