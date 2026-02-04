import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Business System Cost Estimator | Free ERP/CRM Cost Calculator',
  description: 'Get instant cost estimates for your business system implementation - CRM, ERP, HRM, Accounting. Compare Odoo, Zoho, and Custom Development options.',
  keywords: 'ERP cost calculator, CRM implementation cost, Odoo pricing, Zoho pricing, business software estimate',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
