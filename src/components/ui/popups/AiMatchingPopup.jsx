import { createPortal } from 'react-dom';
import AiMatchingHeader from './AiMatchingHeader';
import AiMatchingCard from './AiMatchingCard';

function AiMatchingPopup({ recommendations, onClose, isOpen }) {
  if (!isOpen || !recommendations || recommendations.length === 0) return null;

  const handleClose = () => {
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={handleBackdropClick}
    >
      <div
        className="max-w-6xl w-full max-h-[90vh] bg-background rounded-lg border border-border shadow-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <AiMatchingHeader
          recommendationsCount={recommendations.length}
          onClose={handleClose}
        />

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recommendations.map((member) => (
              <AiMatchingCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default AiMatchingPopup;
