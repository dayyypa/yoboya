import { faHospital } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { HomeModernIcon } from '@heroicons/react/24/solid';
import React from 'react';

const MainPage = () => {
	return (
		<div className="flex flex-col w-full pb-[90px]">
			{/* 상단 검색바 */}
			<div className="sticky top-0 z-10 flex items-center pt-4 pb-2 space-x-2 bg-white">
				<span>로고</span>
				<div className="grow h-[40px] border border-zinc-400 rounded-[20px] flex items-center px-4">
					<input className="w-2/3" placeholder="요보야에서 검색해 보세요!" />
				</div>
			</div>
			{/* 움직이는 배너 */}
			<div className="w-full h-[200px] bg-zinc-200 mt-8">움직이는 배너</div>
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
			<div className="flex flex-col">
				<MainTitle title="테마별 시설 추천" />
				<div className="grid grid-cols-3 gap-4">
					<div className="aspect-square bg-zinc-200"></div>
					<div className="aspect-square bg-zinc-200"></div>
					<div className="aspect-square bg-zinc-200"></div>
				</div>
			</div>
			<Line />
			<div className="flex flex-col">
				<MainTitle title="영상으로 만나는 추천 시설" />
				<div className="grid grid-cols-3 gap-4">
					<div className="aspect-square bg-zinc-200"></div>
					<div className="aspect-square bg-zinc-200"></div>
					<div className="aspect-square bg-zinc-200"></div>
				</div>
			</div>
			<Line />
			<div className="flex flex-col">
				<MainTitle title="모두가 궁금해하는 FAQ" />
				<div className="grid grid-cols-3 gap-4">
					<div className="aspect-square bg-zinc-200"></div>
					<div className="aspect-square bg-zinc-200"></div>
					<div className="aspect-square bg-zinc-200"></div>
				</div>
			</div>
		</div>
	);
};

export default MainPage;

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

const Line = () => {
	return <div className="w-full h-[4px] bg-zinc-100 my-8"></div>;
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
