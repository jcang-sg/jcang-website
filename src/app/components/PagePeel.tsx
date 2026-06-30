/**
 * Decorative folded-corner peel in the bottom-right. Purely decorative.
 */
export default function PagePeel() {
  return (
    <div
      aria-hidden="true"
      className="page-peel fixed bottom-0 right-0 z-40 hidden h-16 w-16 sm:block"
    >
      <div className="page-peel-fold absolute bottom-0 right-0 h-10 w-10 rounded-tl-sm border-l border-t border-border" />
    </div>
  );
}
