import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();

	const { data: user } = await supabase
		.from('users')
		.select(`first_name, last_name, pseudo, email, status, promo`)
		.eq('id', session.user.id)
		.single();

	return { session, user };
}) satisfies PageServerLoad;

export const actions = {
	update: async ({ request, locals: { supabase, getSession } }) => {
		const formData = await request.formData();
		const first_name = formData.get('first_name') as string;
		const last_name = formData.get('last_name') as string;
		const pseudo = formData.get('pseudo') as string;
		const email = formData.get('email') as string;
		const status = formData.get('status') as string;
		const promo = formData.get('promo') as string;

		const session = await getSession();

		const { error } = await supabase.from('users').upsert({
			id: session?.user.id,
			first_name: first_name,
			last_name: last_name,
			pseudo: pseudo,
            email: email,
            status: status,
            promo: promo,
			updated_at: new Date()
		});

		if (error) {
			return fail(500, {
				first_name,
                last_name,
                pseudo,
                email,
                status,
                promo
			});
		}

		return {
			first_name,
            last_name,
            pseudo,
            email,
            status,
            promo
		};
	}
} satisfies Actions;