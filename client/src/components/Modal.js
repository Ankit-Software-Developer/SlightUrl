import Card from "./Card";
import Button from "./Button";

export default function Modal({ open, title, children, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <Card className="relative w-full max-w-xl p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold">{title}</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">
              UI demo — backend will generate real short codes.
            </p>
          </div>
          <Button variant="ghost" onClick={onClose} aria-label="Close">
            ✕
          </Button>
        </div>
        <div className="mt-4">{children}</div>
      </Card>
    </div>
  );
}