/** @type {import('tailwindcss').Config} */
const length = {
	0.25: '0.0625rem', //1px
	0.5: '0.125rem', //2px
	0.75: '0.1875rem', //3px
	1.5: '0.375rem', //6px
	1.75: '0.4375rem', //7px
	3.75: '0.9375rem', //15px
	4.5: '1.125rem', //18px
	5.5: '1.375rem', //22px
	6: '1.5rem', //24px
	7.5: '1.875rem', //30px
	8.5: '2.125rem', //34px
	9.5: '2.375rem', //38px
	10.5: '2.625rem', //42px
	11.5: '2.875rem', // 46px
	12.5: '3.125rem', // 50px
	13: '3.25rem', //52px
	13.5: '3.375rem', //54px
	14.5: '3.625rem', //58px
	15: '3.75rem', //60px
	15.5: '3.875rem', //62px
	16: '4rem', //64px
	17: '4.25rem', //68px
	17.5: '4.375rem', //70px
	18: '4.5rem', //72px
	18.5: '4.625', //74px
	19: '4.75rem', //76px
	19.5: '4.875rem', // 78px
	21: '5.25rem', //84px
	22: '5.5rem', //88px
	23: '5.75rem', //92px
	25: '6.25rem', //100px
	30: '7.5rem', //120px
	31: '7.75rem', //124px
	31.5: '7.875rem', //126px
	32.5: '8.125rem', //130px
	33: '8.25rem', //132px
	34: '8.5rem', // 136px
	34.5: '8.625rem', //138px
	35: '8.75rem', //140px
	35.25: '8.8125rem', //141px
	36.5: '8.75rem', //146px
	37.5: '9.375rem', //150px
	38: '9.5rem', //152px
	40: '10rem', //160px
	41: '10.25rem', //164px
	42.25: '10.5625rem', // 169px
	45.5: '11.375rem', //182px
	46: '11.5rem', //184px
	47: '11.75rem', //188px
	47.75: '11.9375rem', //191px
	49: '12.25rem', //196px
	50: '12.5rem', //200px
	52: '13rem', //208px
	53: '13.25rem', //212px
	54: '13.5rem', //216px
	54.5: '13.625rem', //218px
	57: '14.25rem', //228px
	57.5: '14.375rem', //230px
	64: '16rem', // 256px
	65.5: '16.375rem', //262px
	71: '17.75rem', //284px
	72: '18rem', //288px
	84: '21rem', //336px
	85: '21.25rem', //340px
	88: '22rem', //352px
	90: '22.5rem', //360px
	92: '23rem', //368px
	100: '25rem', //400px
	101: '25.25rem', //404px
	160: '40rem', //640px
	240: '60rem', //960px
	//Screen Size
	outerframe: '1280px',
	innerframe: '1024px',
	laptop: '1007px',
	// laptop: '1024px',
	laptopMenu: '1007px', // 기존 선생님목록 하단 라인 튀어나오는 것 20px
	// laptopMenu: '1024px', // 기존 선생님목록 하단 라인 튀어나오는 것 20px
	pcMenu: '1044px' // 기존 선생님목록 하단 라인 튀어나오는 것 20px
	// pc: '1154px'
};
module.exports = {
	content: ['./pages/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			screens: {
				sm: { max: '1006px' },
				smCSS: { max: '1007px' },
				smMax: { max: '1024px' },
				md: { max: '1055px' },
				lg: { max: '1261px' },

				laptop: { min: '1007px' },
				laptopCSS: { min: '1056px' }, //1024 + 16 * 2 px
				pc: { min: '1262px' },
				pcCSS: { min: '1284px' }
			},
			transitionDuration: {
				2000: '2000ms',
				3000: '3000ms',
				5000: '5000ms'
			},
			fontSize: {
				8: ['8px', '10px'],
				9: ['9px', '12px'],
				10: ['10px', '14px'],
				11: ['11px', '16px'],
				12: ['12px', '18px'],
				13: ['13px', '18px'],
				14: ['14px', '20px'],
				15: ['15px', '22px'],
				16: ['16px', '24px'],
				17: ['17px', '24px'],
				18: ['18px', '26px'],
				20: ['20px', '30px'],
				22: ['22px', '32px'],
				24: ['24px', '32px'],
				28: ['28px', '36px'],
				32: ['32px', '42px'],
				34: ['34px', '46px'],
				36: ['36px', '46px'],
				44: ['44px', '54px']
				// 8: ['0.5rem', '0.625rem'],
				// 9: ['0.5625rem', '0.75rem'],
				// 10: ['0.625rem', '0.875rem'],
				// 11: ['0.6875rem', '1rem'],
				// 12: ['0.75rem', '1.125rem'],
				// 13: ['0.8125rem', '1.125rem'],
				// 14: ['0.875rem', '1.25rem'],
				// 15: ['15px', '22px'],
				// 16: ['1rem', '1.5rem'],
				// 18: ['1.125rem', '1.75rem'],
				// 20: ['1.25rem', '1.875rem'],
				// 24: ['1.5rem', '2rem'],
				// 28: ['1.75rem', '2rem'],
				// 32: ['2rem', '3rem'],
				// 36: ['36px', '43.21px']
			},
			colors: {
				'kpurple-50': '#5431E4' /* Renewal Kims Purple 10 */,
				'kpurple-40': '#8167EB' /* Renewal Kims Purple 30 */,
				'kpurple-10': '#F8F1FF' /* Renewal Kims Purple -10 */,
				'kpink-70': '#7B002C' /* Renewal Kims Pink 30 */,
				'kpink-60': '#CD004A' /* Renewal Kims Pink 20*/,
				'kpink-50': '#FF1F70' /* Renewal Kims Pink 10*/,
				'kpink-40': '#FF71A4' /* Renewal Kims Pink */,
				'kpink-30': '#FFC3D8' /* Renewal Kims Pink -10*/,
				'kpink-20': '#FFEBF2' /* Renewal Kims Pink -20*/,
				'kpink-10': '#FFF7F8' /* Renewal Kims Pink -30*/,
				'kgreen-70': '#0A6B5B' /* Renewal Kims Green 30 */,
				'kgreen-60': '#0D907A' /* Renewal Kims Green 20*/,
				'kgreen-50': '#11B69A' /* Renewal Kims Green 10*/,
				'kgreen-40': '#14DBBA' /* Renewal Kims Green */,
				'kgreen-30': '#9DECDB' /* Renewal Kims Green -10*/,
				'kgreen-20': '#D9FCF6' /* Renewal Kims Green -20*/,
				'kgreen-10': '#EEFCFA' /* Renewal Kims Green -30*/,
				'kblue-70': '#003B66' /* Renewal Kims Blue 30 */,
				'kblue-60': '#005FA3' /* Renewal Kims Blue 20*/,
				'kblue-50': '#0082E0' /* Renewal Kims Blue 10*/,
				'kblue-40': '#0094FF' /* Renewal Kims Blue */,
				'kblue-30': '#67BFFF' /* Renewal Kims Blue -10*/,
				'kblue-20': '#B0E7FF' /* Renewal Kims Blue -20*/,
				'kblue-10': '#EAFBFF' /* Renewal Kims Blue -30*/,
				'korange-70': '#943F00' /* Renewal Kims Orange 30 */,
				'korange-60': '#B34C00' /* Renewal Kims Orange 20*/,
				'korange-50': '#E06000' /* Renewal Kims Orange 10*/,
				'korange-40': '#FF6D00' /* Renewal Kims Orange */,
				'korange-30': '#FFC599' /* Renewal Kims Orange -10*/,
				'korange-20': '#FFE2CC' /* Renewal Kims Orange -20*/,
				'korange-10': '#FFF0E5' /* Renewal Kims Orange -30*/,
				'grey-0': '#FFFFFF' /*Renewal GRAYSCALE 0*/,
				'grey-10': '#F8F8F8' /*Renewal GRAYSCALE 10*/,
				'grey-20': '#F0F0F0' /*Renewal GRAYSCALE 20*/,
				'grey-30': '#E0E0E0' /*Renewal GRAYSCALE 30*/,
				'grey-40': '#C9C9C9' /*Renewal GRAYSCALE 40*/,
				'grey-50': '#AAAAAA' /*Renewal GRAYSCALE 50*/,
				'grey-60': '#808080' /*Renewal GRAYSCALE 60*/,
				'grey-70': '#5D5D5D' /*Renewal GRAYSCALE 70*/,
				'grey-80': '#444444' /*Renewal GRAYSCALE 80*/,
				'grey-90': '#242424' /*Renewal GRAYSCALE 90*/,
				'error-a70': 'rgba(208, 26, 0, 0.7)' /*Renewal #D01A00 alpha 70% */,
				'error-70': '#8e1200' /* Renewal Error 30 */,
				'error-60': '#B71700' /* Renewal Error 20*/,
				'error-50': '#E01C00' /* Renewal Error 10*/,
				'error-40': '#FF3A1E' /* Renewal Error */,
				'error-30': '#FF9384' /* Renewal Error -10*/,
				'error-20': '#FFB7AD' /* Renewal Error -20*/,
				'error-10': '#FFE8E5' /* Renewal Error -30*/,
				'success-70': '#005999' /* Renewal Success 30 */,
				'success-60': '#124dbft' /* Renewal Success 20*/,
				//'success-50': '#E01C00', /* Renewal Success 10*/
				'success-40': '#0094FF' /* Renewal Success */,
				//'success-30': '#ff9384', /* Renewal Success -10*/
				'success-20': '#bdd2f9' /* Renewal Success -20*/,
				'success-10': '#E5F4FF' /* Renewal Success -30*/,
				'kyellow-60': '#FF7A00' /* Renewal kims yellow 20*/,
				'kyellow-20': '#FFF7CA' /* Renewal kims yellow -20*/,
				'kyellow-10': '#FFF8EA' /* Renewal kims yellow -30*/,
				bronze: '#CF9B6A',
				silver: '#B2C4D1',
				gold: '#FDCB4B',
				platinum: '#68E5CF',
				dia: '#69DAE1',
				master: '#FF7E62',
				challenger: '#628EFF'
			},
			width: length,
			height: length,
			spacing: length,
			padding: length,
			margin: length
		},
		borderRadius: {
			0: '0px',
			4: '4px',
			DEFAULT: '4px',
			6: '6px',
			8: '8px',
			10: '10px',
			12: '12px',
			15: '15px',
			16: '16px',
			24: '24px',
			full: '100%'
		},
		fontWeight: {
			'weight-100': 100,
			'weight-200': 200,
			'weight-300': 300,
			'weight-400': 400,
			'weight-500': 500,
			'weight-600': 600,
			'weight-700': 700,
			'weight-800': 800,
			'weight-900': 900
		},
		variants: {
			lineClamp: ['responsive', 'hover'],
			// 특정 속성의 반응형 유틸리티 사용 가능하게 확장
			left: ['laptop'],
			transform: ['laptop']
		}
	},
	plugins: [require('tailwind-scrollbar-hide'), require('@tailwindcss/line-clamp')]
};

