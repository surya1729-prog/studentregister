import React, { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const push = useCallback((msg, type = "success", ttl = 3500) => {
    const id = Date.now() + Math.random();
    const t = { id, msg, type };

    setToasts((prev) => [t, ...prev]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((x) => x.id !== id));
    }, ttl);
  }, []);

  return (
    <ToastContext.Provider value={{ push }}>
      {children}

      {/* Toast Container */}
      <div className="toast-wrap">
        {toasts.map((t) => (
          <div key={t.id} className={`toast ${t.type} fade-in`}>
            <div style={{ fontSize: 18 }}>
              {t.type === "success" ? "✓" : "!"}
            </div>
            <div>{t.msg}</div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  return useContext(ToastContext).push;
};
