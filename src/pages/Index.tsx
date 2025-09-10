import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, AlertTriangle, Bug, Lock, Upload, Database, Zap, Key, FileX } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import VulnerableComments from "@/components/VulnerableComments";
const Index = () => {
  const vulnerabilities = [{
    icon: <Zap className="h-5 w-5" />,
    name: "Cross-Site Scripting (XSS)",
    description: "Stored XSS in comment system - try injecting HTML/JavaScript",
    severity: "High",
    location: "Comment Section Below"
  }, {
    icon: <Database className="h-5 w-5" />,
    name: "SQL Injection (SQLi)",
    description: "Login form vulnerable to SQL injection attacks",
    severity: "Critical",
    location: "Login Page"
  }, {
    icon: <Shield className="h-5 w-5" />,
    name: "CSRF",
    description: "No CSRF protection on forms and state changes",
    severity: "Medium",
    location: "All Forms"
  }, {
    icon: <Upload className="h-5 w-5" />,
    name: "SSRF",
    description: "Server-Side Request Forgery in admin panel",
    severity: "High",
    location: "Admin Dashboard"
  }, {
    icon: <Bug className="h-5 w-5" />,
    name: "Vulnerable Components",
    description: "Unsafe file upload with no validation",
    severity: "Critical",
    location: "Admin Dashboard"
  }, {
    icon: <Lock className="h-5 w-5" />,
    name: "Broken Access Control",
    description: "Weak session management and authorization",
    severity: "High",
    location: "Authentication System"
  }, {
    icon: <Key className="h-5 w-5" />,
    name: "Authentication Failure",
    description: "Weak password policies and session handling vulnerabilities",
    severity: "High",
    location: "Login System"
  }, {
    icon: <Key className="h-5 w-5" />,
    name: "Cryptographic Failure",
    description: "Weak encryption algorithms and poor key management",
    severity: "Critical",
    location: "Data Storage & Transmission"
  }, {
    icon: <FileX className="h-5 w-5" />,
    name: "Integrity Failure",
    description: "Missing data validation and integrity checks",
    severity: "High",
    location: "File Operations & Data Processing"
  }];
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical":
        return "bg-gradient-danger text-danger-foreground";
      case "High":
        return "bg-warning text-warning-foreground";
      case "Medium":
        return "bg-accent text-accent-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };
  return <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <section className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Shield className="h-12 w-12 text-danger" />
            <h1 className="text-4xl font-bold bg-gradient-danger bg-clip-text text-transparent">
              VulnLab
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A deliberately vulnerable web application for security testing and education. 
            Practice your penetration testing skills in a safe environment.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/login">
              <Button size="lg" className="shadow-danger">
                Start Testing
              </Button>
            </Link>
            
          </div>
        </section>

        {/* Vulnerabilities Grid */}
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Available Vulnerabilities</h2>
            <p className="text-muted-foreground">
              This platform contains the following intentional security vulnerabilities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {vulnerabilities.map((vuln, index) => <Card key={index} className="shadow-card hover:shadow-glow transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="text-danger">{vuln.icon}</div>
                      <CardTitle className="text-lg">{vuln.name}</CardTitle>
                    </div>
                    <Badge className={getSeverityColor(vuln.severity)}>
                      {vuln.severity}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-3">
                    {vuln.description}
                  </CardDescription>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <AlertTriangle className="h-4 w-4" />
                    <span>{vuln.location}</span>
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </section>

        {/* Comment Section with XSS */}
        <section className="space-y-4">
          <div className="text-center">
            
            <p className="text-muted-foreground">
          </p>
          </div>
          <VulnerableComments />
        </section>

        {/* Security Warning */}
        <section className="max-w-4xl mx-auto">
          <Card className="border-warning shadow-card">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                <CardTitle className="text-warning">Security Warning</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>
                <strong>This application is intentionally vulnerable</strong> and should only be used 
                for educational purposes and security testing in controlled environments.
              </p>
              <p>
                <strong>Do not deploy this application</strong> in production or expose it to untrusted networks 
                without proper isolation and security measures.
              </p>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>;
};
export default Index;