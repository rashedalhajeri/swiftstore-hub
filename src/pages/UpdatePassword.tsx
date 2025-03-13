
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Shield } from 'lucide-react';
import Logo from '@/components/Logo';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const UpdatePassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  // التحقق من وجود جلسة للمستخدم عند تحميل الصفحة
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        toast({
          title: "جلسة غير صالحة",
          description: "رابط إعادة تعيين كلمة المرور غير صالح أو منتهي الصلاحية",
          variant: "destructive",
        });
        navigate('/login');
      }
    };

    checkSession();
  }, [navigate, toast]);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (!password || !confirmPassword) {
      setErrorMessage('يرجى ملء جميع الحقول');
      return;
    }
    
    if (password !== confirmPassword) {
      setErrorMessage('كلمات المرور غير متطابقة');
      return;
    }
    
    if (password.length < 8) {
      setErrorMessage('يجب أن تكون كلمة المرور 8 أحرف على الأقل');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      });
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "تم تحديث كلمة المرور",
        description: "تم تحديث كلمة المرور الخاصة بك بنجاح",
      });
      
      // انتظر قليلاً ثم انتقل إلى صفحة تسجيل الدخول
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error: any) {
      console.error('Error updating password:', error);
      toast({
        title: "فشل تحديث كلمة المرور",
        description: error.message || "حدث خطأ أثناء تحديث كلمة المرور",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary/20 flex flex-col justify-center p-4 sm:p-6 md:p-8" style={{ direction: 'rtl' }}>
      <div className="absolute top-8 right-8">
        <Logo size="md" />
      </div>
      
      <Card className="max-w-md w-full mx-auto animate-fade-in">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">تحديث كلمة المرور</CardTitle>
          <CardDescription className="text-center">
            أدخل كلمة المرور الجديدة لحسابك
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleUpdatePassword}>
          <CardContent className="space-y-4 pt-6">
            {errorMessage && (
              <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">
                {errorMessage}
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="password">كلمة المرور الجديدة</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                يجب أن تكون كلمة المرور 8 أحرف على الأقل
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">تأكيد كلمة المرور</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full button-hover-effect"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                'تحديث كلمة المرور'
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default UpdatePassword;
