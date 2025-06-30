import ticketGrande from "@/assets/ticketGrande.png";

const QuienesSomos = () => {
    return (
        <section
            aria-labelledby="qs-title"
            className="relative w-full overflow-hidden bg-primary"
        >
            {/* Glows */}
            <div
                className="absolute right-0 top-0 h-64 w-64 -translate-y-1/3 translate-x-1/3 transform rounded-full bg-gradient-to-tr from-secondary to-secondary opacity-80 blur-3xl filter sm:h-80 sm:w-80"
            />
            <div
                className="absolute bottom-0 left-0 z-0 h-64 w-64 translate-x-1/4 translate-y-1/4 transform rounded-full bg-gradient-to-br from-secondary to-secondary opacity-50 blur-3xl filter sm:h-80 sm:w-80"
            />

            {/* Main content: image & text each half width on desktop */}
            <div className="container mx-auto px-4 lg:px-0">
                <div className="flex w-full flex-col lg:flex-row">
                    {/* Image half */}
                    <div className="flex w-full items-center justify-center py-8 lg:w-1/2">
                        <img
                            src={ticketGrande}
                            alt="Ticket VOI rosa inclinada"
                            loading="lazy"
                            className="h-auto w-full max-w-[200px] rotate-12 sm:max-w-[256px] md:max-w-[320px] lg:max-w-[480px]"
                        />
                    </div>

                    {/* Text half */}
                    <div className="flex w-full flex-col items-center justify-center py-8 text-center lg:w-1/2 lg:items-start lg:text-left">
                        <h2 id="qs-title" className="mb-4 text-4xl font-bold text-white sm:text-6xl">
                            ¿QUIÉNES SOMOS?
                        </h2>
                        <p className="mb-4 text-justify text-base font-bold leading-relaxed text-white sm:text-lg">
                            VOI es una plataforma integral de ticketing, producción y experiencias para eventos que conecta a organizadores y públicos a través de soluciones tecnológicas y creativas.
                        </p>
                        <p className="text-justify text-base leading-relaxed text-white sm:text-lg">
                            Nacimos con una idea clara: facilitar el acceso a eventos inolvidables y potenciar a quienes los hacen posibles.
                        </p>
                    </div>
                </div>

                {/* Main description section */}
                <div className="my-12 flex justify-center">
                    <div className="z-50 max-w-5xl rounded-lg bg-back p-8">
                        <p className="mb-6 text-justify leading-relaxed text-gray-300">
                            Desde la venta de entradas hasta la entrega de materiales audiovisuales que reflejen la experiencia de cada evento, en VOI acompañamos a cada evento con herramientas pensadas para simplificar, profesionalizar y escalar tu producción.
                        </p>
                        <p className="text-justify leading-relaxed text-gray-300">
                            Creemos en la planificación, el diseño y la tecnología como motores de experiencias memorables. Ya sea un festival, una fiesta, un evento cultural o particular, en VOI trabajamos con compromiso, pasión y creatividad para que cada edición sea significativa.
                        </p>
                    </div>
                </div>

                {/* What does VOI mean section */}
                <div className="my-12 flex justify-center">
                    <div className="z-50 max-w-4xl rounded-lg bg-back p-8">
                        <h3 className="mb-6 text-center text-2xl font-bold text-white sm:text-3xl">
                            ¿QUÉ SIGNIFICA VOI?
                        </h3>
                        <p className="text-center text-justify text-lg leading-relaxed text-gray-300 lg:text-center">
                            "VOI" nace de una combinación de ideas: <span className="font-semibold text-secondary">voy a comprar</span>, <span className="font-semibold text-secondary">voy a ir</span>, <span className="font-semibold text-secondary">voy a disfrutar</span> y <span className="font-semibold text-secondary">voy a producir</span>.
                        </p>
                        <p className="mt-4 text-center text-justify leading-relaxed text-gray-300 lg:text-center">
                            Porque sabemos que cada evento empieza con una decisión... y nosotros estamos para que vayas a esa decisión: simple, segura y emocionante.
                        </p>
                    </div>
                </div>

                {/* What we do section */}
                <div className="my-12 flex justify-center">
                    <div className="z-50 max-w-4xl rounded-lg bg-back p-8">
                        <h3 className="mb-8 text-center text-2xl font-bold text-white sm:text-3xl">
                            ¿QUÉ HACEMOS?
                        </h3>
                        <p className="mb-8 text-center text-justify leading-relaxed text-gray-300 lg:text-center">
                            Ofrecemos un ecosistema de servicios conectados para que tu evento funcione de forma fluida:
                        </p>

                        <ul className="space-y-4 text-gray-300">
                            <li className="flex items-start">
                                <span className="mr-3 mt-1 text-secondary">•</span>
                                <div>
                                    <span className="font-semibold text-secondary">Venta de entradas online:</span> Plataforma ágil y validación QR
                                </div>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-3 mt-1 text-secondary">•</span>
                                <div>
                                    <span className="font-semibold text-secondary">Control de accesos:</span> Reportes en tiempo real
                                </div>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-3 mt-1 text-secondary">•</span>
                                <div>
                                    <span className="font-semibold text-secondary">Alquiler de estructuras:</span> Carpa beduina, escenarios, vallas y equipamiento técnico
                                </div>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-3 mt-1 text-secondary">•</span>
                                <div>
                                    <span className="font-semibold text-secondary">Producción de pulseras:</span> Personalizadas para acreditaciones, sectores y staff
                                </div>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-3 mt-1 text-secondary">•</span>
                                <div>
                                    <span className="font-semibold text-secondary">Servicios audiovisuales:</span> Fotografía, video y drones FPV profesionales
                                </div>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-3 mt-1 text-secondary">•</span>
                                <div>
                                    <span className="font-semibold text-secondary">Planificación estética:</span> Sectorización, puesta en escena y diseño de arte
                                </div>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-3 mt-1 text-secondary">•</span>
                                <div>
                                    <span className="font-semibold text-secondary">Asesoramiento estratégico:</span> En producción, comunicación y comercialización
                                </div>
                            </li>
                        </ul>

                        <div className="mt-8 rounded-lg border border-secondary/30 bg-secondary/10 p-6">
                            <p className="text-center text-justify leading-relaxed text-gray-300 lg:text-center">
                                <span className="font-semibold text-secondary">Más que una ticketera, VOI es una plataforma integral</span> para la gestión y producción de eventos. Diseñada para organizadores y productoras que buscan eficiencia, creatividad y profesionalismo en cada etapa del proceso.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default QuienesSomos;
