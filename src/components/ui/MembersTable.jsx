import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import MemberTableRow from './MemberTableRow';

function MembersTable({ members }) {
  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Member</TableHead>
            <TableHead>Skills</TableHead>
            <TableHead>Interests</TableHead>
            <TableHead>Job Titles</TableHead>
            <TableHead>Industries</TableHead>
            <TableHead className="w-[300px]">Summary</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((member) => (
            <MemberTableRow key={member.id} member={member} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default MembersTable;
