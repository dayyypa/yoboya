import {
	ChatBubbleLeftEllipsisIcon,
	DocumentMagnifyingGlassIcon,
	FaceSmileIcon,
	HomeIcon
} from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';
import { PropsWithChildren } from 'react';
import { cls } from '../libs/utility';

interface LayoutProps extends PropsWithChildren {
	//
}

export const Layout = ({ children }: LayoutProps) => {
	const router = useRouter();

	return (
		<div className="w-full">
			<div className="flex justify-center w-full">
				<div className="flex flex-col w-full">
					<div className="w-full max-w-[640px] mx-auto">{children}</div>
					<div className="fixed inset-x-0 bottom-0 w-full h-[70px] border-t border-gray-200 bg-white z-10">
						<div className="grid w-full max-w-[640px] h-full grid-cols-4 mx-auto">
							<NaviButton
								type="home"
								onButtonClicked={() => router.push('/')}
								selected={router.asPath === '/'}
							/>
							<NaviButton
								type="fac"
								onButtonClicked={() => router.push('/fac')}
								selected={router.asPath.includes('/fac')}
							/>
							<NaviButton
								type="advice"
								onButtonClicked={() => router.push('/advice')}
								selected={router.asPath.includes('/advice')}
							/>
							<NaviButton
								type="my"
								onButtonClicked={() => router.push('/my')}
								selected={router.asPath.includes('/my')}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

interface NaviButtonProps {
	type: 'home' | 'fac' | 'advice' | 'my';
	selected: boolean;
	onButtonClicked: () => void;
}
const NaviButton = ({ type, selected, onButtonClicked }: NaviButtonProps) => {
	return (
		<button
			className={cls(
				'flex flex-col items-center justify-center h-full',
				selected ? 'text-orange-400' : 'text-zinc-300'
			)}
			onClick={onButtonClicked}
		>
			{type === 'home' ? (
				<HomeIcon className={cls('w-8 h-8', selected ? '' : '')} />
			) : type === 'fac' ? (
				<DocumentMagnifyingGlassIcon className="w-8 h-8" />
			) : type === 'advice' ? (
				<ChatBubbleLeftEllipsisIcon className="w-8 h-8" />
			) : (
				<FaceSmileIcon className="w-8 h-8" />
			)}
			<span className={cls('text-[13px] font-semibold pt-1')}>
				{type === 'home' ? '홈' : type === 'fac' ? '시설찾기' : type === 'advice' ? '상담' : 'My'}
			</span>
		</button>
	);
};
