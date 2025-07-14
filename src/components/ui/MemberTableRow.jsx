import { TableRow, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

function MemberTableRow({ member }) {
  const navigate = useNavigate();

  const handleRowClick = () => {
    navigate(`/member/${member.id}`);
  };

  return (
    <TableRow
      className="hover:bg-muted/50 cursor-pointer transition-colors"
      onClick={handleRowClick}
    >
      <TableCell className="p-4">
        <div className="flex items-center gap-3">
          <img
            src={member.photo_url}
            alt={member.user_name}
            className="object-cover w-10 h-10 rounded-full"
          />
          <div>
            <div className="font-medium">{member.user_name}</div>
            <div className="text-sm text-muted-foreground">{member.email}</div>
          </div>
        </div>
      </TableCell>
      <TableCell className="p-4">
        <div className="flex flex-wrap gap-1">
          {member.skills.slice(0, 3).map((skill, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
          {member.skills.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{member.skills.length - 3} more
            </Badge>
          )}
        </div>
      </TableCell>
      <TableCell className="p-4">
        <div className="flex flex-wrap gap-1">
          {member.interests.slice(0, 2).map((interest, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {interest}
            </Badge>
          ))}
          {member.interests.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{member.interests.length - 2} more
            </Badge>
          )}
        </div>
      </TableCell>
      <TableCell className="p-4">
        <div className="space-y-1">
          {member.job_titles.slice(0, 2).map((title, index) => (
            <div key={index} className="text-sm font-medium">
              {title}
            </div>
          ))}
          {member.job_titles.length > 2 && (
            <div className="text-xs text-muted-foreground">
              +{member.job_titles.length - 2} more
            </div>
          )}
        </div>
      </TableCell>
      <TableCell className="p-4">
        <div className="flex flex-wrap gap-1">
          {member.industries.map((industry, index) => (
            <Badge key={index} variant="default" className="text-xs">
              {industry}
            </Badge>
          ))}
        </div>
      </TableCell>
      <TableCell className="max-w-xs p-4">
        <div className="text-sm text-muted-foreground line-clamp-2">
          {member.summary}
        </div>
      </TableCell>
    </TableRow>
  );
}

export default MemberTableRow;
