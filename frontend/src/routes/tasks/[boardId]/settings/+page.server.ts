import type { PageServerLoad } from './$types.js';

export const load = (async ({parent}) => {
    console.log(parent)
    return {};
}) satisfies PageServerLoad;