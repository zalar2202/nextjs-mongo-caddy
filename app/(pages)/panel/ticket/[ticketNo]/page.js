import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const ClientViewTicketPage = dynamic(
    () => import('@/templates/client/ClientViewTicketPage'),
    {
        ssr: false,
    }
);

export const metadata = {
    title: 'ویستا | جزییات تیکت',
};

export default function ClientViewTicket({ params }) {
    return (
        <Suspense
            fallback={<div className="suspense">در حال بارگذاری ...</div>}
        >
            <ClientViewTicketPage ticketNo={params.ticketNo} />
        </Suspense>
    );
}
