function EmptyState({ message = "No analytics data available yet." }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
      <p className="text-sm">{message}</p>
    </div>
  );
}

export default EmptyState;
