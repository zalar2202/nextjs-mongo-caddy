import "./globals.css";
import "../styles/styles.css";
/**
 * Root layout MUST be a server component (no "use client").
 * It may export `metadata`. All client-only libs go inside <ClientProviders/>.
 */

export const metadata = {
  title: 'Omidar',
  description: 'App',
};

import ClientProviders from './providers/ClientProviders';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
