export default function Badge({ children, tone = "slate" }) {
  const map = {
    slate:
      "bg-slate-100 text-slate-700 ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700",
    emerald:
      "bg-emerald-500/10 text-emerald-700 ring-1 ring-emerald-500/20 dark:text-emerald-300",
    amber:
      "bg-amber-500/10 text-amber-800 ring-1 ring-amber-500/20 dark:text-amber-300",
    rose:
      "bg-rose-500/10 text-rose-800 ring-1 ring-rose-500/20 dark:text-rose-300",
    sky:
      "bg-sky-500/10 text-sky-800 ring-1 ring-sky-500/20 dark:text-sky-300",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${map[tone]}`}
    >
      {children}
    </span>
  );
}