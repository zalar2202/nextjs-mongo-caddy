import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const ClientContractPaymentsPage = dynamic(
    () => import('@/templates/client/contract/ClientContractPaymentsPage'),
    {
        ssr: false,
    }
);

export const metadata = {
    title: 'ویستا | پرداخت ها',
};

export default function ContractPickups({ params }) {
    return (
        <Suspense
            fallback={<div className="suspense">در حال بارگذاری ...</div>}
        >
            <ClientContractPaymentsPage contractNo={params.contractNo} />
        </Suspense>
    );
}
