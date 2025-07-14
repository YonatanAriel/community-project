import { useAiRecommendations } from '@/hooks/useAiRecommendations';
import PageHeader from '@/components/ui/PageHeader';
import AiMatchingForm from '@/components/ui/AiMatchingForm';
import AiMatchingResults from '@/components/ui/AiMatchingResults';
import AiMatchingLoadingState from '@/components/ui/AiMatchingLoadingState';

function AiMatching() {
  const {
    inputText,
    recommendations,
    isLoading,
    error,
    setInputText,
    searchRecommendations,
  } = useAiRecommendations();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await searchRecommendations(inputText);
  };

  const examples = [
    'I want to start a startup in the United States that deals with electrical products and fintech',
    'Looking for technology partners to develop an AI application for the healthcare sector',
    'I am interested in creating a professional network in the field of sustainability and renewable energy',
  ];

  const handleExampleClick = (example) => {
    setInputText(example);
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex-1 w-full px-8 py-8">
        <PageHeader
          title="AI Matching"
          description="Describe your goals and we'll find the right people in the community using artificial intelligence"
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

          {recommendations.length > 0 && (
            <AiMatchingResults recommendations={recommendations} />
          )}

          {isLoading && <AiMatchingLoadingState />}
        </div>
      </div>
    </div>
  );
}

export default AiMatching;
