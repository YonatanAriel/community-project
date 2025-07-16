import ConnectButton from '@/components/ui/ConnectButton';
import { truncateText } from '@/utils/utils';
import AiMatchingUserInfo from './AiMatchingUserInfo';
import AiMatchingSkills from './AiMatchingSkills';
import AiMatchingMatchScore from './AiMatchingMatchScore';

function AiMatchingCard({ member }) {
  return (
    <div className="p-4 transition-shadow border rounded-lg bg-card border-border hover:shadow-md">
      <AiMatchingUserInfo member={member} />

      {member.bio && (
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
          {truncateText(member.bio, 120)}
        </p>
      )}

      <AiMatchingSkills member={member} />

      <AiMatchingMatchScore member={member} />

      <div className="flex justify-center">
        <ConnectButton
          userId={member.id}
          userName={member.user_name}
          initialStatus="none"
        />
      </div>
    </div>
  );
}

export default AiMatchingCard;
