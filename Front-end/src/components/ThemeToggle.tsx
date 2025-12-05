import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  // 1. Lê do localStorage ou começa como 'light'
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // 2. Aplica a classe no HTML sempre que o estado muda
  useEffect(() => {
    const html = document.documentElement;

    if (isDark) {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="p-2 rounded-md transition-colors hover:bg-black/10 dark:hover:bg-white/10"
      title="Alternar Tema"
    >
      {/* Mostra Sol se estiver escuro, Lua se estiver claro */}
      {isDark ? (
        <Sun className="h-5 w-5 text-yellow-300" />
      ) : (
        <Moon className="h-5 w-5 text-erp-green-DEFAULT" />
      )}
    </button>
  );
}