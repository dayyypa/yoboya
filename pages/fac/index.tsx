import { faChevronDown, faLocationDot, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQuery } from 'react-query';
import ApiHelper from '../../libs/server/api.helper';
import { Facility, MyKey } from '../../libs/store';
import { cls } from '../../libs/utility';
import MyMap from '../../components/Map';
import { useEffect, useState } from 'react';
import { BasicButton } from '../../components/basicButton';

const FacIndexPage = () => {
	const [total, setTotal] = useState(0);
	const [page, setPage] = useState(1);
	const [list, setList] = useState<Facility[]>([]);
	const [city, setCity] = useState<string>();
	// data?.RecuperationHospital[1].row as Facility[
	const { data, isLoading, refetch } = useQuery(
		['facilities'],
		async () => {
			try {
				const query = {
					KEY: MyKey,
					Type: 'json',
					pIndex: page,
					pSize: 10,
					SIGUN_NM: city
				};
				console.log('qqq', query);
				const res = await ApiHelper.GetAsync({
					path: 'https://openapi.gg.go.kr/RecuperationHospital',
					query
				});

				console.log();
				if (!res.body.RecuperationHospital) {
					alert('데이터를 불러오는데 실패했습니다.');
					return;
				}

				setTotal(res.body.RecuperationHospital[0].head[0].list_total_count);
				setList((prev) => [...prev, ...(res.body.RecuperationHospital[1].row as Facility[])]);

				return res.body.RecuperationHospital;
			} finally {
			}
		},
		{ enabled: false }
	);

	const handleMore = () => {
		setPage((prev) => prev + 1);
	};

	useEffect(() => {
		refetch();
	}, [page, city]);

	useEffect(() => {
		setList([]);
		setPage(1);
		refetch();
	}, [city]);

	return (
		<div className="flex flex-col pb-[70px]">
			<div className="sticky top-0 flex flex-col pt-5 space-y-6 bg-white sm:px-4">
				<div className="flex justify-between">
					<div className="flex items-center space-x-2">
						<div className="text-[22px] font-bold cursor-pointer">요양병원</div>
					</div>
				</div>
				<div className="flex justify-between">
					<div className="flex space-x-2">
						<Dropdown
							optionList={[
								{ value: '-1', name: '지역' },
								{ value: '-1', name: '전체' },
								{ value: '시흥시', name: '시흥시' },
								{ value: '고양시', name: '고양시' },
								{ value: '용인시', name: '용인시' },
								{ value: '광주시', name: '광주시' },
								{ value: '부천시', name: '부천시' },
								{ value: '김포시', name: '김포시' },
								{ value: '평택시', name: '평택시' },
								{ value: '안산시', name: '안산시' },
								{ value: '광명시', name: '광명시' },
								{ value: '하남시', name: '하남시' }
							]}
							onSelect={(city) => {
								if (city === '-1') {
									setCity(undefined);
									return;
								}

								setCity(city);
							}}
						/>
					</div>
				</div>
				<div className="flex justify-between">
					<div>
						총 <span className="text-orange-400">{total}</span>개의 시설이 있어요
					</div>
				</div>
			</div>
			{/* 병원 컴포넌트 */}
			<div className="flex flex-col divide-y divide-zinc-300 sm:px-4">
				{list?.map((item) => {
					return <HospitalInfo item={item} />;
				})}
			</div>
			<div className="flex justify-center py-5">
				<BasicButton
					name={'더보기'}
					providedStyle="!bg-orange-400 !text-white !rounded-8 !w-[300px] !h-[50px] !text-16 !font-bold"
					onButtonClicked={handleMore}
				/>
			</div>
		</div>
	);
};

export default FacIndexPage;

interface HospitalInfoProps {
	item?: Facility;
}

const HospitalInfo = ({ item }: HospitalInfoProps) => {
	return (
		<div className="p-2">
			<div className="flex items-center justify-between space-x-2">
				<div className="flex flex-col space-y-2">
					<div className="text-[24px] font-bold">{item?.BIZPLC_NM}</div>
					<div className="text-[16px] text-gray-500">{item?.REFINE_LOTNO_ADDR}</div>
					<div className="text-12 text-zinc-400">{item?.TREAT_SBJECT_CONT}</div>
					<div className="flex space-x-1">
						<div className="text-[11px] px-2 py-1 bg-orange-200 text-orange-500 rounded-4">온라인상담</div>
						<Tag
							text={`${(item?.MEDSTAF_CNT ?? 0) >= 12 ? 1 : 2}등급`}
							providedStyle={(item?.MEDSTAF_CNT ?? 0) >= 12 ? '!bg-orange-400 !text-white' : ''}
						/>
						<Tag text={`설립 ${calculateYearsSince(item?.LICENSG_DE)}년차`} />
						<Tag text={`병상 ${item?.SICKBD_CNT}개`} />
						<Tag text={`의료인 ${item?.MEDSTAF_CNT}명`} />
					</div>
				</div>
				<div className="-z-10">
					<MyMap
						latitude={item?.REFINE_WGS84_LAT ? parseFloat(item?.REFINE_WGS84_LAT) : undefined}
						longitude={item?.REFINE_WGS84_LOGT ? parseFloat(item?.REFINE_WGS84_LOGT) : undefined}
					/>
				</div>
				{/* <div className="w-[130px] h-[130px] rounded-lg bg-zinc-100 shrink-0 rounded-8"></div> */}
			</div>
		</div>
	);
};

const Tag = ({ text, providedStyle }: { text: string; providedStyle?: string }) => {
	return <div className={cls('text-[11px] px-2 py-1 bg-zinc-200 rounded-4', providedStyle)}>{text}</div>;
};

function calculateYearsSince(dateString?: string): number {
	if (!dateString) return 0;
	const currentDate = new Date();
	const givenDate = new Date(dateString);
	let yearsDifference = currentDate.getFullYear() - givenDate.getFullYear();

	// 현재 달과 일이 주어진 날짜의 달과 일 이전인지 확인하여, 아직 생일이 지나지 않은 경우 1년을 빼줍니다.
	const isBeforeBirthday =
		currentDate.getMonth() < givenDate.getMonth() ||
		(currentDate.getMonth() === givenDate.getMonth() && currentDate.getDate() < givenDate.getDate());

	if (isBeforeBirthday) {
		yearsDifference--;
	}

	return yearsDifference;
}

interface OptionListProps {
	value?: string;
	name?: string;
}
interface DropdownProps {
	// children: React.ReactNode;
	optionList?: OptionListProps[];
	onSelect?: (value: string) => void;
}
const Dropdown = ({ optionList, onSelect }: DropdownProps) => {
	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		if (onSelect) {
			onSelect(event.target.value);
		}
	};

	return (
		<div className="relative inline-block overflow-hidden text-left bg-white border border-gray-300 rounded-8">
			<select className="w-full px-3 py-2 rounded-8" onChange={handleChange}>
				{optionList?.map((item) => {
					return <option value={item.value}>{item.name}</option>;
				})}
			</select>
		</div>
	);
};

const scrollToTop = () => {
	window.scrollTo({
		top: 0,
		behavior: 'smooth' // 부드러운 스크롤 애니메이션
	});
};