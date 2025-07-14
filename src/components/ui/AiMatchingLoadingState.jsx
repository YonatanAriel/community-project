function AiMatchingLoadingState() {
  return (
    <div className="p-8 text-center border rounded-lg shadow-sm bg-card border-border">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 rounded-full border-muted-foreground border-t-primary animate-spin" />
        <h3 className="text-lg font-semibold text-foreground">
          Looking for suitable connections...
        </h3>
        <p className="text-muted-foreground">
          We are analyzing your request and looking for the most suitable people
        </p>
      </div>
    </div>
  );
}

export default AiMatchingLoadingState;
