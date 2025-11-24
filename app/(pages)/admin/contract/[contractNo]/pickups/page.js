import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const ContractPickupsPage = dynamic(
    () => import('@/templates/admin/contract/ContractPickupsPage'),
    {
        ssr: false,
    }
);

export const metadata = {
    title: 'ویستا | پیکاپ ها',
};

export default function ContractPickups({ params }) {
    return (
        <Suspense
            fallback={<div className="suspense">در حال بارگذاری ...</div>}
        >
            <ContractPickupsPage contractNo={params.contractNo} />
        </Suspense>
    );
}
