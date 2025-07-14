import { create } from 'zustand';

export const useAiRecommendationsStore = create((set, get) => ({
  recommendations: [],
  inputText: '',
  isLoading: false,
  error: null,
  lastQuery: '',

  setInputText: (text) => set({ inputText: text }),

  setRecommendations: (recommendations) => set({ recommendations }),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  setLastQuery: (query) => set({ lastQuery: query }),

  clearRecommendations: () =>
    set({
      recommendations: [],
      inputText: '',
      error: null,
      lastQuery: '',
    }),

  clearError: () => set({ error: null }),

  getFilteredRecommendations: () => {
    const { recommendations } = get();
    return recommendations.filter((rec) => rec.matchScore > 0.3); // Filter by minimum match score
  },

  getTopRecommendations: (limit = 10) => {
    const { recommendations } = get();
    return recommendations
      .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0))
      .slice(0, limit);
  },
}));
