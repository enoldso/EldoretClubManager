import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import clubLogo from "@assets/Club logo_1762184298518.jpg";

interface LoginFormProps {
  type: "member" | "admin";
  onLogin?: (username: string, password: string) => void;
  onSwitchType?: () => void;
}

export default function LoginForm({ type, onLogin, onSwitchType }: LoginFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`${type} login:`, { username, password, rememberMe });
    onLogin?.(username, password);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4 text-center">
          <div className="flex justify-center">
            <img src={clubLogo} alt="Eldoret Club Logo" className="h-24 w-24 rounded-full object-cover" />
          </div>
          <div>
            <CardTitle className="text-3xl font-serif">
              {type === "member" ? "Member Login" : "Admin Login"}
            </CardTitle>
            <CardDescription className="text-sm mt-2">
              {type === "member" 
                ? "Welcome back to Eldoret Club" 
                : "Administrative access portal"}
            </CardDescription>
          </div>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" data-testid="label-username">Email or Member ID</Label>
              <Input
                id="username"
                type="text"
                placeholder={type === "member" ? "john.doe@example.com" : "admin@eldoretclub.com"}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                data-testid="input-username"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" data-testid="label-password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  data-testid="input-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  data-testid="button-toggle-password"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  data-testid="checkbox-remember"
                />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remember me
                </label>
              </div>
              <Button variant="ghost" className="px-0 text-sm h-auto" type="button" data-testid="link-forgot-password">
                Forgot password?
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" data-testid="button-signin">
              Sign In
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="w-full text-sm"
              onClick={onSwitchType}
              data-testid="button-switch-type"
            >
              {type === "member" ? "Switch to Admin Login" : "Switch to Member Login"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
