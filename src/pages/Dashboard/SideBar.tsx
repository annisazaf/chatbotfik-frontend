// src/components/SideBar.tsx

import { useState } from "react";
import logo from "../../assets/logo.svg";

const HomeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/>
    <path d="M9 21V12h6v9"/>
  </svg>
);

const UploadIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="17 8 12 3 7 8"/>
    <line x1="12" y1="3" x2="12" y2="15"/>
  </svg>
);

const KonselingIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);

const RekomendasiIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const RiwayatIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

interface NavItem {
  key: string;
  label: string;
  icon: React.ReactNode;
  isModal?: boolean; // true = buka modal, bukan navigasi halaman
}

const navItems: NavItem[] = [
  { key: "beranda",     label: "Beranda",     icon: <HomeIcon /> },
  { key: "upload-khs",  label: "Upload KHS",  icon: <UploadIcon />,      isModal: true },
  { key: "konseling",   label: "Konseling",   icon: <KonselingIcon /> },
  { key: "rekomendasi", label: "Rekomendasi", icon: <RekomendasiIcon />, isModal: true },
  { key: "riwayat",     label: "Riwayat",     icon: <RiwayatIcon />,     isModal: true },
];

interface User {
  name: string;
  nim: string;
  avatar?: string | null;
}

interface SidebarProps {
  activeKey?: string;
  onNavigate?: (key: string) => void;
  onLogout?: () => void;
  user?: User;
  // Ketiga handler modal dioper dari HomePage
  onShowUploadModal: () => void;
  onShowRekomendasiModal: () => void;
  onShowRiwayatModal: () => void;
  activeModal?: "upload" | "rekomendasi" | "riwayat" | null; // ← tambah ini
}

export default function Sidebar({
  activeKey = "beranda",
  onNavigate,
  onLogout,
  user,
  onShowUploadModal,
  onShowRekomendasiModal,
  onShowRiwayatModal,
  activeModal,
}: SidebarProps) {
  const [active, setActive] = useState<string>(activeKey);
  const [mobileOpen, setMobileOpen] = useState(false);

  const currentUser: User = user ?? {
    name: "Pengguna",
    nim: "-",
    avatar: null,
  };

  const handleNav = (item: NavItem) => {
    // Item modal: buka modal, tidak ubah active nav
    if (item.isModal) {
      if (item.key === "upload-khs")  onShowUploadModal();
      if (item.key === "rekomendasi") onShowRekomendasiModal();
      if (item.key === "riwayat")     onShowRiwayatModal();
      return;
    }

    // Item navigasi biasa
    setActive(item.key);
    onNavigate?.(item.key);
  };

  return (
    <>
    {/* ── DESKTOP SIDEBAR ── */}
    <aside
      className="fixed top-0 left-0 bottom-0 w-56 flex-col px-4 py-7 z-40 hidden md:flex"
      style={{ backgroundColor: "#FCFBFC", border: "1.5px solid transparent" }}
    >
      {/* Logo */}
      <div className="flex justify-center mb-8">
        <img src={logo} alt="Logo" className="w-24 h-24 object-contain" />
      </div>

      {/* Nav */}
      <nav className="flex flex-col justify-center gap-1 flex-1">
        {navItems.map((item) => {
            const modalKeyMap: Record<string, string> = {
            "upload":      "upload-khs",
            "rekomendasi": "rekomendasi",
            "riwayat":     "riwayat",
          };
        const isActive =
          activeModal != null
            ? item.isModal && modalKeyMap[activeModal] === item.key  // modal kebuka: hanya highlight item modal
            : !item.isModal && active === item.key;                  // modal tutup: highlight nav biasa

          return (
              <button
                key={item.key}
                onClick={() => handleNav(item)}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium w-full text-left transition-colors ${
                  isActive
                    ? "text-emerald-700 bg-white/40"
                    : "text-gray-600 hover:bg-white/30 hover:text-gray-800"
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            );
          })}
      </nav>

      {/* User Card */}
      <div className="mt-auto pt-4">
        <div
          className="rounded-xl p-3 flex flex-col gap-3"
          style={{
            background:
              "linear-gradient(white, #FCFBFC) padding-box, linear-gradient(135deg, #a8edea, #fed6e3, #ffecd2, #a1c4fd) border-box",
            border: "2.5px solid transparent",
          }}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-gray-400 overflow-hidden flex-shrink-0 flex items-center justify-center text-white text-sm font-semibold">
              {currentUser.avatar ? (
                <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
              ) : (
                currentUser.name.charAt(0)
              )}
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-xs font-semibold text-gray-800">{currentUser.name}</span>
              <span className="text-xs text-gray-600">{currentUser.nim}</span>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="w-full py-1.5 rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </aside>

    {/* ── MOBILE TOP HEADER ── */}
    <header className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3"
      style={{ backgroundColor: "#FCFBFC", borderBottom: "1px solid #e5e7eb" }}>
      <img src={logo} alt="Logo" className="w-9 h-9 object-contain" />
      <span className="text-sm font-bold" style={{ color: "#307045" }}>ChatbotFIK</span>
      <div className="w-8 h-8 rounded-full bg-emerald-700 flex items-center justify-center text-white text-xs font-bold">
        {currentUser.name.charAt(0)}
      </div>
    </header>

    {/* ── MOBILE BOTTOM NAVBAR ── */}
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around px-2 py-2"
      style={{ backgroundColor: "#FCFBFC", borderTop: "1px solid #e5e7eb" }}>
      {navItems.map((item) => {
        const modalKeyMap: Record<string, string> = {
          "upload":      "upload-khs",
          "rekomendasi": "rekomendasi",
          "riwayat":     "riwayat",
        };
        const isActive = activeModal != null
          ? item.isModal && modalKeyMap[activeModal] === item.key
          : !item.isModal && active === item.key;
        return (
          <button key={item.key} onClick={() => handleNav(item)}
            className="flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-colors"
            style={{ color: isActive ? "#307045" : "#9ca3af" }}>
            {item.icon}
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        );
      })}
      <button onClick={onLogout}
        className="flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl"
        style={{ color: "#9ca3af" }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
        </svg>
        <span className="text-[10px] font-medium">Keluar</span>
      </button>
    </nav>
    </>
  );
}