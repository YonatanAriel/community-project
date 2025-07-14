function UserAvatar({ user, size = 'md' }) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return (
    <img
      src={user.photo_url}
      alt={user.user_name}
      className={`object-cover rounded-full ${sizeClasses[size]}`}
    />
  );
}

export default UserAvatar;
