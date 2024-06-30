import { useRouter } from 'next/router';
import { BasicButton } from '../../components/basicButton';
import { supabase } from '../../libs/supabaseClient';
import { useEffect, useState } from 'react';
import { AdviceDetail } from '../../libs/store';

const AdviceIndexPage = () => {
	const router = useRouter();
	const [list, setList] = useState<AdviceDetail[]>([]);

	const getList = async () => {
		try {
			// 1. `advice` 테이블에서 데이터를 가져옵니다.
			const { data: advices, error: adviceError } = await supabase
				.from('advice')
				.select('*')
				.order('created_at', { ascending: false });

			if (adviceError) throw adviceError;

			if (!advices || advices.length === 0) {
				setList([]);
				return;
			}

			// 2. 각 `advice`에 대한 댓글 수를 가져옵니다.
			const { data: comments, error: commentsError } = await supabase.from('advice_comment').select('advice_id');

			if (commentsError) throw commentsError;

			// 3. 댓글 수를 각 `advice` 데이터에 병합합니다.
			const commentCountMap = comments.reduce((acc, comment) => {
				acc[comment.advice_id] = (acc[comment.advice_id] || 0) + 1;
				return acc;
			}, {});

			const adviceWithCommentCount = advices.map((advice) => ({
				...advice,
				reply_count: commentCountMap[advice.id] || 0
			}));

			setList(adviceWithCommentCount);
		} catch (error) {
			console.log(error);
		}
	};

	const ggetList = async () => {
		const { data, error } = await supabase.from('advice').select('*').order('created_at', { ascending: false }); // 작성된 순으로 정렬 (최신순)

		if (error) {
			console.log(error);
			return;
		}

		if (data) {
			setList(data);
		}
	};

	useEffect(() => {
		getList();
	}, []);

	return (
		<div className="flex flex-col w-full mt-3">
			<div className="flex flex-col space-y-4 sm:px-4">
				<div className="flex items-center justify-between">
					<div className="text-[18px] font-bold">상담사례</div>
					<BasicButton
						name={'상담하기'}
						providedStyle="bg-orange-400 text-white w-[80px] !h-[36px] rounded-4"
						onButtonClicked={() => {
							router.push('/advice/form');
						}}
					/>
				</div>
				<div className="flex justify-between">
					<div className="text-[12px]">
						총 <span className="text-orange-400 font-weight-700">{list.length ?? 0}</span>개의 상담사례가
						있어요
					</div>
					<div className="text-[12px] cursor-pointer">최신순</div>
				</div>
			</div>
			<div className="flex flex-col mt-8 divide-y divide-zinc-200 sm:px-4">
				{list.length === 0 ? (
					<></>
				) : (
					<>
						{list.map((item) => (
							<AdviceItem
								key={item.id}
								item={item}
								onItemClicked={() => {
									router.push(`/advice/${item.id}`);
								}}
							/>
						))}
					</>
				)}
			</div>
		</div>
	);
};

export default AdviceIndexPage;

interface AdviceItemProps {
	item?: AdviceDetail;
	onItemClicked: () => void;
}
const AdviceItem = ({ item, onItemClicked }: AdviceItemProps) => {
	return (
		<div className="px-2 py-3 cursor-pointer hover:bg-zinc-100" onClick={onItemClicked}>
			<div className="flex flex-col space-y-1">
				<div className="text-[14px] font-weight-700 text-zinc-800">{item?.title}</div>
				<div className="text-[12px] line-clamp-1 text-zinc-600">{item?.content}</div>
				<div className="flex items-center space-x-2 text-[11px] text-zinc-400">
					<div>
						조회수 <span className="text-orange-300">{item?.views}</span>
					</div>
					{item?.reply_count !== undefined && item?.reply_count > 0 && (
						<div>
							답변 <span className="text-orange-300">{item?.reply_count}</span>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
