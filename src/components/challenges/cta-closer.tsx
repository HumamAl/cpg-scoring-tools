import Link from "next/link";

export function CtaCloser() {
  return (
    <section className="linear-card p-6 border-primary/20 bg-gradient-to-br from-primary/5 to-background">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold mb-1">
            Ready to discuss the approach?
          </h3>
          <p className="text-sm text-muted-foreground max-w-md">
            I&apos;ve thought through the API proxy, the Clerk middleware, and how
            your existing scoring components slot in cleanly. Happy to walk through
            any of this on a call.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/proposal"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-100"
          >
            See the proposal →
          </Link>
          <span className="text-xs font-medium border border-primary/20 text-primary px-3 py-1.5 rounded-lg bg-primary/5">
            Reply on Upwork to start
          </span>
        </div>
      </div>
    </section>
  );
}
