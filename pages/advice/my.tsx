import { useRouter } from 'next/router';
import { BasicButton } from '../../components/basicButton';
import { supabase } from '../../libs/supabaseClient';
import { useEffect, useState } from 'react';
import { AdviceDetail, loginUserState } from '../../libs/store';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { AdviceItem } from '.';

const MyAdvicePage = () => {
	const router = useRouter();
	const loginUser = useRecoilValue(loginUserState);

	const { data: list, isLoading } = useQuery(['advice', loginUser], async () => {
		const { data: advices, error: adviceError } = await supabase
			.from('advice')
			.select('*')
			.order('created_at', { ascending: false });

		if (adviceError) throw adviceError;

		if (!advices || advices.length === 0) {
			return [];
		}

		const myAdvices = advices.filter((advice) => advice.user_id === loginUser?.id);

		const { data: comments, error: commentsError } = await supabase.from('advice_comment').select('advice_id');

		if (commentsError) throw commentsError;

		const commentCountMap = comments.reduce((acc, comment) => {
			acc[comment.advice_id] = (acc[comment.advice_id] || 0) + 1;
			return acc;
		}, {});

		const adviceWithCommentCount = myAdvices.map((advice) => ({
			...advice,
			reply_count: commentCountMap[advice.id] || 0
		}));

		return adviceWithCommentCount;
	});

	return (
		<div className="flex flex-col w-full mt-3">
			<div className="flex flex-col space-y-4 sm:px-4">
				<div className="flex items-center justify-between">
					<div className="text-[18px] font-bold">나의 상담사례</div>
					<BasicButton
						name={'더 상담하기'}
						providedStyle="bg-orange-400 text-white w-[80px] !h-[36px] rounded-4"
						onButtonClicked={() => {
							router.push('/advice/form');
						}}
					/>
				</div>
				<div className="flex justify-between">
					<div className="text-[12px]">
						총 <span className="text-orange-400 font-weight-700">{list?.length ?? 0}</span>개의 상담사례가
						있어요
					</div>
				</div>
			</div>
			<div className="flex flex-col mt-8 divide-y divide-zinc-200 sm:px-4">
				{isLoading ? (
					<div className="text-center text-15">나의 상담사례를 불러오고 있어요 🫢</div>
				) : (
					<>
						{list?.length === 0 ? (
							<></>
						) : (
							<>
								{list?.map((item) => (
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
					</>
				)}
			</div>
		</div>
	);
};

export default MyAdvicePage;
