import { Button } from '@/components/ui/button';
import { Lightbulb, Users, Target } from 'lucide-react';

function AiMatchingForm({
  inputText,
  setInputText,
  handleSubmit,
  isLoading,
  error,
  examples,
  handleExampleClick,
}) {
  return (
    <div className="p-6 bg-white border rounded-lg shadow-sm border-border">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="matchingInput"
            className="flex items-center gap-2 mb-3 text-base font-semibold text-foreground"
          >
            <Target className="w-4 h-4 text-primary" />
            Describe your goals or the type of connections you are looking for
          </label>

          <textarea
            id="matchingInput"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Write here about your goals, the field that interests you, or the type of people you want to meet..."
            className="w-full h-32 p-4 text-base leading-relaxed transition-all duration-200 border rounded-lg resize-none bg-background border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <div className="p-4 rounded-lg bg-muted">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-4 h-4 text-orange-500" />
            <h3 className="text-base font-semibold text-foreground">
              Search Examples
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
            {examples.map((example, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleExampleClick(example)}
                className="p-3 text-sm text-left transition-all duration-200 border rounded-lg text-muted-foreground bg-background border-border hover:border-primary hover:bg-muted hover:text-foreground"
              >
                &quot;{example}&quot;
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="p-4 border rounded-lg border-destructive/20 bg-destructive/10">
            <p className="font-medium text-center text-destructive">{error}</p>
          </div>
        )}

        <div className="flex justify-center">
          <Button type="submit" disabled={isLoading} className="px-8 py-2">
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-current rounded-full border-t-transparent animate-spin" />
                Searching...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Find Connections
              </div>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AiMatchingForm;
