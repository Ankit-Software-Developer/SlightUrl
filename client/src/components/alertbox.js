"use client";

import { useEffect } from "react";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";

export default function AlertBox({
  type = "success",
  message,
  onClose,
  duration = 4000,
}) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  const styles = {
    success: "bg-emerald-600",
    error: "bg-red-600",
    warning: "bg-yellow-500",
  };

  const icons = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <XCircle className="w-5 h-5" />,
    warning: <AlertTriangle className="w-5 h-5" />,
  };

  return (
    <div className="fixed top-5 right-5 z-50 animate-slide-in">
      <div
        className={`flex items-center gap-3 rounded-xl px-5 py-4 shadow-lg text-white ${styles[type]}`}
      >
        {icons[type]}
        <span className="font-medium">{message}</span>
        <button onClick={onClose} className="ml-3 opacity-80 hover:opacity-100">
          ✕
        </button>
      </div>
    </div>
  );
}