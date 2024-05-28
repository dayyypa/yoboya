import { faBuilding, faFile, faHeart, faMessage, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import {
	faAngleRight,
	faBookBookmark,
	faChevronLeft,
	faGift,
	faPhone,
	faVolumeHigh
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MyIndexPage = () => {
	return (
		<div className="flex flex-col pt-3">
			<div className="text-[20px] font-semibold">YoBoYa</div>
			<div className="flex flex-col space-y-5 mt-[45px]">
				<div className="flex flex-col items-center">
					<div className="font-semibold">
						지금 <span className="text-blue-500">요보야</span>에서
					</div>
					<div className="font-semibold">
						<span className="text-blue-500">요양상담</span>을 시작하세요!
					</div>
				</div>
				<button className="bg-blue-500 hover:bg-blue-400 text-white py-3 rounded-lg font-semibold ">
					로그인/회원가입
				</button>
				<div className="flex font-semibold ">
					<div className="flex flex-col items-center justify-center space-y-3 hover:bg-gray-100 rounded-lg p-4 cursor-pointer w-1/4">
						<FontAwesomeIcon icon={faHeart} className="w-9 h-9" />
						<div>찜한 목록</div>
					</div>
					<div className="flex flex-col items-center justify-center space-y-3 hover:bg-gray-100 rounded-lg p-4 cursor-pointer w-1/4">
						<FontAwesomeIcon icon={faBuilding} className="w-9 h-9" />
						<div>최근 본 시설</div>
					</div>
					<div className="flex flex-col items-center justify-center space-y-3 hover:bg-gray-100 rounded-lg p-4 cursor-pointer w-1/4">
						<FontAwesomeIcon icon={faMessage} className="w-9 h-9" />
						<div>나의 상담</div>
					</div>
					<div className="flex flex-col items-center justify-center space-y-3 hover:bg-gray-100 rounded-lg p-4 cursor-pointer w-1/4">
						<FontAwesomeIcon icon={faPenToSquare} className="w-9 h-9" />
						<div>나의 후기</div>
					</div>
				</div>
				<div className="w-full h-[2px] bg-zinc-200"></div>
			</div>

			<div className="flex flex-col  mt-[60px] space-y-3 cursor-pointer">
				<div className="flex justify-between hover:bg-gray-100 p-5 rounded-lg">
					<div className="flex items-center space-x-3">
						<FontAwesomeIcon icon={faVolumeHigh} className="w-7 h-7" />
						<div className="text-[18px] font-semibold">공지사항</div>
					</div>
					<FontAwesomeIcon icon={faAngleRight} className="w-5 h-5 text-gray-400" />
				</div>
				<div className="flex justify-between hover:bg-gray-100 p-5 rounded-lg">
					<div className="flex items-center space-x-3">
						<FontAwesomeIcon icon={faGift} className="w-7 h-7" />
						<div className="text-[18px] font-semibold">이벤트</div>
					</div>
					<FontAwesomeIcon icon={faAngleRight} className="w-5 h-5 text-gray-400" />
				</div>
				<div className="flex justify-between hover:bg-gray-100 p-5 rounded-lg">
					<div className="flex items-center space-x-3">
						<FontAwesomeIcon icon={faBookBookmark} className="w-7 h-7" />
						<div className="text-[18px] font-semibold">요보야 이용가이드</div>
					</div>
					<FontAwesomeIcon icon={faAngleRight} className="w-5 h-5 text-gray-400" />
				</div>
				<div className="flex justify-between hover:bg-gray-100 p-5 rounded-lg">
					<div className="flex items-center space-x-3">
						<FontAwesomeIcon icon={faFile} className="w-7 h-7" />
						<div className="text-[18px] font-semibold">약관 및 정책</div>
					</div>
					<FontAwesomeIcon icon={faAngleRight} className="w-5 h-5 text-gray-400" />
				</div>
				<div className="flex justify-between hover:bg-gray-100 p-5 rounded-lg">
					<div className="flex items-center space-x-3">
						<FontAwesomeIcon icon={faPhone} className="w-7 h-7" />
						<div className="text-[18px] font-semibold">고객센터</div>
					</div>
					<FontAwesomeIcon icon={faAngleRight} className="w-5 h-5 text-gray-400" />
				</div>
			</div>
		</div>
	);
};

export default MyIndexPage;
