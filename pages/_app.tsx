import '../styles/global.css';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactElement, ReactNode } from 'react';
import React from 'react';
import { NextPage } from 'next';
import { Layout } from '../components/layout';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 3000, // 1초
			cacheTime: 1 * 60 * 1000 // 10분
		}
	}
});

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
	const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);
	

	return (
		<QueryClientProvider client={queryClient}>
			<RecoilRoot>
                {getLayout(<Component {...pageProps} />)}
			</RecoilRoot>
		</QueryClientProvider>
	);
}

export type NextPageWithLayout = NextPage & {
	getLayout?: (page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};
