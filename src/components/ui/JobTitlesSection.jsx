import { Briefcase } from 'lucide-react';

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

function JobTitlesSection({ jobTitles }) {
  return (
    <ProfileSection icon={Briefcase} title="Job Titles" className="space-y-2">
      {jobTitles.map((title, index) => (
        <div key={index} className="text-sm font-medium text-foreground">
          {title}
        </div>
      ))}
    </ProfileSection>
  );
}

export default JobTitlesSection;
