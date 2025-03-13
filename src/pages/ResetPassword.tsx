
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, ArrowLeft, CheckCircle } from 'lucide-react';
import Logo from '@/components/Logo';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "البريد الإلكتروني مطلوب",
        description: "يرجى إدخال عنوان البريد الإلكتروني الخاص بك",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
      });
      
      if (error) {
        toast({
          title: "حدث خطأ",
          description: error.message,
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      
      setIsSuccess(true);
      toast({
        title: "تم إرسال رابط إعادة تعيين كلمة المرور",
        description: "تحقق من بريدك الإلكتروني للحصول على تعليمات إعادة تعيين كلمة المرور",
      });
    } catch (error) {
      console.error('Error during password reset:', error);
      toast({
        title: "حدث خطأ غير متوقع",
        description: "يرجى المحاولة مرة أخرى لاحقًا",
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
          <div className="flex items-center">
            <Link to="/login" className="mr-auto inline-flex items-center text-primary hover:text-primary/80">
              <ArrowLeft className="mr-2 h-4 w-4" />
              <span>العودة إلى تسجيل الدخول</span>
            </Link>
          </div>
          <CardTitle className="text-2xl font-bold mt-4">إعادة تعيين كلمة المرور</CardTitle>
          <CardDescription>
            {isSuccess 
              ? "تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني"
              : "أدخل بريدك الإلكتروني وسنرسل لك رابطًا لإعادة تعيين كلمة المرور"}
          </CardDescription>
        </CardHeader>
        
        {isSuccess ? (
          <CardContent className="flex flex-col items-center space-y-4 pt-6">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <p className="text-center">
              تحقق من بريدك الإلكتروني <strong>{email}</strong> للحصول على رابط إعادة تعيين كلمة المرور.
            </p>
            <p className="text-center text-sm text-muted-foreground">
              إذا لم تستلم بريدًا إلكترونيًا، تحقق من مجلد البريد العشوائي أو أعد المحاولة.
            </p>
          </CardContent>
        ) : (
          <form onSubmit={handleResetPassword}>
            <CardContent className="space-y-4 pt-6">
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
                  'إرسال رابط إعادة التعيين'
                )}
              </Button>
            </CardFooter>
          </form>
        )}
      </Card>
    </div>
  );
};

export default ResetPassword;
