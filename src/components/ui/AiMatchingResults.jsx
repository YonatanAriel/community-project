import { Users } from 'lucide-react';
import ProfileCard from '@/components/ui/ProfileCard';
import ConnectButton from '@/components/ui/ConnectButton';

function AiMatchingResults({ recommendations }) {
  return (
    <div className="p-6 border rounded-lg shadow-sm bg-card border-border">
      <div className="flex items-center justify-between mb-6">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-foreground">
          <Users className="w-5 h-5 text-primary" />
          Connection Recommendations ({recommendations.length})
        </h2>
        <div className="px-3 py-1 text-sm rounded-full text-muted-foreground bg-muted">
          Sorted by relevance
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {recommendations.map((member) => (
          <div
            key={member.id}
            className="p-4 transition-all duration-200 border rounded-lg bg-card border-border hover:shadow-md"
          >
            <ProfileCard member={member}>
              <div className="p-3 mt-4 rounded-lg bg-muted">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {member.matchReason && (
                      <div className="mb-2">
                        <span className="text-sm font-semibold text-foreground">
                          Match Reason:
                        </span>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                          {member.matchReason}
                        </p>
                      </div>
                    )}
                    {member.matchScore && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-foreground">
                          Match Score:
                        </span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 overflow-hidden rounded-full bg-muted">
                            <div
                              className="h-full transition-all duration-300 bg-primary"
                              style={{
                                width: `${member.matchScore * 100}%`,
                              }}
                            />
                          </div>
                          <span className="text-sm font-bold text-primary">
                            {Math.round(member.matchScore * 100)}%
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="ml-3">
                    <ConnectButton
                      userId={member.id}
                      userName={member.user_name}
                      initialStatus="none"
                    />
                  </div>
                </div>
              </div>
            </ProfileCard>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AiMatchingResults;
