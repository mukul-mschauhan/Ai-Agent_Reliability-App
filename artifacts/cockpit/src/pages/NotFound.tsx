import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <p className="text-sm text-muted-foreground">Page not found</p>
        <Link href="/">
          <a className="mt-2 text-sm text-primary hover:underline inline-block">Return to Overview</a>
        </Link>
      </div>
    </div>
  );
}
