import { useRouter } from 'next/router';
import { supabase } from '../libs/supabaseClient';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { loginUserState, UserInfo } from '../libs/store';
import { cls } from '../libs/utility';

const SetProfilePage = () => {
	const router = useRouter();
	const [nickname, setNickname] = useState('');
	const [error, setError] = useState('');
	const [loginUser, setLoginUser] = useRecoilState<UserInfo | null>(loginUserState);

	const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		if (value.length <= 8) {
			setNickname(value);
		}
	};

	const handleRandomNickname = () => {
		const randomNickname = RandomNicknames[Math.floor(Math.random() * RandomNicknames.length)];
		setNickname(randomNickname);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const nicknameRegex = /^[가-힣]{4,8}$/;

		if (!nicknameRegex.test(nickname)) {
			setError('닉네임은 4자 이상 8자 이하의 한글이어야 합니다.');
			return;
		}

		const { data: existingNicknames } = await supabase.from('profile').select('nickname').eq('nickname', nickname);

		if (existingNicknames && existingNicknames?.length > 0) {
			setError('이미 존재하는 닉네임입니다.');
			return;
		}

		const { error } = await supabase.from('profile').upsert({ user_id: loginUser?.id, nickname });

		if (error) {
			setError('닉네임을 설정하는 중 오류가 발생했습니다.');
		} else {
			setLoginUser((prev) => (prev?.id ? { ...prev, nickname } : null));
			router.push('/'); // 닉네임 설정 후 메인 페이지로 리다이렉트
		}
	};

	return (
		<div className="flex flex-col w-full min-h-screen sm:px-4">
			<div className="flex flex-col py-3">
				<div className="text-[20px] font-extrabold">요보아에 오신걸 환영합니다 😀</div>
				<div className="text-[16px] text-zinc-500 mt-2">활동하시려면 닉네임을 설정해주세요.</div>
				<div className="text-12 text-zinc-300">4자 이상 8자 이하의 한글 닉네임만 가능해요!</div>
			</div>
			<div className="w-[300px] sm:w-full py-6">
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label htmlFor="nickname" className="block mb-2 text-sm font-medium text-gray-700">
							닉네임
						</label>
						<div className="flex">
							<input
								type="text"
								id="nickname"
								value={nickname}
								onChange={handleNicknameChange}
								className="w-full px-3 py-2 border border-gray-300 rounded-l-4"
								maxLength={8}
							/>
							<button
								type="button"
								onClick={handleRandomNickname}
								className="px-3 py-2 text-white bg-blue-500 rounded-r-4 shrink-0"
							>
								랜덤 닉네임
							</button>
						</div>
					</div>
					{error && <p className="mb-4 text-[12px] text-red-600">{error}</p>}
					<button
						type="submit"
						className={cls(
							'w-full px-4 py-2 text-white rounded-lg rounded-4',
							nickname.trim() === '' ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
						)}
					>
						닉네임을 정했어요!
					</button>
				</form>
			</div>
		</div>
	);
};

export default SetProfilePage;

const RandomNicknames = [
	'빨간달콤포도',
	'노란상큼사과',
	'초록새콤키위',
	'파란쌉쌀베리',
	'주황달콤오렌지',
	'보라새콤포도',
	'분홍달콤복숭아',
	'하얀상큼딸기',
	'갈색쌉쌀밤',
	'회색새콤블루베리',
	'검은달콤체리',
	'빨간쌉쌀석류',
	'초록달콤멜론',
	'파란상큼자두',
	'노란새콤바나나',
	'주황쌉쌀귤',
	'보라상큼블루베리',
	'분홍새콤자두',
	'하얀달콤배',
	'갈색상큼감'
];
