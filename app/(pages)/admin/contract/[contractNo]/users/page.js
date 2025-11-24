import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const ContractUsersPage = dynamic(
    () => import('@/templates/admin/contract/ContractUsersPage'),
    {
        ssr: false,
    }
);

export const metadata = {
    title: 'ویستا | کاربران قرارداد',
};

export default function ContractOverview({ params }) {
    return (
        <Suspense
            fallback={<div className="suspense">در حال بارگذاری ...</div>}
        >
            <ContractUsersPage contractNo={params.contractNo} />
        </Suspense>
    );
}
