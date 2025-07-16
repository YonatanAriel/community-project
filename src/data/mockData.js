export const membersMockData = [
  {
    id: 1,
    user_name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    photo_url:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face',
    skills: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
    interests: ['Web Development', 'AI/ML', 'Open Source'],
    job_titles: ['Senior Frontend Developer', 'Full Stack Developer'],
    industries: ['Technology', 'E-commerce'],
    summary:
      'Passionate full-stack developer with 5+ years of experience building scalable web applications. Love working with modern JavaScript frameworks and contributing to open source projects.',
  },
  {
    id: 2,
    user_name: 'Michael Chen',
    email: 'michael.chen@email.com',
    photo_url:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    skills: ['Python', 'Django', 'PostgreSQL', 'Docker'],
    interests: ['Backend Development', 'DevOps', 'Cloud Computing'],
    job_titles: ['Backend Engineer', 'DevOps Engineer'],
    industries: ['FinTech', 'Healthcare'],
    summary:
      'Backend engineer specializing in Python and cloud infrastructure. Experienced in building robust APIs and implementing CI/CD pipelines for enterprise applications.',
  },
  {
    id: 3,
    user_name: 'Emily Rodriguez',
    email: 'emily.rodriguez@email.com',
    photo_url:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    skills: ['UI/UX Design', 'Figma', 'Adobe Creative Suite', 'Prototyping'],
    interests: ['Design Systems', 'User Research', 'Accessibility'],
    job_titles: ['UX Designer', 'Product Designer'],
    industries: ['Design Agency', 'SaaS'],
    summary:
      'Creative UX designer with a passion for creating intuitive and accessible user experiences. Skilled in design thinking methodology and cross-functional collaboration.',
  },
  {
    id: 4,
    user_name: 'David Kim',
    email: 'david.kim@email.com',
    photo_url:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    skills: ['Java', 'Spring Boot', 'Microservices', 'AWS'],
    interests: ['System Architecture', 'Scalability', 'Performance'],
    job_titles: ['Senior Java Developer', 'Software Architect'],
    industries: ['Enterprise Software', 'Banking'],
    summary:
      'Experienced Java developer with expertise in building enterprise-grade applications. Passionate about clean architecture and system design patterns.',
  },
  {
    id: 5,
    user_name: 'Lisa Wang',
    email: 'lisa.wang@email.com',
    photo_url:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    skills: ['Data Science', 'Python', 'Machine Learning', 'TensorFlow'],
    interests: ['AI/ML', 'Data Visualization', 'Statistics'],
    job_titles: ['Data Scientist', 'ML Engineer'],
    industries: ['Tech', 'Research'],
    summary:
      'Data scientist with strong background in machine learning and statistical analysis. Experienced in building predictive models and deriving insights from complex datasets.',
  },
  {
    id: 6,
    user_name: 'Alex Thompson',
    email: 'alex.thompson@email.com',
    photo_url:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    skills: ['Product Management', 'Agile', 'Analytics', 'Strategy'],
    interests: ['Product Strategy', 'Market Research', 'Innovation'],
    job_titles: ['Product Manager', 'Senior Product Manager'],
    industries: ['SaaS', 'Mobile Apps'],
    summary:
      'Strategic product manager with experience launching successful digital products. Skilled in market analysis, user research, and cross-functional team leadership.',
  },
];

export const connectionRequestsMockData = [
  {
    id: 1,
    from_user_id: 2,
    to_user_id: 1,
    reason:
      'Hi Sarah, I saw your profile and would love to connect. I think we could collaborate on some interesting projects!',
    status: 'pending',
    requested_at: '2025-01-10T10:30:00Z',
    responded_at: null,
    from_user: {
      id: 2,
      user_name: 'Michael Chen',
      email: 'michael.chen@email.com',
      photo_url:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    },
    to_user: {
      id: 1,
      user_name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      photo_url:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    },
  },
  {
    id: 2,
    from_user_id: 3,
    to_user_id: 1,
    reason:
      "Hello! I'd love to connect and discuss potential collaboration opportunities.",
    status: 'pending',
    requested_at: '2025-01-12T14:20:00Z',
    responded_at: null,
    from_user: {
      id: 3,
      user_name: 'Emily Rodriguez',
      email: 'emily.rodriguez@email.com',
      photo_url:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    },
    to_user: {
      id: 1,
      user_name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      photo_url:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    },
  },
];

export const connectionsMockData = [
  {
    id: 1,
    user: {
      id: 4,
      user_name: 'David Kim',
      email: 'david.kim@email.com',
      photo_url:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    },
    connected_at: '2025-01-05T16:45:00Z',
    status: 'connected',
  },
  {
    id: 2,
    user: {
      id: 5,
      user_name: 'Lisa Wang',
      email: 'lisa.wang@email.com',
      photo_url:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    },
    connected_at: '2025-01-08T11:20:00Z',
    status: 'connected',
  },
];
