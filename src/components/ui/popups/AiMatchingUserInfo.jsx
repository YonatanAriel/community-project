import { MapPin, Briefcase, Mail, User } from 'lucide-react';

function AiMatchingUserInfo({ member }) {
  return (
    <>
      <div className="flex items-start gap-3 mb-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground">
          {member.profile_picture ? (
            <img
              src={member.profile_picture}
              alt={member.user_name}
              className="object-cover w-full h-full rounded-full"
            />
          ) : (
            <User className="w-6 h-6" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold truncate text-foreground">
            {member.user_name}
          </h3>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Mail className="w-3 h-3" />
            <span className="truncate">{member.email}</span>
          </div>
        </div>
      </div>

      {member.job_title && (
        <div className="flex items-center gap-2 mb-3">
          <Briefcase className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">
            {member.job_title}
          </span>
          {member.company && (
            <span className="text-sm text-muted-foreground">
              at {member.company}
            </span>
          )}
        </div>
      )}

      {member.location && (
        <div className="flex items-center gap-2 mb-3">
          <MapPin className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {member.location}
          </span>
        </div>
      )}
    </>
  );
}

export default AiMatchingUserInfo;
