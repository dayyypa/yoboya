import { Dispatch, MutableRefObject, useEffect, useRef, useState } from 'react';

//범용적으로 사용되는 Hooks

export type InputType = {
	value: string;
	setValue: Dispatch<React.SetStateAction<string>>;
	isFocused: boolean;
	setFocused: Dispatch<React.SetStateAction<boolean>>;
	props: InputProps;
};
export type InputProps = {
	ref: MutableRefObject<any>;
	value: string;
	isNumber?: boolean;
	onKeyUp: (event: any) => void;
	onKeyDown: (event: any) => void;
	onChange: (event: any) => void;
	onFocus: (event: any) => void;
	onBlur: (event: any) => void;
};

export interface useInputProps {
	defaultValue: string;
	focused?: boolean;
	isNumber?: boolean; //숫자만 입력되도록
	isMoney?: boolean; //세자리마다 쉼표 찍기
	isPhoneNumber?: boolean; //핸드폰번호 형태로 보이기 000-0000-0000
	handleKeyUp?: () => void; // 엔터 누른 경우 동작
}

export const useInput = ({
	defaultValue,
	focused,
	isNumber,
	isMoney,
	isPhoneNumber,
	handleKeyUp
}: useInputProps): InputType => {
	const [value, setValue] = useState(defaultValue ?? '');
	const [isFocused, setFocused] = useState(focused ?? false);
	const ref = useRef<any>(null);
	const [cursorPosition, setCursorPosition] = useState<number | null>(null);

	const onKeyDown = (event: any) => {
		const { key, target } = event;
		const { value: inputValue, selectionStart, selectionEnd } = target;

		if (key === 'Backspace' && inputValue[selectionStart - 1] === '-' && selectionStart === selectionEnd) {
			event.preventDefault(); // 기본 동작 방지

			// 하이픈 앞의 숫자와 하이픈 삭제
			let newCursorPosition = selectionStart - 2;
			let newValue = inputValue.substring(0, newCursorPosition) + inputValue.substring(selectionStart);

			setValue(newValue); // 상태 업데이트
			setCursorPosition(newCursorPosition); // 커서 위치 상태 업데이트
		}
	};

	useEffect(() => {
		if (cursorPosition !== null && ref.current) {
			ref.current.setSelectionRange(cursorPosition, cursorPosition);
		}
	}, [value]); // value가 변경될 때마다 커서 위치 재설정

	//Number,Money,PhoneNumber인지 여부에 따라
	const changeInputWithType = (newValue: string, callback?: (formattedValue: string) => void) => {
		if (isNumber || isMoney || isPhoneNumber) {
			newValue = newValue.replace(/[^0-9]/g, '');
		}
		if (isMoney) {
			const valueWithoutCommas = newValue.replace(/,/g, '');
			newValue = valueWithoutCommas.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		}
		if (isPhoneNumber) {
			if (newValue.length <= 3) {
				// keep as is
			} else if (newValue.length <= 7) {
				newValue = newValue.replace(/(\d{3})(\d{1,4})/, '$1-$2');
			} else if (newValue.length <= 11) {
				newValue = newValue.replace(/(\d{3})(\d{4})(\d{1,4})/, '$1-$2-$3');
			} else {
				newValue = value;
			}
		}

		setValue(newValue);

		if (callback) callback(newValue);
	};

	const onChange = (event: any) => {
		changeInputWithType(event.target.value);
	};

	const onFocus = () => {
		setFocused(true);
	};
	const onBlur = () => {
		setFocused(false);
	};
	const onKeyUp = (event: any) => {
		if (handleKeyUp && event.key === 'Enter') {
			handleKeyUp();
		}
	};

	useEffect(() => {
		setValue(defaultValue);
	}, [defaultValue]);

	useEffect(() => {
		changeInputWithType(value);
	}, [value]);

	useEffect(() => {
		if (isFocused) {
			ref.current?.focus();
		} else {
			ref.current?.blur();
		}
	}, [isFocused]);

	return {
		value,
		setValue,
		isFocused,
		setFocused,
		props: {
			ref,
			value,
			onChange,
			onKeyDown,
			onFocus,
			onBlur,
			onKeyUp
		}
	};
};
