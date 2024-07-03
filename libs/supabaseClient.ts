import { createClient } from '@supabase/supabase-js';
import { Database } from '../database.types';

export const supabase =
	createClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL ?? '', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '');

export const signInWithGoogle = async () => {
	const { error } = await supabase.auth.signInWithOAuth({
		provider: 'google'
	});

	if (error) {
		console.error('Error logging in with Google:', error.message);
	}
};
