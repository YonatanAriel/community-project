import { useCallback } from 'react';
import { useAiRecommendationsStore } from '@/store/aiRecommendationsStore';
import { getAiRecommendations } from '@/services/apiCalls';

export const useAiRecommendations = () => {
  const store = useAiRecommendationsStore();

  const searchRecommendations = useCallback(
    async (inputText) => {
      if (!inputText.trim()) {
        store.setError('אנא הזן טקסט לחיפוש');
        return;
      }

      store.setLoading(true);
      store.setError(null);

      try {
        const response = await getAiRecommendations(inputText);
        console.log('API Response:', response);
        console.log('Response data:', response.data);
        console.log('Response recommendations:', response.recommendations);

        const recommendations =
          response.data || response.recommendations || response || [];
        console.log('Final recommendations:', recommendations);

        const enrichedRecommendations = recommendations.map((member) => ({
          ...member,
          matchScore: member.matchScore || Math.random() * 0.4 + 0.6,
          matchReason: member.matchReason || generateMatchReason(member),
        }));

        console.log('Enriched recommendations:', enrichedRecommendations);
        store.setRecommendations(enrichedRecommendations);
        store.setLastQuery(inputText);
      } catch (err) {
        store.setError('שגיאה בטעינת ההמלצות. אנא נסה שוב.');
        console.error('Error fetching AI recommendations:', err);
      } finally {
        store.setLoading(false);
      }
    },
    [store]
  );

  const clearSearch = useCallback(() => {
    store.clearRecommendations();
  }, [store]);

  return {
    ...store,
    searchRecommendations,
    clearSearch,
  };
};

const generateMatchReason = (member) => {
  const reasons = [];

  if (member.industries && member.industries.length > 0) {
    reasons.push(`עובד בתחום ${member.industries[0]}`);
  }

  if (member.skills && member.skills.length > 0) {
    reasons.push(`בעל מיומנויות ב-${member.skills.slice(0, 2).join(', ')}`);
  }

  if (member.job_titles && member.job_titles.length > 0) {
    reasons.push(`משמש כ-${member.job_titles[0]}`);
  }

  return reasons.join(' • ') || 'התאמה כללית על בסיס הפרופיל';
};
