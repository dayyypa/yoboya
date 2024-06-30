import {
	ChatBubbleLeftEllipsisIcon,
	DocumentMagnifyingGlassIcon,
	FaceSmileIcon,
	HomeIcon
} from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';
import { PropsWithChildren, useEffect } from 'react';
import { cls } from '../libs/utility';
import { atom, useRecoilState } from 'recoil';
import { supabase } from '../libs/supabaseClient';
import { loginUserState } from '../libs/store';
import Toast from '../components/toast';

interface LayoutProps extends PropsWithChildren {
	//
	hideNavigation?: boolean;
}

export const Layout = ({ children, hideNavigation = false }: LayoutProps) => {
	const router = useRouter();
	const [loginUser, setLoginUser] = useRecoilState(loginUserState);
	const [toastState, setToastState] = useRecoilState(ToastState);

	//토스트
	useEffect(() => {
		if (toastState.isShown) {
			let timer = setTimeout(() => {
				setToastState((prev) => ({ ...prev, isShown: false }));
			}, toastState?.setTime ?? 1500);

			return () => {
				clearTimeout(timer);
			};
		}
	}, [toastState, setToastState]);

	useEffect(() => {
		if (loginUser) {
			return;
		}

		const checkUserProfile = async (user: any) => {
			const { data, error } = await supabase.from('profile').select('nickname').eq('user_id', user.id).single();
			console.log('checkUserProfile', data, error);
			if (error || !data.nickname) {
				router.push('/set-profile'); // 닉네임 설정 페이지로 리다이렉트
			} else {
				setLoginUser({
					...user,
					nickname: data.nickname
				});
				// router.push('/'); // 메인 페이지로 리다이렉트
			}
		};

		const { data } = supabase.auth.onAuthStateChange((event, session) => {
			console.log('dddd', session?.user);
			if (session?.user) {
				setLoginUser(session.user);
				checkUserProfile(session.user);
			} else {
				setLoginUser(null);
			}
		});

		return () => {
			data.subscription.unsubscribe();
		};
	}, [loginUser]);

	return (
		<>
			<div className="w-full">
				<div className="flex justify-center w-full">
					<div className="relative flex flex-col w-full">
						<div className="w-full laptop:marker:max-w-[640px] mx-auto">{children}</div>
						{!hideNavigation && (
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
						)}
					</div>
				</div>
			</div>
			{toastState.isShown && (
				<div className={cls('fixed inset-0', toastState?.providedContainerStyle)}>
					<div className="flex items-center justify-center w-full h-full">
						<Toast
							title={toastState?.message}
							isErrorStyle={toastState?.isErrorStyle}
							providedStyle={toastState?.providedStyle ?? ''}
						/>
					</div>
				</div>
			)}
		</>
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
				<HomeIcon className={cls('w-8 h-8')} />
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

//TOAST
export interface ToastStateProps {
	isShown: boolean;
	message: string;
	isErrorStyle?: boolean;
	providedContainerStyle?: string;
	providedStyle?: string;
	setTime?: number;
}
export const ToastState = atom({
	key: `ToastStateKey`,
	default: {
		isShown: false,
		message: ''
	} as ToastStateProps
});