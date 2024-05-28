import { faChevronDown, faLocationDot, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FacIndexPage = () => {
	return (
		<div className="flex flex-col mt-5">
			<div className="flex flex-col space-y-6">
				<div className="flex justify-between">
					<div className="flex space-x-2 items-center">
						<div className="text-[22px] font-bold cursor-pointer">요양병원</div>
						<FontAwesomeIcon icon={faChevronDown} className="h-5 w-5" />
					</div>
					<FontAwesomeIcon
						icon={faMagnifyingGlass}
						className="h-6 w-6  cursor-pointer hover:bg-gray-200 p-2 rounded-lg"
					/>
				</div>
				<div className="flex py-2 rounded-lg space-x-2 items-center justify-center border border-gray-300 hover:bg-gray-200 cursor-pointer">
					<FontAwesomeIcon icon={faLocationDot} className="h-4 w-4 text-blue-600" />
					<div>서울시</div>
				</div>
				<div className="flex justify-between">
					<div className="flex space-x-2">
						<div className="flex cursor-pointer items-center px-3 py-1 border border-gray-300 rounded-3xl">
							360º파노라마
						</div>
						<div className="flex cursor-pointer space-x-2 items-center px-3 py-1 border border-gray-300 rounded-3xl">
							<div>시설규모</div>
							<FontAwesomeIcon icon={faChevronDown} className="h-3 w-3" />
						</div>
						<div className="flex cursor-pointer space-x-2 items-center px-3 py-1 border border-gray-300 rounded-3xl">
							<div>평가등급</div>
							<FontAwesomeIcon icon={faChevronDown} className="h-3 w-3" />
						</div>
						<div className="flex cursor-pointer space-x-2 items-center px-3 py-1 border border-gray-300 rounded-3xl">
							<div>특화영역</div>
							<FontAwesomeIcon icon={faChevronDown} className="h-3 w-3" />
						</div>
					</div>
					<div className="flex cursor-pointer space-x-2 items-center px-3 py-1 border border-gray-300 rounded-3xl">
						<div>필터</div>
						<FontAwesomeIcon icon={faChevronDown} className="h-3 w-3" />
					</div>
				</div>
				<div className="flex justify-between">
					<div>
						총 <span className="text-blue-600">110</span>개의 시설이 있어요
					</div>
					<div className="flex items-center space-x-2 cursor-pointer">
						<div className="font-bold">요보야추천순</div>
						<FontAwesomeIcon icon={faChevronDown} className="h-3 w-3" />
					</div>
				</div>
			</div>
			{/* 병원 컴포넌트 */}
			<HospitalInfo
				name={'서울센트럴요양병원'}
				address={'서울특별시 영등포구 경인로 767,(문래동3가)'}
				tag={'등급제외'}
			/>
			<HospitalInfo
				name={'서울센트럴요양병원'}
				address={'서울특별시 영등포구 경인로 767,(문래동3가)'}
				tag={'등급제외'}
			/>
			<HospitalInfo
				name={'서울센트럴요양병원'}
				address={'서울특별시 영등포구 경인로 767,(문래동3가)'}
				tag={'등급제외'}
			/>
			<HospitalInfo
				name={'서울센트럴요양병원'}
				address={'서울특별시 영등포구 경인로 767,(문래동3가)'}
				tag={'등급제외'}
			/>
			<HospitalInfo
				name={'서울센트럴요양병원'}
				address={'서울특별시 영등포구 경인로 767,(문래동3가)'}
				tag={'등급제외'}
			/>
			<HospitalInfo
				name={'서울센트럴요양병원'}
				address={'서울특별시 영등포구 경인로 767,(문래동3가)'}
				tag={'등급제외'}
			/>
			<HospitalInfo
				name={'서울센트럴요양병원'}
				address={'서울특별시 영등포구 경인로 767,(문래동3가)'}
				tag={'등급제외'}
			/>
		</div>
	);
};

export default FacIndexPage;

interface HospitalInfoProps {
	name: string;
	address: string;
	tag: string;
}

const HospitalInfo = ({ name, address, tag }: HospitalInfoProps) => {
	return (
		<div>
			<div className="flex justify-between items-center mt-9 pb-8">
				<div className="flex flex-col space-y-2">
					<div className="text-[24px] font-bold">{name}</div>
					<div className="text-[16px] text-gray-500">{address}</div>
					<div className="flex">
						<div className="text-[14px] font-medium rounded-lg p-2 bg-gray-200">{tag}</div>
					</div>
				</div>
				<div className="w-[130px] h-[130px] rounded-lg bg-violet-100"></div>
			</div>
			<div className="h-[1px] bg-gray-300"></div>
		</div>
	);
};
