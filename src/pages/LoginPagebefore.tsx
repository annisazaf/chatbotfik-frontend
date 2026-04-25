/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// Sesuaikan import ke objek authService
import { authService } from "@/services/authServices"; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, AlertCircle } from "lucide-react";

interface Props {
  onLoginSuccess: () => Promise<void>;
}

const LoginPage = ({ onLoginSuccess }: Props) => {
  const [nim, setNim] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Gunakan authService.login yang sudah kita buat di service
      await authService.login(nim, password);

      // Jika berhasil (tidak lempar error), update state di App.tsx
      await onLoginSuccess();
      
      // Navigate akan otomatis ditangani isAuth di App.tsx sebenarnya, 
      // tapi manual navigate di sini juga nggak masalah buat jaga-jaga.
      navigate("/home");
    } catch (err: any) {
      // Ambil pesan error dari backend (Flask)
      const message = err.response?.data?.error || "NIM atau Password salah.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md shadow-md border-t-4 border-t-[#307045]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-[#307045]">Masuk</CardTitle>
          <CardDescription>Masukkan NIM dan password kamu</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nim">NIM</Label>
              <Input
                id="nim"
                placeholder="Contoh: 2021001234"
                value={nim}
                onChange={(e) => { setNim(e.target.value); setError(null); }}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(null); }}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#307045] hover:bg-[#255a36] text-white"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Memverifikasi...
                </>
              ) : (
                "Masuk"
              )}
            </Button>
          </form>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            Belum punya akun?{" "}
            <Link to="/register" className="font-medium text-[#307045] hover:underline">
              Daftar di sini
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;