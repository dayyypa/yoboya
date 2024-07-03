import { cls } from '../libs/utility';

interface BasicButtonProps {
	name: string;
	isInactive?: boolean;
	providedStyle?: string;
	onButtonClicked: () => void;
}

export const BasicButton = ({ name, isInactive = false, providedStyle, onButtonClicked }: BasicButtonProps) => {
	const handleClick = () => {
		if (!isInactive) {
			onButtonClicked();
		}
	};

	return (
		<button
			disabled={isInactive}
			className={cls('h-[48px] rounded-8 text-[14px]', providedStyle)}
			onClick={handleClick}
		>
			{name}
		</button>
	);
};
