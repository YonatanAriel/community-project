import { Star } from 'lucide-react';
import { truncateText } from '@/utils/function';

function AiMatchingMatchScore({ member }) {
  return (
    <div className="p-3 mb-4 rounded-lg bg-muted/50">
      {member.matchScore && (
        <div className="flex items-center gap-2 mb-2">
          <Star className="w-4 h-4 text-yellow-500" />
          <span className="text-sm font-medium text-foreground">
            Match Score:
          </span>
          <div className="flex items-center gap-2">
            <div className="w-16 h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full transition-all duration-300 bg-primary"
                style={{ width: `${member.matchScore * 100}%` }}
              />
            </div>
            <span className="text-sm font-bold text-primary">
              {Math.round(member.matchScore * 100)}%
            </span>
          </div>
        </div>
      )}
      {member.matchReason && (
        <p className="text-sm leading-relaxed text-muted-foreground">
          {truncateText(member.matchReason, 100)}
        </p>
      )}
    </div>
  );
}

export default AiMatchingMatchScore;
