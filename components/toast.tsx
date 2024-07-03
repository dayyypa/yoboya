import { useRecoilState } from 'recoil';
import { ToastState } from './layout';
import { cls, LineBreaker } from '../libs/utility';

interface ToastProps {
	title: string;
	isErrorStyle?: boolean;
	providedStyle: string;
}
const Toast = ({ title, isErrorStyle, providedStyle }: ToastProps) => {
	const [toastState] = useRecoilState(ToastState);

	return (
		<div
			id="toast"
			className={cls(
				'text-[14px] rounded-8 px-5 py-3.5 text-center !laptop:max-w-[320px] sm:!w-[90%]',
				isErrorStyle ? '!bg-error-a70' : '',
				providedStyle,
				toastState.isShown ? 'reveal' : ''
			)}
		>
			{LineBreaker(title)}
		</div>
	);
};

export default Toast;
