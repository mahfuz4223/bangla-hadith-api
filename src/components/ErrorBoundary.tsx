import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <Card className="max-w-md w-full">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 rounded-full bg-destructive/10">
                <AlertTriangle className="h-8 w-8 text-destructive" />
              </div>
              <CardTitle className="font-bengali text-gradient-primary">
                কিছু ভুল হয়েছে
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="font-bengali text-muted-foreground">
                অ্যাপ্লিকেশনে একটি ত্রুটি হয়েছে। অনুগ্রহ করে পৃষ্ঠা রিফ্রেশ করুন।
              </p>
              <Button 
                onClick={() => window.location.reload()} 
                className="w-full font-bengali"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                পৃষ্ঠা রিফ্রেশ করুন
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}