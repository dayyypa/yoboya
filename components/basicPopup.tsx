import { LineBreaker } from '../libs/utility';

interface BasicPopupProps {
	title?: string;
	content?: string;
	rightButtonTitle?: string;
	onLeftButtonClicked?: () => void;
	onRightButtonClicked?: () => void;
}
export const BasicPopup = ({
	title,
	content,
	rightButtonTitle = '확인',
	onLeftButtonClicked,
	onRightButtonClicked
}: BasicPopupProps) => {
	return (
		<div className="fixed inset-0 z-20 flex items-center justify-center bg-black/30">
			<div className="flex items-center justify-center h-screen">
				<div className="bg-white shadow-2xl w-[300px] rounded-12 overflow-hidden">
					<div className="flex flex-col p-4 space-y-1">
						<div className="text-16">{title}</div>
						<div className="text-13 text-zinc-400">{LineBreaker(content)}</div>
					</div>
					<div className="flex h-10">
						<button className="w-1/2 bg-zinc-200 text-zinc-500 text-14" onClick={onLeftButtonClicked}>
							취소
						</button>
						<button className="w-1/2 text-white bg-orange-400 text-14" onClick={onRightButtonClicked}>
							{rightButtonTitle}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
