const variants = {
  primary: 'bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white',
  secondary: 'border border-gray-300 text-gray-600 hover:bg-gray-50',
};

export default function Button({ variant = 'primary', className = '', children, ...props }) {
  return (
    <button
      className={`${variants[variant]} rounded-lg px-4 py-2 text-sm font-medium transition ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}
