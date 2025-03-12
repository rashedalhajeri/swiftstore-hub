
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2 } from 'lucide-react';
import Logo from '@/components/Logo';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "يجب ملء جميع الحقول",
        description: "يرجى إدخال البريد الإلكتروني وكلمة المرور",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API request
    setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: "تم تسجيل الدخول بنجاح!",
        description: "جاري تحويلك إلى لوحة التحكم...",
      });
      
      // Redirect to dashboard
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-secondary/20 flex flex-col justify-center p-4 sm:p-6 md:p-8" style={{ direction: 'rtl' }}>
      <div className="absolute top-8 right-8">
        <Logo size="md" />
      </div>
      
      <Card className="max-w-md w-full mx-auto animate-fade-in">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">تسجيل الدخول</CardTitle>
          <CardDescription>
            أدخل بيانات حسابك للوصول إلى لوحة التحكم
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">كلمة المرور</Label>
                <Link 
                  to="/reset-password" 
                  className="text-sm font-medium text-primary hover:underline"
                >
                  نسيت كلمة المرور؟
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Checkbox 
                id="remember" 
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(!!checked)}
              />
              <Label 
                htmlFor="remember" 
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                تذكرني
              </Label>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              type="submit" 
              className="w-full button-hover-effect"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                'تسجيل الدخول'
              )}
            </Button>
            <div className="text-center text-sm">
              ليس لديك حساب؟{' '}
              <Link to="/register" className="font-medium text-primary hover:underline">
                إنشاء حساب
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;
