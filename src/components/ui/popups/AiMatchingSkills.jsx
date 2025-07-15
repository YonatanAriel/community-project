import { Building } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

function AiMatchingSkills({ member }) {
  return (
    <>
      {member.skills && member.skills.length > 0 && (
        <div className="mb-3">
          <h4 className="mb-2 text-sm font-medium text-foreground">Skills</h4>
          <div className="flex flex-wrap gap-1">
            {member.skills.slice(0, 4).map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
            {member.skills.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{member.skills.length - 4} more
              </Badge>
            )}
          </div>
        </div>
      )}

      {member.industries && member.industries.length > 0 && (
        <div className="mb-3">
          <h4 className="mb-2 text-sm font-medium text-foreground">
            Industries
          </h4>
          <div className="flex flex-wrap gap-1">
            {member.industries.map((industry, index) => (
              <Badge key={index} variant="default" className="text-xs">
                <Building className="w-3 h-3 mr-1" />
                {industry}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {member.interests && member.interests.length > 0 && (
        <div className="mb-4">
          <h4 className="mb-2 text-sm font-medium text-foreground">
            Interests
          </h4>
          <div className="flex flex-wrap gap-1">
            {member.interests.slice(0, 3).map((interest, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {interest}
              </Badge>
            ))}
            {member.interests.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{member.interests.length - 3} more
              </Badge>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default AiMatchingSkills;
