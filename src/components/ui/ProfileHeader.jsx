import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

function ProfileHeader({ onBack }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <Button
        variant="outline"
        size="sm"
        onClick={onBack}
        className="flex items-center gap-2"
      >
        <ArrowLeft size={16} />
        Back
      </Button>
      <h1 className="text-3xl font-bold text-foreground">Member Profile</h1>
    </div>
  );
}

export default ProfileHeader;
