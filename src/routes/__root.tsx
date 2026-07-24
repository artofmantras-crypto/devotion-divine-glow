import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Art of Mantras — Authentic Vedic Poojas from Ujjain" },
      { name: "description", content: "Book authentic Vedic poojas performed by experienced Pandits in the holy city of Ujjain. Join the 1.25 Lakh Maha Mrityunjaya Jaap this Shravan." },
      { name: "author", content: "Art of Mantras" },
      { property: "og:title", content: "Art of Mantras — Authentic Vedic Poojas from Ujjain" },
      { property: "og:description", content: "Book authentic Vedic poojas performed by experienced Pandits in the holy city of Ujjain. Join the 1.25 Lakh Maha Mrityunjaya Jaap this Shravan." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "keywords", content: "Vedic pooja, Ujjain, Mahakaal, Maha Mrityunjaya Jaap, Rudra Abhishek, Shravan, Sankalp, online pooja booking, Art of Mantras" },
      { name: "theme-color", content: "#5a1a1a" },
      { name: "twitter:title", content: "Art of Mantras — Authentic Vedic Poojas from Ujjain" },
      { name: "twitter:description", content: "Book authentic Vedic poojas performed by experienced Pandits in the holy city of Ujjain. Join the 1.25 Lakh Maha Mrityunjaya Jaap this Shravan." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/fc42498f-9f27-4343-a273-20ba0a0cf55c/id-preview-d858fedb--d38aa8cc-61bd-4429-9581-489dcab7cb06.lovable.app-1783038704555.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/fc42498f-9f27-4343-a273-20ba0a0cf55c/id-preview-d858fedb--d38aa8cc-61bd-4429-9581-489dcab7cb06.lovable.app-1783038704555.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "data:image/png;base64,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", type: "image/png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Tiro+Devanagari+Hindi&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Art of Mantras",
          alternateName: "आर्ट ऑफ मंत्र",
          description:
            "Trusted platform for authentic Vedic poojas performed by experienced Pandits in Ujjain.",
          address: {
            "@type": "PostalAddress",
            streetAddress: "AKR Tech Park, HSR Layout",
            addressLocality: "Bengaluru",
            addressCountry: "IN",
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            reviewCount: "2500",
          },
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <Toaster position="top-center" richColors />
    </QueryClientProvider>
  );
}
