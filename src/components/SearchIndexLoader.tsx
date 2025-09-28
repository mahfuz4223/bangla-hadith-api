import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Search, Database, CheckCircle } from 'lucide-react';

interface SearchIndexLoaderProps {
  loading: boolean;
  error: string | null;
}

export const SearchIndexLoader = ({ loading, error }: SearchIndexLoaderProps) => {
  const [progress, setProgress] = useState(0);
  const [loadingStep, setLoadingStep] = useState('');

  useEffect(() => {
    if (loading) {
      const steps = [
        'সার্চ ইনডেক্স প্রস্তুত করা হচ্ছে...',
        'হাদিস ডেটা লোড করা হচ্ছে...',
        'সার্চ ক্যাপাবিলিটি তৈরি করা হচ্ছে...',
        'ইনডেক্সিং সম্পূর্ণ হচ্ছে...'
      ];

      let currentStep = 0;
      let currentProgress = 0;

      const interval = setInterval(() => {
        if (currentProgress < 90) {
          currentProgress += Math.random() * 15;
          setProgress(Math.min(currentProgress, 90));
          
          if (currentStep < steps.length - 1 && currentProgress > (currentStep + 1) * 20) {
            currentStep++;
          }
          setLoadingStep(steps[currentStep]);
        }
      }, 500);

      return () => clearInterval(interval);
    } else {
      setProgress(100);
      setLoadingStep('সার্চ প্রস্তুত!');
    }
  }, [loading]);

  if (!loading && !error) {
    return null;
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6">
        {loading && (
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <div className="relative">
                <Search className="h-8 w-8 text-primary animate-pulse" />
                <Database className="h-4 w-4 text-muted-foreground absolute -bottom-1 -right-1 animate-bounce" />
              </div>
            </div>
            
            <div className="text-center">
              <h3 className="font-bengali font-medium mb-2">সার্চ ইনডেক্স লোড হচ্ছে</h3>
              <p className="text-sm text-muted-foreground font-bengali mb-4">
                {loadingStep}
              </p>
            </div>
            
            <div className="space-y-2">
              <Progress value={progress} className="w-full" />
              <p className="text-xs text-center text-muted-foreground">
                {Math.round(progress)}% সম্পূর্ণ
              </p>
            </div>
          </div>
        )}

        {!loading && !error && (
          <div className="text-center space-y-2">
            <CheckCircle className="h-8 w-8 text-green-500 mx-auto" />
            <h3 className="font-bengali font-medium">সার্চ প্রস্তুত!</h3>
            <p className="text-sm text-muted-foreground font-bengali">
              এখন আপনি হাদিস অনুসন্ধান করতে পারেন
            </p>
          </div>
        )}

        {error && (
          <div className="text-center space-y-2">
            <div className="h-8 w-8 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
              <Search className="h-4 w-4 text-destructive" />
            </div>
            <h3 className="font-bengali font-medium text-destructive">সমস্যা হয়েছে</h3>
            <p className="text-sm text-muted-foreground font-bengali">
              {error}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};