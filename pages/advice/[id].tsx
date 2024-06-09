import { faChevronLeft, faHouse, faQ } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { Line } from '..';
import { useEffect, useState } from 'react';
import { supabase } from '../../libs/supabaseClient';
import { Tables } from '../../database.types';
import { cls, formatRelativeTime } from '../../libs/utility';
import { useInput } from '../../libs/hooks/useInput';
import { loginUserState } from '../../libs/store';
import { useRecoilState } from 'recoil';

const AdviceDetailPage = () => {
	const router = useRouter();
	const [loginUser] = useRecoilState(loginUserState);
	const commentInput = useInput({ defaultValue: '' });
	const detailId = Number(router.query.id);
	const [detail, setDetail] = useState<Tables<'advice'> | null>(null);

	const [comments, setComments] = useState<Tables<'advice_comment'>[]>([]);

	const getDetail = async () => {
		const { data, error } = await supabase.from('advice').select('*').eq('id', detailId).limit(1).single();

		if (error) {
			console.log(error);
			return;
		}

		if (data) {
			await increasePostViews(detailId);
			setDetail(data);
		}
	};

	const getComments = async () => {
		const { data, error } = await supabase
			.from('advice_comment')
			.select('*')
			.eq('advice_id', detailId)
			.order('created_at', { ascending: false });

		if (error) {
			console.log(error);
			return;
		}

		setComments(data || []);
	};

	const handleCommentSubmit = async () => {
		if (!commentInput.value.trim()) return;

		if (!loginUser) {
			alert('로그인 후 이용해주세요.');
			return;
		}

		const { error } = await supabase
			.from('advice_comment')
			.insert([{ advice_id: detailId, content: commentInput.value }]);

		if (error) {
			console.log(error);
			return;
		}

		commentInput.setValue('');
		getComments();
	};

	useEffect(() => {
		getDetail();
	}, [detailId]);

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
					<div className="text-[18px] font-bold">{detail ? detail.title : ''}</div>
				</div>
				<div className="text-[14px] text-gray-700 mt-7">{detail ? detail.title : '로딩중입니다...'}</div>
				{/* 아이디 상세정보 */}
				<div className="flex flex-col mt-10 space-y-2 p-4 rounded-12 border-[2px] border-zinc-150">
					<div className="text-[13px] font-semibold text-gray-700 mx-2 mt-2">상세정보</div>
					<div className="grid grid-cols-2">
						<InfoItem id={0} title={'관심시설'} content={'요양원, 요양병원'} />
						<InfoItem id={1} title={'장기요양등급'} content={'등급없음 & 등급신청 도움 필요'} />
						<InfoItem id={2} title={'기초생활수급자 / 감경 대상 여부'} content={'아니오'} />
						<InfoItem id={3} title={'질병명'} content={'치매'} />
						<InfoItem id={4} title={'성별'} content={'남성'} />
						<InfoItem id={5} title={'출생연도'} content={'1949년 (만75세)'} />
						<InfoItem id={6} title={'거주지역'} content={'경기도 고양시 덕양구 행신동'} />
					</div>
				</div>
				<div className="flex mt-4 space-x-3">
					<div className="flex space-x-1 text-[13px] text-gray-600">
						<div>조회수</div>
						<div>{(detail?.views ?? 0) + 1}</div>
					</div>
					<div className="flex space-x-1 text-[13px] text-gray-600">
						{formatRelativeTime(detail?.created_at ?? '')}
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
			{/* 댓글 달기 */}
			<div className="flex flex-col mt-4">
				<textarea
					{...commentInput.props}
					className="w-full p-2 border rounded-md resize-none"
					placeholder="댓글을 작성하세요."
				/>
				<button
					onClick={handleCommentSubmit}
					className="self-end px-4 py-2 mt-2 text-white bg-blue-500 rounded-md"
				>
					댓글 작성
				</button>
			</div>
			{/* 문의 답변 */}
			<div className="flex"></div>
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
	id: number;
	title: string;
	content: string;
}

const InfoItem = ({ id, title, content }: InfoItemProps) => {
	return (
		<div className={cls('flex flex-col px-2 py-3 mx-2 space-y-1', id === 6 ? '' : 'border-b border-zinc-100')}>
			<div className="text-[12px] text-gray-500 font-medium">{title}</div>
			<div className="text-[14px] font-semibold">{content}</div>
		</div>
	);
};

const increasePostViews = async (detailId: number): Promise<void> => {
	try {
		const { error } = await supabase.rpc('increment_views', { detail_id: detailId });

		if (error) {
			throw error;
		}
	} catch (error: any) {
		console.error('Error updating views:', error.message);
	}
};



