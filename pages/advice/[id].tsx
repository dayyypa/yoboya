import { faChevronLeft, faHouse, faQ } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { Line } from '..';

const AdviceDetailPage = () => {
	const router = useRouter();

	return (
		<div className="flex flex-col">
			{/* 아이콘 영역 */}
			<div className="flex justify-between mt-4 ml-2">
				<FontAwesomeIcon
					icon={faChevronLeft}
					className="w-5 h-5 cursor-pointer"
					onClick={() => {
						router.push('/advice');
					}}
				/>
				<FontAwesomeIcon
					icon={faHouse}
					className="w-5 h-5 cursor-pointer"
					onClick={() => {
						router.push('/');
					}}
				/>
			</div>
			{/*  해당아이디 */}
			<div>
				<div className="flex items-center mt-8 space-x-2">
					<FontAwesomeIcon icon={faQ} className="w-5 h-5" />
					<div className="text-[18px] font-bold">클릭된아이디</div>
				</div>
				<div className="text-[14px] text-gray-700 mt-7">
					간농양으로 한달 ICU, 항생제 치료로 한달 치료. 현재 일반병원에서 보존적 치료 중. 치매+섬망으로
					정신과약 복용 중. 등급 신청 전. 콧줄, 기저귀, 혼잣말이 아주 많음.
				</div>
				{/* 아이디 상세정보 */}
				<div className="flex flex-col mt-10 space-y-2 rounded-12 border-[2px] border-zinc-150">
					<div className="text-[13px] font-semibold text-gray-700 mx-2 mt-2">상세정보</div>
					<div className="grid grid-cols-2">
						<InfoItem title={'관심시설'} content={'요양원, 요양병원'} />

						<InfoItem title={'장기요양등급'} content={'등급없음 & 등급신청 도움 필요'} />

						<InfoItem title={'기초생활수급자 / 감경 대상 여부'} content={'아니오'} />

						<InfoItem title={'질병명'} content={'치매'} />

						<InfoItem title={'성별'} content={'남성'} />

						<InfoItem title={'출생연도'} content={'1949년 (만75세)'} />

						<InfoItem title={'거주지역'} content={'경기도 고양시 덕양구 행신동'} />
					</div>
				</div>
				<div className="flex mt-4 space-x-3">
					<div className="flex space-x-1 text-[13px] text-gray-600">
						<div>조회수</div>
						<div>7</div>
					</div>
					<div className="flex space-x-1 text-[13px] text-gray-600">
						<div>8</div>
						<div>시간 전</div>
					</div>
				</div>
				<Line />
				<div className="flex flex-col space-y-4">
					<div className="text-[14px]">
						총 <span className="text-blue-600">1</span>개의 답변이 있어요
					</div>
					<div className="w-full h-[2px] bg-zinc-100"></div>
				</div>
			</div>
			{/* 문의 답변 */}
			<div className="flex flex-col px-4 py-8 space-y-12">
				<div className="flex flex-col space-y-3">
					<div className="text-[19px]">
						<span className="font-semibold">요보야 사회복지사</span>의 답변입니다
					</div>
					<div>안녕하세요. 요보야 사회복지사입니다.</div>
				</div>
				<div>
					<div>천주교 재단에서 설립한 요양병원 몇 군데를 안내드립니다.</div>
					<div>
						아래 <span className="font-semibold bg-orange-200">추천요양시설란</span>에 시설명을 클릭하시면
						상세페이지로 이동하여 전화 또는 온라인 상담이 가능합니다.
					</div>
				</div>
				<div>
					혹시나 추가로 궁금하신 사항이 있으시다면 보다 구체적인 내용을 기재해 주셔서 상담 글을 한 번 더
					남겨주시면 답변 도와드리겠습니다. 감사합니다!
				</div>
			</div>
		</div>
	);
};

export default AdviceDetailPage;

interface InfoItemProps {
	title: string;
	content: string;
}

const InfoItem = ({ title, content }: InfoItemProps) => {
	return (
		<div className="flex flex-col pb-3 mx-2 space-y-1 border-b-2 border-zinc-100">
			<div className="text-[12px] text-gray-500 font-medium">{title}</div>
			<div className="text-[14px] font-semibold">{content}</div>
		</div>
	);
};

// const IdInfo = () => {
// 	return <div></div>;
// };
