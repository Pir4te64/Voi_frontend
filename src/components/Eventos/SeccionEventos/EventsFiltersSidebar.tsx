// src/components/Eventos/EventsFiltersSidebar.tsx
import React, { useState } from 'react';
import { FiChevronDown, FiSearch } from 'react-icons/fi';

interface Props {
    /* estado y setters vienen del padre */
    search: string; setSearch: (v: string) => void;
    category: string; setCategory: (v: string) => void;
    order: string; setOrder: (v: string) => void;
    province: string; setProvince: (v: string) => void;
    city: string; setCity: (v: string) => void;
    categories: string[];
    orders: string[];
}

const EventsFiltersSidebar: React.FC<Props> = ({
    search, setSearch,
    category, setCategory,
    order, setOrder,
    province, setProvince,
    city, setCity,
    categories,
    orders,
}) => {
    return (
        <aside className="w-full md:w-1/3 lg:w-1/4 shrink-0">
            {/* Buscar */}
            <label className="relative block mb-6">
                <FiSearch className="absolute top-3 left-3 text-white/70" />
                <input
                    type="text"
                    placeholder="Buscar"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full bg-back border border-gray-700 rounded-xl
                     pl-10 pr-3 py-2 placeholder-white/70
                     focus:outline-none focus:border-secondary"
                />
            </label>

            <FilterBlock title="Categorías">
                <div className="flex flex-wrap gap-2">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setCategory(cat)}
                            className={`
                px-4 py-1 rounded-full text-sm transition
                ${category === cat
                                    ? 'bg-secondary text-primary'
                                    : 'bg-back hover:bg-white/30'}
              `}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </FilterBlock>

            <FilterBlock title="Orden">
                <div className="flex flex-col gap-2">
                    {orders.map(o => (
                        <button
                            key={o}
                            onClick={() => setOrder(o)}
                            className={`
                px-4 py-1 rounded-full text-sm text-left transition
                ${order === o
                                    ? 'bg-secondary text-primary'
                                    : 'bg-back hover:bg-white/30'}
              `}
                        >
                            {o}
                        </button>
                    ))}
                </div>
            </FilterBlock>

            <FilterBlock title="Ubicación">
                <select
                    value={province}
                    onChange={e => setProvince(e.target.value)}
                    className="w-full mb-3 bg-back border border-gray-700 rounded-xl
                     px-3 py-2 focus:outline-none focus:border-secondary appearance-none"
                >
                    <option value="">Provincia</option>
                    <option value="Misiones">Misiones</option>
                    <option value="Córdoba">Córdoba</option>
                    <option value="Mendoza">Mendoza</option>
                </select>

                <select
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    className="w-full bg-back border border-gray-700 rounded-xl
                     px-3 py-2 focus:outline-none focus:border-secondary appearance-none"
                >
                    <option value="">Ciudad</option>
                    <option value="Posadas">Posadas</option>
                    <option value="Puerto Iguazú">Puerto Iguazú</option>
                    <option value="Villa María">Villa María</option>
                </select>
            </FilterBlock>

            <button
                className="mt-6 w-full bg-secondary text-primary font-semibold
                   py-2 rounded-xl hover:opacity-90 transition"
            >
                Aplicar
            </button>
        </aside>
    );
};

/* ---------- Bloque colapsable reutilizable ---------- */
const FilterBlock: React.FC<{ title: string; children?: React.ReactNode }> = ({ title, children }) => {
    const [open, setOpen] = useState(true);
    return (
        <div className="mb-6">
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center justify-between w-full mb-3
                   text-sm uppercase tracking-wide"
            >
                {title}
                <FiChevronDown
                    className={`transition-transform ${open ? 'rotate-180' : ''}`}
                />
            </button>
            {open && children}
            <hr className="mt-3 border-white/20" />
        </div>
    );
};

export default EventsFiltersSidebar;
