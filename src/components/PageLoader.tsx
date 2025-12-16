import { Loader2 } from 'lucide-react';

interface PageLoaderProps {
  message?: string;
}

const PageLoader = ({ message = 'جاري التحميل...' }: PageLoaderProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background text-foreground" dir="rtl">
      <div className="w-full max-w-md rounded-2xl bg-card text-card-foreground shadow-elevated border border-border p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-muted-foreground" />
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-2">{message}</h2>
        <p className="text-sm text-muted-foreground">الرجاء الانتظار قليلاً...</p>
      </div>
    </div>
  );
};

export default PageLoader;
