import { faBuilding, faFile, faHeart, faMessage, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faAngleRight, faBookBookmark, faGift, faPhone, faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signInWithGoogle, supabase } from '../../libs/supabaseClient';
import { useRecoilState } from 'recoil';
import { loginUserState } from '../../libs/store';

const MyIndexPage = () => {
	const [loginUser] = useRecoilState(loginUserState);

	const handleSignInClick = () => {
		signInWithGoogle();
	};

	const handleSignOutClick = () => {
		supabase.auth.signOut().then(() => {
			window.location.reload();
		});
	};

	return (
		<div className="flex flex-col pt-3">
			<div className="text-[20px] font-semibold">YoBoYa</div>
			<div className="flex flex-col space-y-5 mt-[45px]">
				{!loginUser && (
					<>
						<div className="flex flex-col items-center">
							<div className="font-semibold">
								지금 <span className="text-blue-500">요보야</span>에서
							</div>
							<div className="font-semibold">
								<span className="text-blue-500">요양상담</span>을 시작하세요!
							</div>
						</div>
						<button
							className="py-3 font-semibold text-white bg-blue-500 rounded-12 hover:bg-blue-400"
							onClick={handleSignInClick}
						>
							로그인/회원가입
						</button>
					</>
				)}
				<div className="flex font-semibold ">
					<div className="flex flex-col items-center justify-center w-1/4 p-4 space-y-3 rounded-12 cursor-pointer hover:bg-gray-100">
						<FontAwesomeIcon icon={faHeart} className="w-9 h-9" />
						<div>찜한 목록</div>
					</div>
					<div className="flex flex-col items-center justify-center w-1/4 p-4 space-y-3 rounded-12 cursor-pointer hover:bg-gray-100">
						<FontAwesomeIcon icon={faBuilding} className="w-9 h-9" />
						<div>최근 본 시설</div>
					</div>
					<div className="flex flex-col items-center justify-center w-1/4 p-4 space-y-3 rounded-12 cursor-pointer hover:bg-gray-100">
						<FontAwesomeIcon icon={faMessage} className="w-9 h-9" />
						<div>나의 상담</div>
					</div>
					<div className="flex flex-col items-center justify-center w-1/4 p-4 space-y-3 rounded-12 cursor-pointer hover:bg-gray-100">
						<FontAwesomeIcon icon={faPenToSquare} className="w-9 h-9" />
						<div>나의 후기</div>
					</div>
				</div>
				<div className="w-full h-[2px] bg-zinc-200"></div>
			</div>

			<div className="flex flex-col  mt-[60px] space-y-3 cursor-pointer">
				<div className="flex justify-between p-5 rounded-12 hover:bg-gray-100">
					<div className="flex items-center space-x-3">
						<FontAwesomeIcon icon={faVolumeHigh} className="w-7 h-7" />
						<div className="text-[18px] font-semibold">공지사항</div>
					</div>
					<FontAwesomeIcon icon={faAngleRight} className="w-5 h-5 text-gray-400" />
				</div>
				<div className="flex justify-between p-5 rounded-12 hover:bg-gray-100">
					<div className="flex items-center space-x-3">
						<FontAwesomeIcon icon={faGift} className="w-7 h-7" />
						<div className="text-[18px] font-semibold">이벤트</div>
					</div>
					<FontAwesomeIcon icon={faAngleRight} className="w-5 h-5 text-gray-400" />
				</div>
				<div className="flex justify-between p-5 rounded-12 hover:bg-gray-100">
					<div className="flex items-center space-x-3">
						<FontAwesomeIcon icon={faBookBookmark} className="w-7 h-7" />
						<div className="text-[18px] font-semibold">요보야 이용가이드</div>
					</div>
					<FontAwesomeIcon icon={faAngleRight} className="w-5 h-5 text-gray-400" />
				</div>
				<div className="flex justify-between p-5 rounded-12 hover:bg-gray-100">
					<div className="flex items-center space-x-3">
						<FontAwesomeIcon icon={faFile} className="w-7 h-7" />
						<div className="text-[18px] font-semibold">약관 및 정책</div>
					</div>
					<FontAwesomeIcon icon={faAngleRight} className="w-5 h-5 text-gray-400" />
				</div>
				<div className="flex justify-between p-5 rounded-12 hover:bg-gray-100">
					<div className="flex items-center space-x-3">
						<FontAwesomeIcon icon={faPhone} className="w-7 h-7" />
						<div className="text-[18px] font-semibold">고객센터</div>
					</div>
					<FontAwesomeIcon icon={faAngleRight} className="w-5 h-5 text-gray-400" />
				</div>
				{!!loginUser && (
					<button
						className="p-3 text-right text-[14px] text-zinc-400 hover:underline"
						onClick={handleSignOutClick}
					>
						로그아웃
					</button>
				)}
			</div>
		</div>
	);
};

export default MyIndexPage;
