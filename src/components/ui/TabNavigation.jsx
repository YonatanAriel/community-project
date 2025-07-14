import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

function TabNavigation({ tabs, activeTab, onTabChange }) {
  const TabButton = ({ tab, isActive, onClick }) => (
    <Button
      variant={isActive ? 'default' : 'outline'}
      onClick={onClick}
      className="flex items-center gap-2"
    >
      <tab.icon size={16} />
      {tab.label}
      {tab.count > 0 && (
        <Badge variant="secondary" className="ml-1">
          {tab.count}
        </Badge>
      )}
    </Button>
  );

  return (
    <div className="flex gap-2 p-1 border rounded-lg bg-muted w-full">
      {tabs.map((tab) => (
        <TabButton
          key={tab.id}
          tab={tab}
          isActive={activeTab === tab.id}
          onClick={() => onTabChange(tab.id)}
        />
      ))}
    </div>
  );
}

export default TabNavigation;
