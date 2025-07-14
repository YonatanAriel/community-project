import { Badge } from '@/components/ui/badge';

function ProfileSection({ icon: Icon, title, children, className }) {
  return (
    <div className="p-6 border rounded-lg bg-card border-border">
      <div className="flex items-center gap-2 mb-4">
        <Icon size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      </div>
      <div className={className}>{children}</div>
    </div>
  );
}

function InterestsSection({ interests }) {
  return (
    <ProfileSection
      icon={({ size, className }) => (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      )}
      title="Interests"
      className="flex flex-wrap gap-2"
    >
      {interests.map((interest, index) => (
        <Badge key={index} variant="outline">
          {interest}
        </Badge>
      ))}
    </ProfileSection>
  );
}

export default InterestsSection;
