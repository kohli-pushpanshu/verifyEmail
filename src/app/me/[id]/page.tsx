'use client';
type PageProps = {
  params: {
    id: number;
  };
};

export default function ProfilePage({ params }: PageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 flex items-center justify-center px-4">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl max-w-md w-full p-8 sm:p-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-4">
          Profile Page
        </h1>

        <h2 className="text-xl font-medium text-gray-800 dark:text-gray-300">
          User ID: <span className="font-mono text-pink-600">{params.id}</span>
        </h2>

        <p className="mt-6 text-sm text-gray-600 dark:text-gray-400">
          This is a dynamic route for viewing a users profile by ID.
        </p>
      </div>
    </div>
  );
}
