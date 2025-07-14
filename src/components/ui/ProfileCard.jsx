import { Mail } from 'lucide-react';

function ProfileCard({ member, children }) {
  return (
    <div className="p-6 mb-8 border rounded-lg bg-card border-border">
      <div className="flex items-start gap-6">
        <img
          src={member.photo_url}
          alt={member.user_name}
          className="object-cover w-24 h-24 rounded-full"
        />
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <h2 className="text-2xl font-bold text-foreground">
              {member.user_name}
            </h2>
            {children && <div className="flex justify-start">{children}</div>}
          </div>
          <div className="flex items-center gap-2 mb-4 text-muted-foreground">
            <Mail size={16} />
            <span>{member.email}</span>
          </div>
          <p className="leading-relaxed text-foreground">{member.summary}</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
