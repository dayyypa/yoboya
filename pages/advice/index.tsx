import { useRouter } from 'next/router';
import { Line } from '..';
import { BasicButton } from '../../components/basicButton';
import { supabase } from '../../libs/supabaseClient';
import { useEffect, useState } from 'react';
import { Tables } from '../../database.types';

const AdviceIndexPage = () => {
	const router = useRouter();
	const [list, setList] = useState<Tables<'advice'>[]>([]);

	const getList = async () => {
		const { data, error } = await supabase.from('advice').select('*');

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
			<div className="flex flex-col space-y-4">
				<div className="flex items-center justify-between">
					<div className="text-[18px] font-bold">상담사레</div>
					<BasicButton
						name={'상담하기'}
						providedStyle="bg-blue-700 text-white w-[80px] !h-[40px]"
						onButtonClicked={() => {
							router.push('/advice/form');
						}}
					/>
				</div>
				<div className="flex justify-between">
					<div className="text-[12px]">
						총, <span className="text-[#4298ef]">1023</span>개의 상담사레가 있어요
					</div>
					<div className="text-[12px] cursor-pointer">최신답변순</div>
				</div>
			</div>
			<div className="flex flex-col mt-8 space-y-5">
				{list.map((item) => (
					<AdviceItem
						title={item.title}
						content={item.content}
						count={8}
						replyAt={'2024년 5월 22일'}
						onItemClicked={() => {
							router.push(`/advice/${item.id}`);
						}}
					/>
				))}
				<AdviceItem
					title={'치매 80대 여성'}
					content={
						'근무력증을 앓고 있는 80대 여성입니다. 거동이 불편하고 와상생활만 하고있습니다. 가족들은 재활프로그램이 있는곳을 추천받고 싶어요  화순,담양,여수 추천가능할까요?'
					}
					count={8}
					replyAt={'2024년 5월 22일'}
					onItemClicked={() => {
						router.push('/advice/1');
					}}
				/>
				<AdviceItem
					title={'치매 80대 여성'}
					content={
						'근무력증을 앓고 있는 80대 여성입니다. 거동이 불편하고 와상생활만 하고있습니다. 가족들은 재활프로그램이 있는곳을 추천받고 싶어요  화순,담양,여수 추천가능할까요?'
					}
					count={8}
					replyAt={'2024년 5월 22일'}
					onItemClicked={() => {
						router.push('/advice/1');
					}}
				/>
				<AdviceItem
					title={'치매 80대 여성'}
					content={
						'근무력증을 앓고 있는 80대 여성입니다. 거동이 불편하고 와상생활만 하고있습니다. 가족들은 재활프로그램이 있는곳을 추천받고 싶어요  화순,담양,여수 추천가능할까요?'
					}
					count={8}
					replyAt={'2024년 5월 22일'}
					onItemClicked={() => {
						router.push('/advice/1');
					}}
				/>

				<AdviceItem
					title={'치매 80대 여성'}
					content={
						'근무력증을 앓고 있는 80대 여성입니다. 거동이 불편하고 와상생활만 하고있습니다. 가족들은 재활프로그램이 있는곳을 추천받고 싶어요  화순,담양,여수 추천가능할까요?'
					}
					count={8}
					replyAt={'2024년 5월 22일'}
					onItemClicked={() => {
						router.push('/advice/1');
					}}
				/>

				<AdviceItem
					title={'치매 80대 여성'}
					content={
						'근무력증을 앓고 있는 80대 여성입니다. 거동이 불편하고 와상생활만 하고있습니다. 가족들은 재활프로그램이 있는곳을 추천받고 싶어요  화순,담양,여수 추천가능할까요?'
					}
					count={8}
					replyAt={'2024년 5월 22일'}
					onItemClicked={() => {
						router.push('/advice/1');
					}}
				/>
			</div>
		</div>
	);
};

export default AdviceIndexPage;

interface AdviceItemProps {
	title: string;
	content: string;
	count: number;
	replyAt: string; //2월 8일
	onItemClicked: () => void;
}
const AdviceItem = ({ title, content, count, replyAt, onItemClicked }: AdviceItemProps) => {
	return (
		<div>
			<div className="flex flex-col space-y-2 cursor-pointer" onClick={onItemClicked}>
				<div className="text-[20px] font-bold">{title}</div>
				<div className="text-[14px] font-semibold">
					<span className="text-[#386bec]">답변</span> 요보야 사회복지사
				</div>
				<div className="text-[13px]">{content}</div>
				<div className="flex items-center space-x-2 text-[13px] text-gray-500">
					<div>조회수 {count}</div>
					<div>{replyAt} 답변</div>
				</div>
			</div>
			<Line />
		</div>
	);
};
