import { atom } from 'recoil';
import { User } from '@supabase/supabase-js';
import { Tables } from '../database.types';

export const MyKey = '16c7090915034608bda85c2b4bd8c1a8';
export const loginUserState = atom<UserInfo | null>({
	key: 'loginUserState',
	default: null
});

export const needLoginState = atom<boolean>({
	key: 'needLoginState',
	default: false
});

export interface UserInfo extends User {
	nickname?: string;
	likedFacs?: string | null;
}

export interface AdviceDetail extends Tables<'advice'> {
	nickname?: string | null;
	reply_count?: number;
}

export interface AdviceComment extends Tables<'advice_comment'> {
	nickname?: string | null;
}

export interface Facility {
	BIZPLC_NM?: string;
	SIGUN_NM?: string;
	REFINE_LOTNO_ADDR?: string;
	LICENSG_DE?: string;
	MEDCARE_INST_ASORTMT_NM?: string;
	TREAT_SBJECT_CONT?: string;
	SICKBD_CNT?: number;
	MEDSTAF_CNT?: number;
	REFINE_WGS84_LAT?: string;
	REFINE_WGS84_LOGT?: string;
}