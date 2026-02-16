"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AdPlacement } from "@/components/AdSlots";
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import CodeBlock from "@/components/CodeBlock";

// export const metadata = {
//   title: "SlightURL API — Complete Developer Documentation",
//   description:
//     "Full API documentation for SlightURL URL shortener. Integrate link shortening, analytics, and management into your applications.",
// };

const NAV_ITEMS = [
  { id: "getting-started", label: "🚀 Getting Started" },
  { id: "authentication", label: "🔑 Authentication" },
  { id: "base-url", label: "🌐 Base URL" },
  { id: "headers", label: "📦 Required Headers" },
  { id: "endpoints", label: "⚡ Endpoints" },
  { id: "sdks", label: "📦 SDKs & Libraries" },
  { id: "support", label: "💬 Support" },
];

export default function APIPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      <Navbar />

      <main className="container mx-auto px-4 py-12 md:py-16">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <Badge tone="sky" className="mb-6 animate-slide-up">
            🔧 Developer API
          </Badge>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              SlightURL API
            </span>
            <span className="block mt-2">
              Powerful Integration for Developers
            </span>
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-400">
            Programmatically create, manage, and analyze short links with our
            comprehensive REST API. Perfect for developers building custom
            solutions.
          </p>
        </div>

        {/* AD PLACEMENT 1 */}
        <div className="mb-8">
          <AdPlacement
            position="API Documentation Top"
            size="728x90"
            recommended="Developer tools sponsorship"
          />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              99.9%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Uptime SLA
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">
              100ms
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Avg Response Time
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              REST
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              API Type
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">
              JSON
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Response Format
            </div>
          </div>
        </div>

        {/* ✅ scroll behavior for anchor jumps */}
        <style jsx global>{`
          html {
            scroll-behavior: smooth;
          }
          /* Navbar height offset so section title doesn't hide under sticky header */
          section[id] {
            scroll-margin-top: 110px;
          }
        `}</style>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h3 className="font-bold text-lg mb-4">API Documentation</h3>

              <nav className="space-y-2">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold mb-3">Quick Links</h4>
                <div className="space-y-2">
                  <a
                    href="#endpoints"
                    className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <span>📚 API Reference</span>
                  </a>
                  <a
                    href="#getting-started"
                    className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <span>🛠️ API Playground</span>
                  </a>
                  <a
                    href="#support"
                    className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <span>📊 API Status</span>
                  </a>
                  <a
                    href="#authentication"
                    className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <span>🔐 API Keys</span>
                  </a>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* ✅ GETTING STARTED (was missing) */}
            <section id="getting-started">
              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-4">🚀 Getting Started</h2>

                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Start using the SlightURL API in minutes. Generate an API key,
                  then call endpoints using standard HTTP requests.
                </p>

                <div className="mt-5 bg-gray-50 dark:bg-gray-900/40 p-4 rounded-xl">
                  <h4 className="font-semibold mb-2">Example (cURL)</h4>
                  <CodeBlock language="bash">
                    {`curl -X POST https://slighturl.com/api/links/create \\
  -H "Authorization: YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"longUrl":"https://example.com","alias":"custom_alias"}'`}
                  </CodeBlock>
                </div>
              </Card>
            </section>

            {/* ✅ AUTH (id fixed to match sidebar) */}
            <section id="authentication">
              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-4">🔑 Authentication</h2>

                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  SlightURL uses API keys for authentication. Every request must
                  include your API key in the request headers.
                </p>

                <h4 className="font-semibold mb-2">Authorization Header</h4>
                <CodeBlock language="http">{`Authorization: YOUR_API_KEY`}</CodeBlock>

                <div className="mt-5 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
                  <h4 className="font-semibold mb-2">How to get an API key</h4>
                  <ol className="list-decimal ml-5 text-sm space-y-1">
                    <li>Create an account or log in</li>
                    <li>Open Dashboard → API Keys</li>
                    <li>Click “Generate API Key”</li>
                    <li>Copy and store it securely</li>
                  </ol>
                </div>
              </Card>
            </section>

            {/* BASE URL */}
            <section id="base-url">
              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-4">🌐 Base URL</h2>
                <CodeBlock language="text">https://slighturl.com</CodeBlock>
              </Card>
            </section>

            {/* HEADERS */}
            <section id="headers">
              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-4">📦 Required Headers</h2>

                <CodeBlock language="http">
                  {`Authorization: YOUR_API_KEY
Content-Type: application/json
Accept: application/json`}
                </CodeBlock>
              </Card>
            </section>

            {/* ENDPOINTS (unchanged) */}
            <section id="endpoints">
              <Card className="p-8 space-y-10">
                <h2 className="text-2xl font-bold">⚡ API Endpoints</h2>

                {/* CREATE LINK */}
                <div>
                  <Badge tone="green">POST</Badge>
                  <span className="ml-2 font-mono">/api/links/create</span>

                  <p className="mt-3 text-gray-600 dark:text-gray-400">
                    Create a new short URL.
                  </p>

                  <h4 className="font-semibold mt-4">Request Body</h4>
                  <CodeBlock language="json">
                    {`{
  "longUrl": "https://example.com",
  "alias": "custom_alias",
  "expiresAt": "2026-12-31T23:59:59Z"
}`}
                  </CodeBlock>

                  <h4 className="font-semibold mt-4">Response</h4>
                  <CodeBlock language="json">
                    {`{
  "message": "Short link created",
  "code": test,
  "shortrl": "https://slighturl.com/custom_alias",
  "longUrl": longUrl,
  "linkId": "test"
}`}
                  </CodeBlock>
                </div>

                {/* ANALYTICS */}
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <Badge tone="blue">GET</Badge>
                      <span className="ml-2 font-mono">
                        /v1/links/{`{id}`}/analytics
                      </span>
                    </div>

                    {/* <h4 className="font-semibold mt-4">Response</h4>
                  <CodeBlock language="json">
                  {`{
                    "success": true,
                    "data": {
                      "total_clicks": 1542,
                      "unique_clicks": 987,
                      "countries": [
                        { "country": "US", "clicks": 650 },
                        { "country": "IN", "clicks": 420 }
                        ]
                        }
                        }`}
                        </CodeBlock> */}
                    <Badge tone="amber">Coming Soon</Badge>
                  </div>
                  <p className="mt-3 text-gray-600 dark:text-gray-400">
                    Retrieve detailed analytics for a specific short link
                    including click metrics and geographic breakdown.
                  </p>

                  <div className="mt-5 bg-amber-50 dark:bg-amber-900/20 p-5 rounded-xl border border-amber-200 dark:border-amber-800">
                    <h4 className="font-semibold mb-2 text-amber-700 dark:text-amber-400">
                      🚧 This endpoint is currently under development
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Advanced analytics including total clicks, unique clicks,
                      device data, and country breakdown will be available soon.
                    </p>
                  </div>
                </div>

                {/* LIST LINKS */}
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <Badge tone="blue">GET</Badge>
                      <span className="ml-2 font-mono">/v1/links</span>
                    </div>

                    {/* <h4 className="font-semibold mt-4">Query Parameters</h4>
                  <CodeBlock language="json">
                    {`{
  "page": 1,
  "limit": 20,
  "search": "campaign"
}`}
                  </CodeBlock> */}
                    <Badge tone="amber">Coming Soon</Badge>
                  </div>
                  <p className="mt-3 text-gray-600 dark:text-gray-400">
                    Retrieve detailed analytics for a specific short link
                    including click metrics and geographic breakdown.
                  </p>

                  <div className="mt-5 bg-amber-50 dark:bg-amber-900/20 p-5 rounded-xl border border-amber-200 dark:border-amber-800">
                    <h4 className="font-semibold mb-2 text-amber-700 dark:text-amber-400">
                      🚧 This endpoint is currently under development
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Advanced analytics including total clicks, unique clicks,
                      device data, and country breakdown will be available soon.
                    </p>
                  </div>
                </div>
              </Card>
            </section>

            {/* ✅ SDKs section (was missing) */}
            <section id="sdks">
              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-4">📦 SDKs & Libraries</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Official SDKs and libraries will be available soon. Until
                  then, you can integrate using standard HTTP requests
                  (fetch/axios/cURL).
                </p>

                <div className="mt-5 bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h4 className="font-semibold">Coming Soon</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Node.js, Python, PHP and Go SDKs.
                      </p>
                    </div>
                    <Badge tone="amber">Coming Soon</Badge>
                  </div>
                </div>
              </Card>
            </section>

            {/* ✅ Support section (was missing) */}
            <section id="support">
              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-4">💬 Support</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Need help integrating the API? Reach out to our support team
                  or check the dashboard help center.
                </p>

                <div className="flex flex-wrap gap-3">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Contact Support
                  </Button>
                  <Button variant="ghost">View Help Center</Button>
                </div>
              </Card>
            </section>
          </div>
        </div>

        {/* AD PLACEMENT 3 */}
        <div className="mt-12">
          <AdPlacement
            position="API Documentation Bottom"
            size="970x250"
            recommended="Developer hosting or tools"
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
