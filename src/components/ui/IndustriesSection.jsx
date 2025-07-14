import { Badge } from '@/components/ui/badge';
import { Building } from 'lucide-react';

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

function IndustriesSection({ industries }) {
  return (
    <ProfileSection
      icon={Building}
      title="Industries"
      className="flex flex-wrap gap-2"
    >
      {industries.map((industry, index) => (
        <Badge key={index} variant="default">
          {industry}
        </Badge>
      ))}
    </ProfileSection>
  );
}

export default IndustriesSection;
