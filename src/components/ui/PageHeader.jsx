import { Users } from 'lucide-react';

function PageHeader({ title, description }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        <Users size={32} className="text-primary" />
        <h1 className="text-3xl font-bold text-foreground">{title}</h1>
      </div>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

export default PageHeader;
