import React, { useEffect, useState } from "react";

export default function DarkModeToggle(){
  const [dark, setDark] = useState(() => {
    const v = localStorage.getItem("dark");
    return v === "1" ? true : false;
  });

  useEffect(() => {
    document.body.classList.toggle("dark", dark);
    localStorage.setItem("dark", dark ? "1" : "0");
  }, [dark]);

  return (
    <button
      title={dark ? "Switch to light" : "Switch to dark"}
      className="icon-btn"
      onClick={() => setDark(d => !d)}
    >
      {dark ? (
        // sun icon
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4M12 7a5 5 0 100 10 5 5 0 000-10z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
      ) : (
        // moon icon
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
      )}
    </button>
  );
}
