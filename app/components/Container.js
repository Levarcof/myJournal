export default function Container({children}) {
  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col items-center">
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
}