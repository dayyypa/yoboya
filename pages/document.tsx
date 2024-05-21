
import { Head, Html, Main, NextScript } from 'next/document';
import * as React from 'react';

export default function Document() {
	return (
		<Html lang="ko">
			<Head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link href="https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&display=swap" rel="stylesheet" />
				<link rel="icon" href="/favicon.ico?v=renewal" />
			</Head>
			<body className="bg-white">
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
