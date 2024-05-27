const MyIndexPage = () => {
	return (
		<div className="flex flex-col pt-3">
			<div className="text-[20px] font-semibold">YoBoYa</div>
			<div className="flex flex-col space-y-5 mt-[45px]">
				<div className="flex flex-col items-center">
					<div className="font-semibold">
						지금 <span className="text-blue-500">요보야</span>에서
					</div>
					<div className="font-semibold">
						<span className="text-blue-500">요양상담</span>을 시작하세요!
					</div>
				</div>
				<button className="bg-blue-500 text-white py-3 rounded-lg">로그인/회원가입</button>
				<div className="flex justify-between">
					<div className="flex flex-col space-y-2 bg-rose-200 px-5 py-2">
						<div>아이콘</div>
						<div>찜한 목록</div>
					</div>
					<div className="flex flex-col space-y-2 bg-rose-200 px-5 py-2">
						<div>아이콘</div>
						<div>최근 본 시설</div>
					</div>
					<div className="flex flex-col space-y-2 bg-rose-200 px-5 py-2">
						<div>아이콘</div>
						<div>나의 상담</div>
					</div>
					<div className="flex flex-col space-y-2 bg-rose-200 px-5 py-2">
						<div>아이콘</div>
						<div>나의 후기</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MyIndexPage;
