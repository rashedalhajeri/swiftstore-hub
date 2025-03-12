
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';
import Logo from '@/components/Logo';
import { useToast } from '@/hooks/use-toast';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [storeName, setStoreName] = useState('');
  const [storeUrl, setStoreUrl] = useState('');
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Remember store URL between steps
  useEffect(() => {
    // If coming back to step 1, retrieve the previously entered store URL if any
    if (step === 1) {
      const savedStoreUrl = sessionStorage.getItem('tempStoreUrl');
      if (savedStoreUrl) {
        setStoreUrl(savedStoreUrl);
      }
    }
  }, [step]);

  const handleGenerateStoreUrl = () => {
    if (storeName) {
      // Generate a URL-friendly slug from the store name
      const slug = storeName
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
      
      setStoreUrl(slug);
      
      // Save the storeUrl temporarily
      sessionStorage.setItem('tempStoreUrl', slug);
    }
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      if (!email || !password) {
        toast({
          title: "يجب ملء جميع الحقول",
          description: "يرجى إدخال البريد الإلكتروني وكلمة المرور",
          variant: "destructive",
        });
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!storeName || !storeUrl) {
        toast({
          title: "يجب ملء جميع الحقول",
          description: "يرجى إدخال اسم المتجر والرابط",
          variant: "destructive",
        });
        return;
      }
      
      // Check if storeUrl is valid (no spaces, special chars, etc.)
      if (!/^[a-z0-9-]+$/.test(storeUrl)) {
        toast({
          title: "رابط المتجر غير صالح",
          description: "يجب أن يحتوي الرابط على أحرف وأرقام وشرطات فقط",
          variant: "destructive",
        });
        return;
      }
      
      // Submit registration
      handleRegister();
    }
  };

  const handleRegister = async () => {
    setIsLoading(true);
    
    // Save store URL permanently
    localStorage.setItem('storeUrl', storeUrl);
    
    // Simulate API request
    setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: "تم إنشاء حسابك بنجاح!",
        description: "جاري تحويلك إلى لوحة التحكم...",
      });
      
      // Remove temporary storage
      sessionStorage.removeItem('tempStoreUrl');
      
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
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">إنشاء حساب جديد</CardTitle>
            <div className="flex items-center">
              <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                {step > 1 ? <CheckCircle2 size={16} /> : '1'}
              </span>
              <div className={`h-0.5 w-6 ${step > 1 ? 'bg-primary' : 'bg-border'}`}></div>
              <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                2
              </span>
            </div>
          </div>
          <CardDescription>
            {step === 1 ? 'أدخل بيانات حسابك للبدء' : 'أدخل معلومات متجرك'}
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleNextStep}>
          <CardContent className="space-y-4">
            {step === 1 ? (
              // Step 1: Account Info
              <>
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
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="pt-2 text-center text-sm text-muted-foreground">
                  موقعك: الكويت | العملة: الدينار الكويتي (KWD)
                </div>
              </>
            ) : (
              // Step 2: Store Info
              <>
                <div className="space-y-2">
                  <Label htmlFor="storeName">اسم المتجر</Label>
                  <Input
                    id="storeName"
                    placeholder="متجر الإلكترونيات"
                    value={storeName}
                    onChange={(e) => {
                      setStoreName(e.target.value);
                      // Don't automatically clear store URL when editing name
                    }}
                    onBlur={handleGenerateStoreUrl}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storeUrl">رابط المتجر</Label>
                  <div className="flex">
                    <div className="flex items-center bg-muted px-3 rounded-l-md border-y border-l border-input">
                      <span className="text-sm text-muted-foreground">linok.me/</span>
                    </div>
                    <Input
                      id="storeUrl"
                      className="rounded-l-none"
                      placeholder="my-store"
                      value={storeUrl}
                      onChange={(e) => setStoreUrl(e.target.value)}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    يمكنك تغيير الرابط مرة واحدة فقط بعد التسجيل
                  </p>
                </div>
              </>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              type="submit" 
              className="w-full button-hover-effect"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : step === 1 ? (
                'التالي'
              ) : (
                'إنشاء المتجر'
              )}
              {!isLoading && step === 1 && <ArrowRight className="mr-2 h-4 w-4" />}
            </Button>
            <div className="text-center text-sm">
              لديك حساب بالفعل؟{' '}
              <Link to="/login" className="font-medium text-primary hover:underline">
                تسجيل الدخول
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Register;
