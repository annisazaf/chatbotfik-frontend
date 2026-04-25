import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { authService } from "./services/authServices"; // Import sebagai objek sesuai service tadi
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/Dashboard/HomePage";
import { Loader2 } from "lucide-react";



function App() {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  // Fungsi buat ngecek status login
  const checkAuth = async () => {
    try {
      // Panggil getMe dari service
      const user = await authService.getMe();
      // Kalau dapet data (status 200), berarti auth sukses
      setIsAuth(user !== null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // Kalau error (401/404), berarti user belum login/unauthorized
      setIsAuth(false);
    }
  };

  const handleLogout = async () => {
    await authService.logout();
    await checkAuth();
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    checkAuth();
  }, []);

  // Selama isAuth masih null (sedang loading), tampilin spinner
  if (isAuth === null) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-slate-50 gap-3">
        <Loader2 className="h-10 w-10 animate-spin text-[#307045]" />
        <p className="text-sm font-medium text-slate-500">Memeriksa Sesi...</p>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Halaman Login: Kalau sudah login, mental ke /home */}
        <Route
          path="/login"
          element={
            isAuth
              ? <Navigate to="/home" replace />
              : <LoginPage onLoginSuccess={checkAuth} />
          }
        />

        {/* Halaman Register: Kalau sudah login, mental ke /home */}
        <Route
          path="/register"
          element={
            isAuth 
              ? <Navigate to="/home" replace /> 
              : <RegisterPage />
          }
        />

        {/* Halaman Home: Kalau belum login, mental ke /login */}
        <Route
          path="/home"
          element={
            isAuth 
              ? <HomePage onLogout={handleLogout} />
              : <Navigate to="/login" replace />
          }
        />

        {/* Fallback Routes */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;