// src/components/Sidebar/SidebarUsuarioRegular.jsx
import { NavLink } from 'react-router-dom';
import { navItems } from '@/components/Dashboard/Sidebar/NavItems';

/**
 * Navegación para el sidebar de un usuario regular.
 * @param {{ onItemClick: () => void }} props
 */
const SidebarUsuarioRegular = ({ onItemClick }: { onItemClick: () => void }) => (
    <nav className="flex-1 space-y-2 overflow-y-auto">
        {navItems.map(({ to, label, Icon, children }) => (
            <div key={to}>
                <NavLink
                    to={to}
                    className={({ isActive }) =>
                        `flex items-center w-full p-2 rounded transition-colors ${isActive
                            ? 'bg-secondary text-white font-semibold'
                            : 'text-white hover:text-secondary'
                        }`
                    }
                    onClick={onItemClick}
                >
                    <Icon className="mr-3 h-4 w-4" />
                    {label}
                </NavLink>

                {children && (
                    <div className="ml-6 mt-1 space-y-1">
                        {children.map(({ to: subTo, label: subLabel, Icon: SubIcon }) => (
                            <NavLink
                                key={subTo}
                                to={subTo}
                                className={({ isActive }) =>
                                    `flex items-center w-full p-1 rounded text-sm transition-colors ${isActive
                                        ? 'text-secondary font-semibold'
                                        : 'text-white hover:text-secondary'
                                    }`
                                }
                                onClick={onItemClick}
                            >
                                <SubIcon className="mr-2 h-3 w-3" />
                                {subLabel}
                            </NavLink>
                        ))}
                    </div>
                )}
            </div>
        ))}
    </nav>
);

export { SidebarUsuarioRegular };
