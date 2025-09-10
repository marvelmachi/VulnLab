import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Upload, AlertTriangle, Shield, User, LogOut, Settings, Mail, Phone, MapPin, Calendar, Key, ChevronDown, ChevronUp, Building } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import Header from "@/components/Header";

const Admin = () => {
  const [user, setUser] = useState("");
  const [uploadUrl, setUploadUrl] = useState("");
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("success");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const navigate = useNavigate();

  // Admin profile data
  const adminProfile = {
    name: "John Doe",
    age: 45,
    role: "System Admin",
    address: "1234 Elm Street, Springfield, USA",
    userId: "admin",
    email: "john.doe@example.com",
    phone: "+1-202-555-0147",
    department: "IT Infrastructure"
  };

  useEffect(() => {
    // Check if user is logged in
    const session = localStorage.getItem("vulnlab-session");
    const username = localStorage.getItem("vulnlab-user");
    
    if (!session || !username) {
      navigate("/login");
      return;
    }
    
    setUser(username);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("vulnlab-session");
    localStorage.removeItem("vulnlab-user");
    navigate("/");
  };

  const handleFileUpload = () => {
    if (!uploadFile) {
      setMessage("Please select a file to upload");
      setMessageType("error");
      return;
    }

    // VULNERABILITY: No file type validation, path traversal possible
    const fileName = uploadFile.name;
    console.log("Uploading file:", fileName);
    console.log("File type:", uploadFile.type);
    console.log("File size:", uploadFile.size);

    // Simulate file upload
    setTimeout(() => {
      setMessage(`File uploaded successfully: ${fileName}`);
      setMessageType("success");
    }, 1000);
  };

  const handleUrlFetch = () => {
    if (!uploadUrl) {
      setMessage("Please enter a URL");
      setMessageType("error");
      return;
    }

    // VULNERABILITY: SSRF - No URL validation
    console.log("Fetching URL:", uploadUrl);
    
    // Simulate SSRF vulnerability
    setTimeout(() => {
      if (uploadUrl.includes("localhost") || uploadUrl.includes("127.0.0.1") || uploadUrl.includes("file://")) {
        setMessage(`SSRF Attack detected! Attempted to fetch: ${uploadUrl}`);
        setMessageType("error");
      } else {
        setMessage(`URL fetched successfully: ${uploadUrl}`);
        setMessageType("success");
      }
    }, 1000);
  };

  const handlePasswordReset = () => {
    if (!newPassword || !confirmPassword) {
      setMessage("Please fill in both password fields");
      setMessageType("error");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      setMessageType("error");
      return;
    }

    // VULNERABILITY: No proper password validation
    if (newPassword.length < 3) {
      setMessage("Password too weak! Must be at least 3 characters");
      setMessageType("error");
      return;
    }

    // Simulate password reset
    setTimeout(() => {
      setMessage("Password reset successfully! (Vulnerability: No current password verification)");
      setMessageType("success");
      setNewPassword("");
      setConfirmPassword("");
      setIsResetDialogOpen(false);
    }, 1000);
  };

  if (!user) {
    return null; // Loading or redirecting
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Dashboard Header with Logo */}
          <Card className="shadow-card bg-gradient-to-r from-primary/10 to-secondary/10">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <img 
                      src="/lovable-uploads/a8063ffc-57e9-42f3-9b5d-e026b6967631.png" 
                      alt="Admin Logo" 
                      className="w-12 h-12 rounded-full border-2 border-primary/20"
                    />
                    <div>
                      <CardTitle className="text-xl">VulnLab Admin Dashboard</CardTitle>
                      <Badge variant="secondary" className="mt-1">Logged in as: {user}</Badge>
                    </div>
                  </div>
                </div>
                <Button variant="destructive" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </CardHeader>
          </Card>

          {/* Admin Profile Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <User className="h-5 w-5 text-primary" />
                    <CardTitle>Administrator Profile</CardTitle>
                  </div>
                  <Dialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Key className="h-4 w-4 mr-2" />
                        Reset Password
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Reset Administrator Password</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="newPassword">New Password</Label>
                          <Input
                            id="newPassword"
                            type="password"
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">Confirm Password</Label>
                          <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm new password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                        </div>
                        <Button onClick={handlePasswordReset} className="w-full">
                          Reset Password
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center space-x-3">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Name</p>
                      <p className="text-sm text-muted-foreground">{adminProfile.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Age</p>
                      <p className="text-sm text-muted-foreground">{adminProfile.age} years</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Settings className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Role</p>
                      <p className="text-sm text-muted-foreground">{adminProfile.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">User ID</p>
                      <p className="text-sm text-muted-foreground">{adminProfile.userId}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Key className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Password</p>
                      <p className="text-sm text-muted-foreground">********</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{adminProfile.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">{adminProfile.phone}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Address</p>
                    <p className="text-sm text-muted-foreground">{adminProfile.address}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Settings className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Department</p>
                    <p className="text-sm text-muted-foreground">{adminProfile.department}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* System Configuration Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* File Upload Section */}
            <Card className="shadow-card">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Upload className="h-5 w-5 text-danger" />
                  <CardTitle className="text-lg">System Logo Upload</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <img 
                    src="/lovable-uploads/a8063ffc-57e9-42f3-9b5d-e026b6967631.png" 
                    alt="Current Logo" 
                    className="w-16 h-16 mx-auto rounded-full border-2 border-border mb-3"
                  />
                  <p className="text-sm text-muted-foreground mb-3">Current System Logo</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="file">Upload New Logo/File</Label>
                  <Input
                    id="file"
                    type="file"
                    onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                  />
                  <p className="text-xs text-muted-foreground">
                    VULNERABILITY: No file type validation
                  </p>
                </div>
                <Button onClick={handleFileUpload} className="w-full">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload File
                </Button>
              </CardContent>
            </Card>

            {/* External Resources Section - Collapsible */}
            <Card className="lg:col-span-2 shadow-card">
              <Collapsible open={isResourcesOpen} onOpenChange={setIsResourcesOpen}>
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Shield className="h-5 w-5 text-warning" />
                        <CardTitle className="text-lg">External Resources Manager</CardTitle>
                      </div>
                      {isResourcesOpen ? (
                        <ChevronUp className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="space-y-4">
                    <div className="bg-muted/30 p-3 rounded-md">
                      <p className="text-sm text-muted-foreground mb-2">
                        <AlertTriangle className="h-4 w-4 inline mr-1" />
                        <strong>Security Warning:</strong> This feature allows fetching external resources
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="url">Resource URL</Label>
                      <Input
                        id="url"
                        placeholder="Try: http://localhost:8080/admin, file:///etc/passwd, http://169.254.169.254/metadata"
                        value={uploadUrl}
                        onChange={(e) => setUploadUrl(e.target.value)}
                        className="font-mono text-sm"
                      />
                      <p className="text-xs text-muted-foreground">
                        VULNERABILITY: SSRF - No URL validation or filtering
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Button onClick={handleUrlFetch} variant="outline">
                        <Shield className="h-4 w-4 mr-2" />
                        Fetch Resource
                      </Button>
                      <Button 
                        onClick={() => setUploadUrl("http://localhost:8080/admin")} 
                        variant="ghost" 
                        size="sm"
                      >
                        Test Local Admin
                      </Button>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          </div>

          {/* Message Display */}
          {message && (
            <Alert variant={messageType === "error" ? "destructive" : "default"}>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;