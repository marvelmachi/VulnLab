import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LogIn, AlertTriangle, Shield } from "lucide-react";
import Header from "@/components/Header";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    // Simulate server delay
    setTimeout(() => {
      // VULNERABILITY: SQL Injection - Direct string concatenation
      const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
      
      console.log("Executing SQL Query:", query);

      // Vulnerable login logic - bypassed with SQL injection
      if (
        username === "admin" && password === "admin123" ||
        username.includes("'") || username.includes("--") || 
        username.toLowerCase().includes("or") || username.includes("=") ||
        password.includes("'") || password.includes("--") || 
        password.toLowerCase().includes("or") || password.includes("=")
      ) {
        // VULNERABILITY: No proper session management
        localStorage.setItem("vulnlab-session", "admin-token-" + Date.now());
        localStorage.setItem("vulnlab-user", "admin");
        navigate("/admin");
      } else {
        setError("Invalid credentials. Try Again");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
          <Card className="w-full max-w-md shadow-card">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Shield className="h-8 w-8 text-danger" />
                <CardTitle className="text-2xl">Admin Login</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                />
              </div>

              <Button 
                onClick={handleLogin} 
                className="w-full"
                disabled={loading}
              >
                <LogIn className="h-4 w-4 mr-2" />
                {loading ? "Logging in..." : "Login"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;