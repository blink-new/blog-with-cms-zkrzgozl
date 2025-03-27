
import { Rocket } from 'lucide-react';

interface ComingSoonProps {
  title: string;
  description: string;
}

export function ComingSoon({ title, description }: ComingSoonProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center animate-in fade-in-50 duration-500">
      <div className="mb-6">
        <Rocket className="w-16 h-16 text-primary animate-bounce" />
      </div>
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <p className="text-muted-foreground text-lg max-w-md">{description}</p>
      <div className="mt-8 w-full max-w-sm">
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <div className="h-full bg-primary w-1/3 animate-pulse rounded-full" />
        </div>
      </div>
    </div>
  );
}