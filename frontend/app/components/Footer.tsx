export default function Footer() {
  return (
    <footer className="bg-white dark:bg-black border-t border-gray-200 dark:border-gray-600">
      <div className="mx-auto px-4 py-4 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} LogLift. All rights reserved.
        </p>
      </div>
    </footer>
  );
}