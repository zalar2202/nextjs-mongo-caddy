'use client';

import { Provider } from 'react-redux';
import store from '@/redux/store';

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
export default ReduxProvider; // if any adapter uses default, this covers both
