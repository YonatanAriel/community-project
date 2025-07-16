import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ProfileCard from '@/components/ui/ProfileCard';
import SkillsSection from '@/components/ui/SkillsSection';
import InterestsSection from '@/components/ui/InterestsSection';
import JobTitlesSection from '@/components/ui/JobTitlesSection';
import IndustriesSection from '@/components/ui/IndustriesSection';

function UserProfile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [editData, setEditData] = useState({
    skills: [],
    interests: [],
    job_titles: [],
    industries: [],
  });

  // Current user data with localStorage persistence
  const [currentUser, setCurrentUser] = useState({
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
  });

  // Load user data from localStorage on component mount
  useEffect(() => {
    const savedUserData = localStorage.getItem('userProfile');
    if (savedUserData) {
      try {
        const parsedData = JSON.parse(savedUserData);
        setCurrentUser((prevUser) => ({
          ...prevUser,
          ...parsedData,
        }));
      } catch (error) {
        console.error('Error loading user data from localStorage:', error);
      }
    }
    setIsInitialized(true);
  }, []);

  // Save user data to localStorage whenever currentUser changes (but not on initial load)
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('userProfile', JSON.stringify(currentUser));
    }
  }, [currentUser, isInitialized]);

  const handleEdit = () => {
    setEditData({
      skills: [...currentUser.skills],
      interests: [...currentUser.interests],
      job_titles: [...currentUser.job_titles],
      industries: [...currentUser.industries],
    });
    setIsEditing(true);
  };

  const handleSave = () => {
    setCurrentUser((prev) => ({
      ...prev,
      skills: editData.skills,
      interests: editData.interests,
      job_titles: editData.job_titles,
      industries: editData.industries,
    }));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({
      skills: [],
      interests: [],
      job_titles: [],
      industries: [],
    });
  };

  const addItem = (field, value) => {
    if (value.trim() && !editData[field].includes(value.trim())) {
      setEditData((prev) => ({
        ...prev,
        [field]: [...prev[field], value.trim()],
      }));
    }
  };

  const removeItem = (field, index) => {
    setEditData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex-1 w-full px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-3 py-2 text-sm transition-colors bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="m12 19-7-7 7-7" />
                <path d="M19 12H5" />
              </svg>
              Back
            </button>
            <h1 className="text-3xl font-bold text-foreground">User Profile</h1>
          </div>

          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 text-sm transition-colors bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 text-sm transition-colors rounded-md shadow-sm bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Save Changes
                </button>
              </>
            ) : (
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 px-4 py-2 text-sm transition-colors rounded-md shadow-sm bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
                Edit Profile
              </button>
            )}
          </div>
        </div>

        <div className="mb-4">
          <ProfileCard member={currentUser} />
        </div>

        {isEditing ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Skills Edit Section */}
            <div className="p-6 border rounded-lg bg-card border-border">
              <h3 className="mb-4 text-lg font-semibold text-foreground">
                Edit Skills
              </h3>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add a skill..."
                    className="flex-1 px-3 py-2 text-sm bg-white border border-gray-300 rounded-md"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addItem('skills', e.target.value);
                        e.target.value = '';
                      }
                    }}
                  />
                  <button
                    onClick={(e) => {
                      const input = e.target.previousElementSibling;
                      addItem('skills', input.value);
                      input.value = '';
                    }}
                    className="px-3 py-2 text-sm transition-colors rounded-md shadow-sm bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {editData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-2 py-1 text-sm bg-gray-100 rounded-md"
                    >
                      {skill}
                      <button
                        onClick={() => removeItem('skills', index)}
                        className="flex items-center justify-center w-4 h-4 text-red-500 bg-white rounded-full hover:text-red-700"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Interests Edit Section */}
            <div className="p-6 border rounded-lg bg-card border-border">
              <h3 className="mb-4 text-lg font-semibold text-foreground">
                Edit Interests
              </h3>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add an interest..."
                    className="flex-1 px-3 py-2 text-sm bg-white border border-gray-300 rounded-md"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addItem('interests', e.target.value);
                        e.target.value = '';
                      }
                    }}
                  />
                  <button
                    onClick={(e) => {
                      const input = e.target.previousElementSibling;
                      addItem('interests', input.value);
                      input.value = '';
                    }}
                    className="px-3 py-2 text-sm transition-colors rounded-md shadow-sm bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {editData.interests.map((interest, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-2 py-1 text-sm bg-gray-100 rounded-md"
                    >
                      {interest}
                      <button
                        onClick={() => removeItem('interests', index)}
                        className="flex items-center justify-center w-4 h-4 text-red-500 bg-white rounded-full hover:text-red-700"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Job Titles Edit Section */}
            <div className="p-6 border rounded-lg bg-card border-border">
              <h3 className="mb-4 text-lg font-semibold text-foreground">
                Edit Job Titles
              </h3>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add a job title..."
                    className="flex-1 px-3 py-2 text-sm bg-white border border-gray-300 rounded-md"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addItem('job_titles', e.target.value);
                        e.target.value = '';
                      }
                    }}
                  />
                  <button
                    onClick={(e) => {
                      const input = e.target.previousElementSibling;
                      addItem('job_titles', input.value);
                      input.value = '';
                    }}
                    className="px-3 py-2 text-sm transition-colors rounded-md shadow-sm bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Add
                  </button>
                </div>
                <div className="space-y-2">
                  {editData.job_titles.map((title, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 rounded-md bg-gray-50"
                    >
                      <span className="text-sm">{title}</span>
                      <button
                        onClick={() => removeItem('job_titles', index)}
                        className="flex items-center justify-center w-4 h-4 text-red-500 bg-white rounded-full hover:text-red-700"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Industries Edit Section */}
            <div className="p-6 border rounded-lg bg-card border-border">
              <h3 className="mb-4 text-lg font-semibold text-foreground">
                Edit Industries
              </h3>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add an industry..."
                    className="flex-1 px-3 py-2 text-sm bg-white border border-gray-300 rounded-md"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addItem('industries', e.target.value);
                        e.target.value = '';
                      }
                    }}
                  />
                  <button
                    onClick={(e) => {
                      const input = e.target.previousElementSibling;
                      addItem('industries', input.value);
                      input.value = '';
                    }}
                    className="px-3 py-2 text-sm transition-colors rounded-md shadow-sm bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {editData.industries.map((industry, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-2 py-1 text-sm bg-gray-100 rounded-md"
                    >
                      {industry}
                      <button
                        onClick={() => removeItem('industries', index)}
                        className="flex items-center justify-center w-4 h-4 text-red-500 bg-white rounded-full hover:text-red-700"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <SkillsSection skills={currentUser.skills} />
            <InterestsSection interests={currentUser.interests} />
            <JobTitlesSection jobTitles={currentUser.job_titles} />
            <IndustriesSection industries={currentUser.industries} />
          </div>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
