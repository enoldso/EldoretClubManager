import ThemeToggle from '../ThemeToggle';

export default function ThemeToggleExample() {
  return (
    <div className="p-6">
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <p className="text-sm text-muted-foreground">Click to toggle between light and dark mode</p>
      </div>
    </div>
  );
}
