const baseCls =
  'w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400';

export default function Input({ className = '', ...props }) {
  return <input className={`${baseCls} ${className}`.trim()} {...props} />;
}

export function Textarea({ className = '', ...props }) {
  return <textarea className={`${baseCls} resize-none ${className}`.trim()} {...props} />;
}

export function Select({ className = '', children, ...props }) {
  return (
    <select className={`${baseCls} ${className}`.trim()} {...props}>
      {children}
    </select>
  );
}
