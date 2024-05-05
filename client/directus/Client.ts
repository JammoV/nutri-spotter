import { createDirectus, staticToken, rest } from '@directus/sdk'
import { DirectusSchema } from '@/client/directus/Schema'

const client = createDirectus<DirectusSchema>(
    process.env.DIRECTUS_BASE_URL as string
)
    .with(staticToken(process.env.DIRECTUS_ACCESS_KEY as string))
    .with(rest())

export default client
