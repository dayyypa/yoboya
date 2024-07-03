import {
	faBuilding,
	faFile,
	faHeart,
	faMessage,
	faPenToSquare,
	IconDefinition
} from '@fortawesome/free-regular-svg-icons';
import { faAngleRight, faBookBookmark, faGift, faPhone, faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signInWithGoogle, supabase } from '../../libs/supabaseClient';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { loginUserState, needLoginState } from '../../libs/store';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { BasicPopup } from '../../components/basicPopup';

const MyIndexPage = () => {
	const router = useRouter();
	const [loginUser] = useRecoilState(loginUserState);
	const setNeedLogin = useSetRecoilState(needLoginState);

	const [showConfirmCenter, setShowConfirmCenter] = useState(false);

	const handleSignInClick = () => {
		signInWithGoogle();
	};

	const handleSignOutClick = () => {
		supabase.auth.signOut().then(() => {
			window.location.reload();
		});

		const googleLogoutUrl = 'https://accounts.google.com/Logout';
		const win = window.open(googleLogoutUrl, '_blank');
		if (win) {
			win.close();
		}
	};

	return (
		<div className="flex flex-col pt-3 pb-[90px]">
			<div className="text-[20px] font-semibold sm:px-4">YoBoYa</div>
			<div className="flex flex-col mt-2 sm:px-4">
				{!loginUser ? (
					<>
						<div className="flex flex-col items-center">
							<div className="font-semibold">
								지금 <span className="text-orange-400">요보야</span>에서
							</div>
							<div className="font-semibold">
								<span className="text-orange-400">요양상담</span>을 시작하세요!
							</div>
						</div>
						<button
							className="py-3 mt-5 font-semibold text-white bg-orange-400 rounded-12 hover:bg-orange-500"
							onClick={handleSignInClick}
						>
							로그인/회원가입
						</button>
					</>
				) : (
					<>
						<div className="flex flex-col">
							<div className="text-13 text-zinc-600">
								😇{' '}
								<span className="text-orange-400 text-15 font-weight-600">{loginUser?.nickname}</span>
								님, 반갑습니다!
							</div>
						</div>
					</>
				)}
				<div className="grid grid-cols-2 mt-5 font-semibold sm:py-4">
					<MyShortCutItem
						icon={faHeart}
						title={'찜한 목록'}
						onClick={() => {
							if (loginUser?.id) {
								router.push('/fac/liked');
							} else {
								setNeedLogin(true);
							}
						}}
					/>
					<MyShortCutItem
						icon={faMessage}
						title={'나의 상담'}
						onClick={() => {
							if (loginUser?.id) {
								router.push('/advice/my');
							} else {
								setNeedLogin(true);
							}
						}}
					/>
				</div>
				<div className="w-full h-[2px] bg-zinc-200"></div>
			</div>
			<div className="flex flex-col  mt-[60px] space-y-3 cursor-pointer sm:px-4">
				<MySettingItem
					icon={faVolumeHigh}
					title={'공지사항'}
					onClick={() => {
						alert('공지사항 페이지로 이동합니다');
					}}
				/>
				<MySettingItem
					icon={faGift}
					title={'이벤트'}
					onClick={() => {
						alert('이벤트 페이지로 이동합니다');
					}}
				/>
				<MySettingItem
					icon={faBookBookmark}
					title={'요보야 이용가이드'}
					onClick={() => {
						alert('이용가이드 페이지로 이동합니다');
					}}
				/>
				<MySettingItem
					icon={faFile}
					title={'약관 및 정책'}
					onClick={() => {
						alert('약관 및 정책 페이지로 이동합니다');
					}}
				/>
				<MySettingItem
					icon={faPhone}
					title={'고객센터'}
					onClick={() => {
						setShowConfirmCenter(true);
					}}
				/>
				{!!loginUser && (
					<button
						className="p-3 text-right text-[14px] text-zinc-400 hover:underline"
						onClick={handleSignOutClick}
					>
						로그아웃
					</button>
				)}
			</div>
			{showConfirmCenter && (
				<BasicPopup
					title="고객센터로 이동합니다"
					content="카카오톡 고객센터로 이동해요 :)"
					onLeftButtonClicked={() => setShowConfirmCenter(false)}
					onRightButtonClicked={() => {
						setShowConfirmCenter(false);
						alert('카카오톡 고객센터 연결');
					}}
				/>
			)}
		</div>
	);
};

export default MyIndexPage;

interface MyShortCutItemProps {
	icon: IconDefinition;
	title: string;
	onClick: () => void;
}
const MyShortCutItem = ({ icon, title, onClick }: MyShortCutItemProps) => {
	return (
		<div
			className="flex flex-col items-center justify-center p-4 space-y-3 cursor-pointer rounded-12 hover:bg-gray-100 hover:scale-95"
			onClick={onClick}
		>
			<FontAwesomeIcon icon={icon} className="w-9 h-9" />
			<div>{title}</div>
		</div>
	);
};

interface MySettingItemProps {
	icon: IconDefinition;
	title: string;
	onClick: () => void;
}
const MySettingItem = ({ icon, title, onClick }: MySettingItemProps) => {
	return (
		<div className="flex justify-between p-5 rounded-12 hover:bg-gray-100" onClick={onClick}>
			<div className="flex items-center space-x-3">
				<FontAwesomeIcon icon={icon} className="w-7 h-7" />
				<div className="text-[18px] font-semibold">{title}</div>
			</div>
			<FontAwesomeIcon icon={faAngleRight} className="w-5 h-5 text-gray-400" />
		</div>
	);
};
