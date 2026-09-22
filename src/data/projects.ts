import jedDashboard from '../assets/jedidiahops/web/dashboard.webp'
import jedPlanning from '../assets/jedidiahops/web/planning.webp'
import jedActivity from '../assets/jedidiahops/web/activity.webp'
import jedBuyList from '../assets/jedidiahops/web/buy-list.webp'
import jedPurchaseOrder from '../assets/jedidiahops/web/purchase-order.webp'
import jedQuotes from '../assets/jedidiahops/web/quotes.webp'
import jedQuotePdf from '../assets/jedidiahops/web/quote-pdf.webp'
import jedProduct from '../assets/jedidiahops/web/product.webp'
import jedTranslations from '../assets/jedidiahops/web/translations.webp'
import jedMobileActivity from '../assets/jedidiahops/mobile/activity.webp'
import jedMobileJobs from '../assets/jedidiahops/mobile/jobs.webp'
import jedMobileQuotes from '../assets/jedidiahops/mobile/quotes.webp'
import jedMobileProduct from '../assets/jedidiahops/mobile/product.webp'
import jedMobile from '../assets/jedidiahops/mobile/job-progress.webp'
import jedStock from '../assets/jedidiahops/mobile/stock-movements.webp'
import jedDocument from '../assets/jedidiahops/mobile/document.webp'
import edgeChart from '../assets/edge/screenshot-1.webp'
import edgeScanner from '../assets/edge/screenshot-2.webp'
import edgePortfolio from '../assets/edge/screenshot-3.webp'
import k53Study from '../assets/k53/screen-study-home.webp'
import k53StudyDetail from '../assets/k53/screen-study-detail.webp'
import k53QuizDashboard from '../assets/k53/screen-quiz-dashboard.webp'
import k53Quiz from '../assets/k53/screen-quiz-question.webp'
import k53Test from '../assets/k53/screen-test-question.webp'
import k53Profile from '../assets/k53/screen-profile.webp'

export interface Screenshot {
  src: string
  label: string
  mobile?: boolean
}

export interface Project {
  slug: string
  name: string
  category: string
  period: string
  role: string
  summary: string
  proof: string
  stack: string[]
  context: string
  ownership: string
  decisions: { title: string; body: string }[]
  delivered: string
  screenshots: Screenshot[]
  links: { label: string; url: string }[]
}

export const projects: Project[] = [
  {
    slug: 'jedidiahops',
    name: 'JedidiahOps',
    category: 'Business operations',
    period: 'May 2026 - present',
    role: 'Full-stack engineer / Contract',
    summary: 'Connecting quotes, production planning and inventory across a manufacturing business. Built across web, mobile, API and data.',
    proof: 'One connected workflow, from quotation to shop floor.',
    stack: ['React', 'React Native', 'Node.js', 'tRPC', 'PostgreSQL'],
    context: 'An agricultural equipment manufacturer needs quotes, production jobs, materials and shop-floor progress to stay connected. Working directly with the business, I have grown JedidiahOps from a web admin system into a platform for those day-to-day operations.',
    ownership: 'I own delivery across the React interface, Fastify/tRPC API, PostgreSQL data model and Expo mobile app, translating operating requirements into working software.',
    decisions: [
      { title: 'Keep the business workflow connected', body: 'Quotes feed production jobs; jobs connect to planning, material commitments and procurement. A shared API and data model keep the web and mobile clients working from the same rules.' },
      { title: 'Separate businesses without doubling operations', body: 'Equipment and contracting share one platform, with separate PostgreSQL schemas, permissions and business modules. Enforced import boundaries keep the domains apart while common infrastructure stays shared.' },
      { title: 'Make permissions apply to the assistant too', body: 'The assistant exposes tools according to the caller’s permissions. Server-side access rules remain the boundary for business operations, with tests covering which tools each role can use.' },
      { title: 'Treat inventory history as business data', body: 'Inventory includes receipts, returns, stocktakes and job costing. Explicit costing rules and regression tests cover moving averages and the treatment of historical stock movements.' },
    ],
    delivered: 'The platform spans quoting, bay-by-bay planning, inventory, purchasing and shop-floor mobile workflows. It also includes branded PDFs, a bilingual product website and an AI assistant. Contracting adds machine-hour capture and offline mobile reading sync.',
    screenshots: [
      { src: jedDashboard, label: 'Operations dashboard' },
      { src: jedPlanning, label: 'Bay-by-bay production planning' },
      { src: jedActivity, label: 'Job activity timeline' },
      { src: jedBuyList, label: 'Material shortages and procurement' },
      { src: jedPurchaseOrder, label: 'Purchase order editor' },
      { src: jedQuotes, label: 'Product and service quotes' },
      { src: jedQuotePdf, label: 'Branded quotation PDF' },
      { src: jedProduct, label: 'Product catalogue and publishing' },
      { src: jedTranslations, label: 'English and Afrikaans translations' },
      { src: jedMobileActivity, label: 'Shop-floor activity feed', mobile: true },
      { src: jedMobileJobs, label: 'Active and scheduled jobs', mobile: true },
      { src: jedMobileQuotes, label: 'Mobile quote pipeline', mobile: true },
      { src: jedMobileProduct, label: 'Mobile product details and website links', mobile: true },
      { src: jedMobile, label: 'Mobile job progress', mobile: true },
      { src: jedStock, label: 'Mobile stock movements', mobile: true },
      { src: jedDocument, label: 'Engineering drawings and bill of materials', mobile: true },
    ],
    links: [{ label: 'Explore the source', url: 'https://github.com/Jedidiah-Equipment/jedidiah-platform' }],
  },
  {
    slug: 'edge',
    name: 'Edge Trading Platform',
    category: 'Real-time systems',
    period: 'Oct 2024 - Jun 2026',
    role: 'Senior Software Engineer',
    summary: 'Live market discovery, trading charts and portfolio workflows, built across React interfaces and real-time APIs.',
    proof: 'High-frequency data, made usable.',
    stack: ['React', 'TypeScript', 'Node.js', 'Kafka', 'RisingWave'],
    context: 'A crypto trading platform brings rapidly changing market data into discovery feeds, charts, watchlists and order workflows. The challenge is to keep those interfaces useful and responsive as the underlying data changes.',
    ownership: 'As a senior engineer in a small international team, I built key frontend, API and real-time data surfaces, collaborating with backend, data and product colleagues.',
    decisions: [
      { title: 'Control the flow of live updates', body: 'Discovery subscriptions batch events, deduplicate updates by trading pair and compress outgoing payloads. They avoid emitting updates when no clients are subscribed, limiting unnecessary work in the live data path.' },
      { title: 'Keep busy interfaces responsive', body: 'Virtualized lists and tables, memoized cells and batched live updates support data-heavy screens. Zustand and TanStack Query handle client state and server-backed data across the trading experience.' },
      { title: 'Connect market data to charting', body: 'TradingView integrates with custom OHLC APIs for swap-derived candlesticks, live updates, saved layouts and token/order overlays, connecting chart interaction to the wider product.' },
    ],
    delivered: 'Delivered trading, scanner and discovery views alongside charting, watchlist, wallet and order-update workflows. The screenshots here document the product during my time at Edge.',
    screenshots: [
      { src: edgeChart, label: 'Trading chart and market data' },
      { src: edgeScanner, label: 'Scanner and discovery interface' },
      { src: edgePortfolio, label: 'Portfolio and trading workflows' },
    ],
    links: [{ label: 'Edge on X', url: 'https://x.com/EdgeTrade' }],
  },
  {
    slug: 'k53-study-guide',
    name: 'K53 Study Guide',
    category: 'Independent product',
    period: '2018 - present',
    role: 'Creator and sole developer',
    summary: 'A mobile learning product built and operated end-to-end, from study and mock tests to purchases and store releases.',
    proof: '100K+ Android downloads.',
    stack: ['React', 'Ionic', 'Capacitor', 'Firebase', 'RevenueCat'],
    context: 'K53 Study Guide helps South African learners prepare for their learner’s licence test with focused study material, quizzes, mock tests and progress tracking.',
    ownership: 'I built and maintain the product independently: app architecture, mobile UI, native integrations, premium purchases, analytics, the landing website and Android/iOS release maintenance.',
    decisions: [
      { title: 'Share the product across platforms', body: 'React and Ionic provide the app interface, with Capacitor connecting to native Android and iOS capabilities. Study progress, quizzes and mock tests sit within a shared product codebase.' },
      { title: 'Protect existing premium customers', body: 'The RevenueCat purchase integration includes legacy purchase synchronisation and safeguards that preserve existing premium access if synchronisation fails. Regression tests cover those migration cases.' },
      { title: 'Make the product observable', body: 'Firebase/GA4 events cover engagement and the premium purchase funnel, with Crashlytics for mobile error monitoring. Release work includes native configuration, signing and store requirements.' },
    ],
    delivered: 'A maintained Android and iOS learning app with more than 100,000 Android downloads. Product ownership extends beyond feature delivery to monetisation, analytics, store compliance and ongoing releases.',
    screenshots: [
      { src: k53Study, label: 'Study topics and progress', mobile: true },
      { src: k53Quiz, label: 'Practice quiz', mobile: true },
      { src: k53StudyDetail, label: 'Study detail', mobile: true },
      { src: k53QuizDashboard, label: 'Quiz dashboard', mobile: true },
      { src: k53Test, label: 'Mock learner’s test', mobile: true },
      { src: k53Profile, label: 'Profile and progress', mobile: true },
    ],
    links: [
      { label: 'Product website', url: 'https://k53studyguide.online/' },
      { label: 'Google Play', url: 'https://play.google.com/store/apps/details?id=deanvniekerk.k53studyguide.app' },
      { label: 'App Store', url: 'https://apps.apple.com/us/app/k53-study-guide/id6784718443' },
      { label: 'Explore the source', url: 'https://github.com/deanvanniekerk/k53studyguide' },
    ],
  },
]

export const resumeUrl = '/Dean-van-Niekerk-Resume.pdf'
export const emailUrl = 'mailto:dean@vanniekerk.online?subject=Senior%20full-stack%20engineering%20opportunity'
