import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Shield, Home, LogIn, Upload, User, Settings, LogOut, ChevronDown } from "lucide-react";
const Header = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const isLoggedIn = localStorage.getItem("vulnlab-session");
  const username = localStorage.getItem("vulnlab-user");

  const handleLogout = () => {
    localStorage.removeItem("vulnlab-session");
    localStorage.removeItem("vulnlab-user");
    window.location.href = "/";
  };

  return <header className="border-b border-border bg-card shadow-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-danger" />
            <span className="text-xl font-bold text-foreground">VulnLab</span>
            <span className="text-sm text-muted-foreground">Security Testing Platform</span>
          </Link>
          
          <nav className="flex items-center space-x-4">
            <Link to="/">
              <Button variant={isActive("/") ? "default" : "ghost"} size="sm" className="flex items-center space-x-2">
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Button>
            </Link>
            
            {!isLoggedIn ? (
              <Link to="/login">
                <Button variant={isActive("/login") ? "default" : "ghost"} size="sm" className="flex items-center space-x-2">
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </Button>
              </Link>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 bg-primary/10 hover:bg-primary/20">
                    <img 
                      src="/lovable-uploads/a8063ffc-57e9-42f3-9b5d-e026b6967631.png" 
                      alt="Admin Logo" 
                      className="w-6 h-6 rounded-full border border-primary/30"
                    />
                    <span className="text-sm font-medium">{username}</span>
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-card border shadow-lg">
                  <div className="flex items-center space-x-2 p-2">
                    <img 
                      src="/lovable-uploads/a8063ffc-57e9-42f3-9b5d-e026b6967631.png" 
                      alt="Admin Avatar" 
                      className="w-8 h-8 rounded-full border border-primary/30"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">John Doe</span>
                      <span className="text-xs text-muted-foreground">System Administrator</span>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/admin" className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>Admin Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center space-x-2">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-destructive focus:text-destructive"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </nav>
        </div>
      </div>
    </header>;
};
export default Header;