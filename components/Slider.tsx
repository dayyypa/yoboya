import { useRouter } from 'next/router';
import React, { useState, useEffect, useRef } from 'react';

const images = [
	'https://cdn.ddoga.co.kr/ddoga_admin/banner/a127466b-1c25-413e-9a53-8943637d84ba',
	'https://cdn.ddoga.co.kr/ddoga_admin/banner/eebd47c3-38af-4795-b275-e5ff5926f083',
	'https://cdn.ddoga.co.kr/ddoga_admin/banner/d03adde9-4f55-47e2-8f61-c3fc72431e7c'
];

const Slider: React.FC = () => {
	const router = useRouter();
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
		}, 2000); // 1초마다 슬라이딩

		return () => clearInterval(interval); // 클린업 함수
	}, []);

	return (
		<div
			className="slider-container"
			style={{ position: 'relative', width: '100%', height: 'auto', overflow: 'hidden' }}
		>
			<div
				className="cursor-pointer slider-inner"
				style={{
					display: 'flex',
					transition: 'transform 0.5s ease-in-out',
					transform: `translateX(-${currentIndex * 100}%)`
				}}
			>
				{images.map((src, index) => (
					<img
						key={index}
						src={src}
						alt={`Slide ${index}`}
						style={{
							minWidth: '100%',
							height: 'auto',
							objectFit: 'cover'
						}}
						onClick={() => {
							if (index === 0) {
								window.open('https://www.youtube.com/watch?v=oDfKnt8R6Pg', '_blank');
							}
							if (index === 1) {
								alert('장기요양등급 알아보기!');
							}
							if (index === 2) {
								router.push('/fac');
							}
						}}
					/>
				))}
			</div>
		</div>
	);
};

export default Slider;
