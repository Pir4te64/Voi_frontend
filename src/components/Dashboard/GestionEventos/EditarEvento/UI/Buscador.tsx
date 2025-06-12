import React from "react";
import { FaSearch } from "react-icons/fa";

interface BuscadorProps {
    searchTerm: string;
    onSearch: (value: string) => void;
    placeholder?: string;
}

const Buscador: React.FC<BuscadorProps> = ({
    searchTerm,
    onSearch,
    placeholder = "Buscar por evento",
}) => {
    return (
        <div className="mt-6">
            <div className="relative max-w-md">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <FaSearch className="h-4 w-4 text-gray-400" />
                </div>
                <input
                    type="text"
                    placeholder={placeholder}
                    value={searchTerm}
                    onChange={(e) => onSearch(e.target.value)}
                    className="w-full rounded-lg border border-gray-600 bg-black/40 py-3 pl-10 pr-4 text-white placeholder-gray-400 focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
                />
            </div>
        </div>
    );
};

export default Buscador; 