import { useNavigate } from 'react-router-dom';
import ProfileHeader from '@/components/ui/ProfileHeader';
import ProfileCard from '@/components/ui/ProfileCard';
import SkillsSection from '@/components/ui/SkillsSection';
import InterestsSection from '@/components/ui/InterestsSection';
import JobTitlesSection from '@/components/ui/JobTitlesSection';
import IndustriesSection from '@/components/ui/IndustriesSection';

function UserProfile() {
  const navigate = useNavigate();

  // Current user data
  const currentUser = {
    id: 1,
    user_name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    photo_url:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    skills: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
    interests: ['Web Development', 'AI/ML', 'Open Source'],
    job_titles: ['Senior Frontend Developer', 'Full Stack Developer'],
    industries: ['Technology', 'E-commerce'],
    summary:
      'Passionate full-stack developer with 5+ years of experience building scalable web applications. Love working with modern JavaScript frameworks and contributing to open source projects.',
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      <ProfileHeader onBack={() => navigate(-1)} />

      <div className="mb-6">
        <ProfileCard member={currentUser} />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <SkillsSection skills={currentUser.skills} />
        <InterestsSection interests={currentUser.interests} />
        <JobTitlesSection jobTitles={currentUser.job_titles} />
        <IndustriesSection industries={currentUser.industries} />
      </div>
    </div>
  );
}

export default UserProfile;
