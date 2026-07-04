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
import { Toaster } from "sonner";
import { getCompany } from "@/lib/company.functions";
import { COMPANY_FALLBACK } from "@/lib/site-content.types";



function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-navy">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-zinc-500">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-brand px-4 py-2 text-sm font-medium text-white transition hover:brightness-110"
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
    <div className="flex min-h-screen items-center justify-center bg-surface px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight">This page didn't load</h1>
        <p className="mt-2 text-sm text-zinc-500">
          Something went wrong. Try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-brand px-4 py-2 text-sm font-medium text-white transition hover:brightness-110"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-white px-4 py-2 text-sm font-medium"
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
      { title: "Premium Residential Plots & Land" },
      {
        name: "description",
        content:
          "RERA-approved residential plots, gated communities and farmland across southern India. Book a free site visit.",
      },
      { property: "og:title", content: "Premium Residential Plots & Land" },
      {
        property: "og:description",
        content:
          "Infrastructure-ready land parcels with clear titles. Book a guided site visit.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Premium Residential Plots & Land" },
      { name: "description", content: "Azure Homes Showcase is a modern real estate developer website for displaying properties and managing client interactions." },
      { property: "og:description", content: "Azure Homes Showcase is a modern real estate developer website for displaying properties and managing client interactions." },
      { name: "twitter:description", content: "Azure Homes Showcase is a modern real estate developer website for displaying properties and managing client interactions." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/1e8d25d1-92b2-42c6-b157-db7947b30234/id-preview-4d67a517--31959a6d-fea4-412c-b1ff-66ba84a4ccd1.lovable.app-1782920116784.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/1e8d25d1-92b2-42c6-b157-db7947b30234/id-preview-4d67a517--31959a6d-fea4-412c-b1ff-66ba84a4ccd1.lovable.app-1782920116784.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  loader: async ({ context: { queryClient } }) => {
    const companyQuery = queryOptions({
      queryKey: ["company"],
      queryFn: async () => (await getCompany()) ?? COMPANY_FALLBACK,
      staleTime: 5 * 60 * 1000,
    });
    await queryClient.ensureQueryData(companyQuery);
  },
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
  const company = Route.useLoaderData();
  queryClient.setQueryData(["company"], company);

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <Toaster position="top-center" richColors />
    </QueryClientProvider>
  );
}

