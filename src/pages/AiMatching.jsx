import { useState, useEffect } from 'react';
import { useAiRecommendations } from '@/hooks/useAiRecommendations';
import PageHeader from '@/components/ui/PageHeader';
import AiMatchingForm from '@/components/ui/AiMatchingForm';
import AiMatchingPopup from '@/components/ui/popups/AiMatchingPopup';
import { Bot } from 'lucide-react';

function AiMatching() {
  const [showPopup, setShowPopup] = useState(false);
  const [searchCount, setSearchCount] = useState(0);
  const {
    inputText,
    recommendations,
    isLoading,
    error,
    setInputText,
    searchRecommendations,
    clearSearch,
  } = useAiRecommendations();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSearchCount((prev) => prev + 1);
    await searchRecommendations(inputText);
  };

  useEffect(() => {
    setShowPopup(false);

    return () => {
      clearSearch();
    };
  }, []);

  useEffect(() => {
    if (recommendations.length > 0 && !isLoading && searchCount > 0) {
      setShowPopup(true);
    }
  }, [recommendations, isLoading, searchCount]);
  const examples = [
    'I want to start a startup in the United States that deals with electrical products and fintech',
    'Looking for technology partners to develop an AI application for the healthcare sector',
    'I am interested in creating a professional network in the field of sustainability and renewable energy',
  ];

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleExampleClick = (example) => {
    setInputText(example);
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex-1 w-full px-8 py-8">
        <PageHeader
          title="AI Matching"
          description="Describe your goals and we'll find the right people in the community using artificial intelligence"
          icon={Bot}
        />

        <div className="space-y-6">
          <AiMatchingForm
            inputText={inputText}
            setInputText={setInputText}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            error={error}
            examples={examples}
            handleExampleClick={handleExampleClick}
          />
        </div>
      </div>

      <AiMatchingPopup
        recommendations={recommendations}
        isOpen={showPopup}
        onClose={handleClosePopup}
      />
    </div>
  );
}

export default AiMatching;
