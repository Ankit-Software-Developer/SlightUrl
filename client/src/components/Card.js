export default function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-2xl bg-white shadow-soft ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800 ${className}`}
    >
      {children}
    </div>
  );
}