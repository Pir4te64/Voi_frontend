export const FloatingField: React.FC<{
    label: string;
    children: React.ReactNode;
}> = ({ label, children }) => (
    <div className="relative group">
        <label
            className="
      absolute left-3 top-1/2 transform -translate-y-1/2
      bg-back px-1 text-gray-400 transition-all
      group-focus-within:-top-2 group-focus-within:translate-y-0
      group-focus-within:text-xs group-focus-within:text-secondary
      pointer-events-none
    "
        >
            {label}
        </label>
        {children}
    </div>
);