export function SiteFooter() {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 mt-12">
      <div className="container-page py-6 text-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-neutral-500 dark:text-neutral-400">
        <p>&copy; {new Date().getFullYear()} Danyal Khorami.</p>
        <p>
          Built with Next.js &amp; Tailwind. Focused on research systems,
          motion capture, and computational media.
        </p>
      </div>
    </footer>
  );
}
