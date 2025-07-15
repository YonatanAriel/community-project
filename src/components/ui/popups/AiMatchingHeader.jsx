import { X, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

function AiMatchingHeader({ recommendationsCount, onClose }) {
  return (
    <div className="flex items-center justify-between p-6 border-b border-border">
      <div className="flex items-center gap-3">
        <Users className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold text-foreground">
          AI Matching Results
        </h2>
        <Badge variant="secondary" className="text-sm">
          {recommendationsCount} matches found
        </Badge>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={onClose}
        className="w-8 h-8 p-0 bg-white hover:bg-gray-100"
      >
        <X className="w-4 h-4" />
      </Button>
    </div>
  );
}

export default AiMatchingHeader;
