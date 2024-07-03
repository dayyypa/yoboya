import { useQuery } from 'react-query';
import ApiHelper from '../../libs/server/api.helper';
import { Facility, loginUserState, MyKey } from '../../libs/store';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { HospitalInfo, thirdPartyAPIAddress, updateLikedFacs } from '.';
import { useRouter } from 'next/router';

const FacIndexPage = () => {
	const router = useRouter();
	const [loginUser, setLoginUser] = useRecoilState(loginUserState);
	const [total, setTotal] = useState(0);
	const [list, setList] = useState<Facility[]>([]);
	const [likedFacs, setLikedFacs] = useState<string[]>(loginUser?.likedFacs ? JSON.parse(loginUser?.likedFacs) : []);

	// data?.RecuperationHospital[1].row as Facility[
	const { data, isLoading } = useQuery(['facilities', loginUser], async () => {
		try {
			const query = {
				KEY: MyKey,
				Type: 'json',
				pIndex: 1,
				pSize: 685
			};

			const res = await ApiHelper.GetAsync({
				path: thirdPartyAPIAddress,
				query
			});

			if (!res.body.RecuperationHospital) {
				alert('데이터를 불러오는데 실패했습니다.');
				return;
			}
			return res.body.RecuperationHospital[1].row as Facility[];
		} finally {
			//
		}
	});

	const handleLikeClick = (name: string) => {
		let newArr: string[];
		if (likedFacs.includes(name)) {
			newArr = likedFacs.filter((item) => item !== name);
		} else {
			newArr = [...likedFacs, name];
		}

		updateLikedFacs(newArr, loginUser);
		setLikedFacs(newArr);
	};

	useEffect(() => {
		const filteredArr = data?.filter((item) => likedFacs.includes(item.BIZPLC_NM!)) ?? [];
		setList(removeDuplicates(filteredArr));
	}, [data, likedFacs]);

	useEffect(() => {
		setTotal(likedFacs.length);
	}, [likedFacs]);

	useEffect(() => {
		setLikedFacs(loginUser?.likedFacs ? JSON.parse(loginUser?.likedFacs) : []);
	}, [loginUser]);

	return (
		<div className="flex flex-col pb-[70px]">
			{isLoading ? (
				<div className="py-10 text-center text-15">Loading 중이에요 🤨</div>
			) : (
				<>
					<div className="sticky top-0 flex flex-col pt-5 space-y-6 bg-white sm:px-4">
						<div className="flex justify-between">
							<div className="flex items-center space-x-2">
								<div className="text-[22px] font-bold cursor-pointer">요양병원</div>
							</div>
						</div>
						<div className="flex">
							{loginUser?.nickname}님의<span className="ml-1 text-orange-400"> {total}</span>개의 찜한
							시설이 있어요😇
						</div>
					</div>
					{/* 병원 컴포넌트 */}
					<div className="flex flex-col divide-y divide-zinc-300 sm:px-4">
						{list?.map((item, index) => {
							return (
								<HospitalInfo
									key={index}
									item={item}
									isLiked={item.BIZPLC_NM ? likedFacs.includes(item.BIZPLC_NM) : false}
									onLikeClick={handleLikeClick}
								/>
							);
						})}
					</div>
					{total > 0 && (
						<div className="flex justify-center w-full my-5">
							<button
								className="w-[200px] h-[50px] bg-orange-400 text-white rounded-8"
								onClick={() => router.push('/fac')}
							>
								시설 더 찾아보기
							</button>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default FacIndexPage;

const removeDuplicates = (arr: Facility[]): Facility[] => {
	const uniqueObjects = new Map<string, Facility>();
	arr.forEach((item) => {
		uniqueObjects.set(item.BIZPLC_NM!, item);
	});

	return Array.from(uniqueObjects.values());
};
