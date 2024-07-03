import { useMemo } from 'react';
import { useInput } from '../../libs/hooks/useInput';
import { BasicButton } from '../../components/basicButton';
import { cls } from '../../libs/utility';
import { useRouter } from 'next/router';
import { supabase } from '../../libs/supabaseClient';
import { useSetRecoilState } from 'recoil';
import Layout, { ToastState } from '../layout';

const AdviceForm = () => {
	const router = useRouter();
	const titleInput = useInput({ defaultValue: '' });
	const contentInput = useInput({ defaultValue: '' });

	const setToastState = useSetRecoilState(ToastState);

	const isValidate = useMemo(() => {
		return (
			titleInput.value.length > 0 &&
			titleInput.value.length <= 50 &&
			contentInput.value.length > 0 &&
			contentInput.value.length <= 1000
		);
	}, [titleInput.value, contentInput.value]);

	const handleSubmitClick = async () => {
		const { data, error } = await supabase
			.from('advice')
			.insert([
				{
					title: titleInput.value,
					content: contentInput.value
				}
			])
			.select();

		if (error) {
			console.log(error);
			return;
		}

		if (data) {
			setToastState({ isShown: true, message: '질문이 작성되었습니다.' });
			setTimeout(() => {
				router.back();
			}, 800);
		}
	};

	return (
		<div className="relative flex flex-col w-full h-[100vh] pt-10">
			<div className="flex flex-col py-3 border-b border-zinc-300 sm:px-4">
				<div className="text-[20px] font-extrabold">문의 내용을 입력해 주세요</div>
				<div className="text-[16px] text-zinc-500 mt-2">
					어르신 신체 및 인지상태를 구체적으로
					<br />
					작성해주시면 더욱 자세한 상담이 가능해요
				</div>
			</div>
			<div className="flex flex-col pt-5 space-y-3 sm:px-4">
				<input
					{...titleInput.props}
					maxLength={50}
					className="text-[16px] p-3 border border-zinc-300 rounded-[8px] placeholder:text-[#E0E0E0]"
					placeholder="제목 입력 (최대 50자)"
				/>
				<textarea
					{...contentInput.props}
					maxLength={1000}
					className="h-[200px] text-[16px] p-3 border border-zinc-300 rounded-[8px] resize-none placeholder:text-[#E0E0E0]"
					placeholder="내용 입력 (최대 1,000자)"
				/>
				<div className="text-right text-[14px] text-zinc-400">{contentInput.value.length} / 1,000자</div>
			</div>
			<div className="absolute inset-x-0 bottom-0 h-[80px] flex space-x-2 pt-3 px-4">
				<BasicButton
					name={'이전'}
					providedStyle="w-[100px] border border-zinc-300"
					onButtonClicked={() => {
						router.back();
					}}
				/>
				<BasicButton
					name={'상담내용 작성하기'}
					isInactive={!isValidate}
					providedStyle={cls('grow text-white', isValidate ? 'bg-blue-700' : 'bg-blue-400 ')}
					onButtonClicked={handleSubmitClick}
				/>
			</div>
		</div>
	);
};

export default AdviceForm;

AdviceForm.getLayout = (page) => {
	return <Layout hideNavigation={true}>{page}</Layout>;
};
