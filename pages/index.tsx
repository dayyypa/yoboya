import { faHospital } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { loginUserState } from '../libs/store';
import { faSeedling } from '@fortawesome/free-solid-svg-icons';
import { LineBreaker } from '../libs/utility';
import Slider from '../components/Slider';

// '/'
const MainPage = () => {
	const loginUser = useRecoilValue(loginUserState);

	return (
		<div className="flex flex-col w-full pb-[90px]">
			{/* 상단 검색바 */}
			<div className="sticky top-0 z-10 flex items-center pt-4 pb-2 space-x-2 bg-white sm:px-4">
				<FontAwesomeIcon icon={faSeedling} className="text-orange-400 text-[24px]" />
				<div className="grow h-[40px] border border-zinc-400 rounded-[20px] flex items-center px-4">
					<input className="w-2/3" placeholder="요보야에서 검색해 보세요!" />
				</div>
			</div>
			{/* 움직이는 배너 */}
			<Slider />
			<Line />
			{/* 시설찾기 필터 */}
			<div className="grid w-full grid-cols-4 gap-6">
				<FilterButton
					name={'시설찾기'}
					icon={<FontAwesomeIcon icon={faHospital} className="w-9 h-9" />}
					onButtonClick={() => {
						//
					}}
				/>
				<FilterButton
					name={'요양병원'}
					icon={<FontAwesomeIcon icon={faHospital} className="w-9 h-9" />}
					onButtonClick={() => {
						//
					}}
				/>
				<FilterButton
					name={'요양원'}
					icon={<FontAwesomeIcon icon={faHospital} className="w-9 h-9" />}
					onButtonClick={() => {
						//
					}}
				/>
				<FilterButton
					name={'실버타운'}
					icon={<FontAwesomeIcon icon={faHospital} className="w-9 h-9" />}
					onButtonClick={() => {
						//
					}}
				/>
				<FilterButton
					name={'양로원'}
					icon={<FontAwesomeIcon icon={faHospital} className="w-9 h-9" />}
					onButtonClick={() => {
						//
					}}
				/>
				<FilterButton
					name={'주야간보호'}
					icon={<FontAwesomeIcon icon={faHospital} className="w-9 h-9" />}
					onButtonClick={() => {
						//
					}}
				/>
				<FilterButton
					name={'단기보호'}
					icon={<FontAwesomeIcon icon={faHospital} className="w-9 h-9" />}
					onButtonClick={() => {
						//
					}}
				/>
				<FilterButton
					name={'방문요양'}
					icon={<FontAwesomeIcon icon={faHospital} className="w-9 h-9" />}
					onButtonClick={() => {
						//
					}}
				/>
			</div>
			<Line />
			<div className="flex flex-col sm:px-4">
				<MainTitle title="영상으로 만나는 추천 시설" />
				<div className="grid grid-cols-3 gap-4 mt-2">
					<a
						href="https://www.youtube.com/watch?v=oDfKnt8R6Pg"
						target="_blank"
						className="theme_youtube_box__TS4mF"
					>
						<img
							src="https://i.ytimg.com/vi/oDfKnt8R6Pg/hqdefault.jpg"
							className="theme_youtube_thumb__cD0G_"
							alt="&amp;quot;집에 가기 싫어요~&amp;quot; 어르신 오시고 싶게 만드는 주간보호센터의 비결은?"
						/>
					</a>
					<a
						href="https://www.youtube.com/watch?v=j8L6TaCc_6k"
						target="_blank"
						className="theme_youtube_box__TS4mF"
					>
						<img
							src="https://i.ytimg.com/vi/j8L6TaCc_6k/hqdefault.jpg"
							className="theme_youtube_thumb__cD0G_"
							alt="도심과 자연이 공존하는 요양원! &amp;quot;어르신이 텃밭에서 상추도 직접 키우신다구요?&amp;quot;"
						/>
					</a>
					<a
						href="https://www.youtube.com/watch?v=YsOOW4kAwvk"
						target="_blank"
						className="theme_youtube_box__TS4mF"
					>
						<img
							src="https://i.ytimg.com/vi/YsOOW4kAwvk/hqdefault.jpg"
							className="theme_youtube_thumb__cD0G_"
							alt="&amp;quot;돈 때문에 요양원 창업하지 마세요!&amp;quot; 33세 젊은 시설장의 조언ㅣ요양인 인터뷰"
						/>
					</a>
				</div>
			</div>
			<Line />
			<div className="flex flex-col sm:px-4">
				<MainTitle title="모두가 궁금해하는 FAQ" />
				<div className="flex flex-col mt-2 space-y-2">
					<FaqItem
						title="휠체어 신청을 하고 싶어요. 무료로 지원 가능한가요?"
						content={
							'장기요양수급자라면 연간 한도액 160만원 내에서 신청 가능해요.\n어르신 성함, 장기요양인정번호, 보호자 연락처만 남겨주시면 보행기, 침대 등 사용 가능한 품목까지 함께 확인 도와드릴게요.'
						}
					/>
					<FaqItem
						title="방문요양보호사에게 어디까지 부탁해도 되나요?"
						content={
							'방문요양보호사는 장기요양수급자 대상으로 신체활동, 인지활동, 일상생활, 정서지원서비스를 제공해요.\n대표적으로 개인위생활동, 외출동행, 방안 청소 및 환경관리, 말벗/의사소통 도움 등이 있어요.\n다만, 수급자의 가족만을 위한 행위, 가족을 위한 관공서 등의 심부름 활동, 그 밖에 수급자의 일상생활에 지장이 없는 행위는 방문요양보호사에게 요구해서는 안 돼요.'
						}
					/>
					<FaqItem
						title="요양원과 실버타운의 차이점을 알려주세요."
						content={
							'요양원은 노인의료복지시설로 돌봄이 필요한 장기요양등급 수급자가 입소하여 신체활동 및 심신기능의 유지 향상을 위한 돌봄 서비스를 제공해요.\n실버타운은 노인주거복지시설로 일상생활이 가능한 어르신에게 일상생활에 필요한 다양한 편의서비스를 제공해요.\n비용·서비스·주거형태 등에 차이가 있으나, 가장 큰 차이점은 어르신의 일상생활가능 여부예요.'
						}
					/>
				</div>
			</div>
		</div>
	);
};

export default MainPage;

interface FaqItemProps {
	title: string;
	content: string;
}
const FaqItem = ({ title, content }: FaqItemProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleContent = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className="flex flex-col">
			<div
				className="flex items-center justify-between p-2 transition-colors duration-200 bg-orange-100 cursor-pointer rounded-8 hover:bg-orange-200"
				onClick={toggleContent}
			>
				<div className="font-semibold text-orange-400 text-14">Q. {title}</div>
				<div className="text-[16px] text-orange-400">{isOpen ? '▲' : '▼'}</div>
			</div>
			{isOpen && (
				<div className="text-[12px] text-gray-700 mt-1 p-2 bg-gray-50 rounded-8 border border-gray-200">
					{LineBreaker(content)}
				</div>
			)}
		</div>
	);
};

interface FilterButtonProps {
	name: string;
	icon: JSX.Element;
	onButtonClick: () => void;
}
const FilterButton = ({ name, icon, onButtonClick }: FilterButtonProps) => {
	return (
		<button className="flex flex-col items-center space-y-1" onClick={onButtonClick}>
			{icon}
			<span className="text-[12px]">{name}</span>
		</button>
	);
};

export const Line = () => {
	return <div className="w-full h-[8px] bg-zinc-100 my-8"></div>;
};

interface MainTitleProps {
	title: string;
}
const MainTitle = ({ title }: MainTitleProps) => {
	return (
		<div className="flex">
			<div className="font-semibold">
				<span className="font-extrabold text-orange-500">요보야 PICK!</span> {title}
			</div>
		</div>
	);
};
