import { useParams, useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/userStore';
import { Button } from '@/components/ui/button';
import ProfileHeader from '@/components/ui/ProfileHeader';
import ProfileCard from '@/components/ui/ProfileCard';
import SkillsSection from '@/components/ui/SkillsSection';
import InterestsSection from '@/components/ui/InterestsSection';
import JobTitlesSection from '@/components/ui/JobTitlesSection';
import IndustriesSection from '@/components/ui/IndustriesSection';
import ConnectButton from '@/components/ui/ConnectButton';

function MemberProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { allUsers } = useUserStore();

  const member = allUsers.find((m) => m.id === parseInt(id));

  if (!member) {
    return (
      <div className="container px-4 py-8 mx-auto">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-foreground">
            Member Not Found
          </h1>
          <Button onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <ProfileHeader onBack={() => navigate(-1)} />

      <div className="mb-6">
        <ProfileCard member={member}>
          <ConnectButton
            userId={member.id}
            userName={member.user_name}
            initialStatus="none"
          />
        </ProfileCard>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <SkillsSection skills={member.skills} />
        <InterestsSection interests={member.interests} />
        <JobTitlesSection jobTitles={member.job_titles} />
        <IndustriesSection industries={member.industries} />
      </div>
    </div>
  );
}

export default MemberProfile;
