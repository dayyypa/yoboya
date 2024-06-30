export function cls(...classnames: (string | undefined)[]) {
	return classnames.filter((name) => !!name).join(' ');
}

//이스케이프 문자 바꾸기
//꿀: 이스케이프문자 추가하기
export const DeleteEscape = (text?: string) => {
	if (typeof text !== 'string') return '';
	if (!text) return '';
	
	return text
		.replaceAll('&gt;', '>')
		.replaceAll('&lt;', '<')
		.replaceAll('&quot;', '"')
		.replaceAll('<br />', '\n')
		.replaceAll('<br/>', '\n')
		.replaceAll('<br>', '\n');
};

export const HighlightKeyword = (text?: string, keyword?: string) => {
	if (!text) {
		text = '';
	}

	if (!keyword || keyword.trim() === '') {
		return text;
	}

	const regex = new RegExp(`(${keyword})`, 'gi');
	const parts = text.split(regex);

	return (
		<span className="text-15">
			{parts.map((part, index) =>
				regex.test(part) ? (
					<span key={index} className="text-kgreen-50 font-weight-500">
						{part}
					</span>
				) : (
					part
				)
			)}
		</span>
	);
};

export const LineBreaker = (text?: string, keyword?: string) => {
	if (!text) return '';

	return DeleteEscape(text)
		.split('\n')
		.map((line, index) => (
			<span key={index}>
				{index > 0 && <br />}
				{keyword ? HighlightKeyword(line, keyword) : line}
			</span>
		));
};

export const formatRelativeTime = (dateString?: string): string => {
	if (!dateString) {
		return '';
	}

	const date = new Date(dateString);
	const now = new Date();
	const diff = now.getTime() - date.getTime();

	const seconds = Math.floor(diff / 1000);
	const minutes = Math.floor(diff / (1000 * 60));
	const hours = Math.floor(diff / (1000 * 60 * 60));
	const days = Math.floor(diff / (1000 * 60 * 60 * 24));
	const months = Math.floor(days / 30);

	if (seconds < 60) return `${seconds}초 전`;
	if (minutes < 60) return `${minutes}분 전`;
	if (hours < 24) return `${hours}시간 전`;
	if (days < 2) return `어제`;
	if (days < 3) return `엊그제`;
	if (days < 30) return `${days}일 전`;
	if (months < 12) return `${months}달 전`;

	// 원하는 포맷에 맞게 날짜를 반환
	return `${date.getFullYear() % 100}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(
		date.getDate()
	).padStart(2, '0')}`;
};
