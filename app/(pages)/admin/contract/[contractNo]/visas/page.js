import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const ContractVisasPage = dynamic(
    () => import('@/templates/admin/contract/ContractVisasPage'),
    {
        ssr: false,
    }
);

export const metadata = {
    title: 'ویستا | ویزاها',
};

export default function ContractVisas({ params }) {
    return (
        <Suspense
            fallback={<div className="suspense">در حال بارگذاری ...</div>}
        >
            <ContractVisasPage contractNo={params.contractNo} />
        </Suspense>
    );
}
