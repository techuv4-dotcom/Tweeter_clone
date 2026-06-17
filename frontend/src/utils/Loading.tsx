const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-black z-50">
      <div className="flex flex-col items-center gap-4">
        {/* Logo */}
        <div className="text-4xl font-bold animate-pulse">🐦</div>

        {/* Spinner */}
        <div className="w-10 h-10 border-4 border-gray-300 border-t-black dark:border-zinc-700 dark:border-t-white rounded-full animate-spin" />

        <p className="text-gray-500 dark:text-gray-400 text-sm">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
