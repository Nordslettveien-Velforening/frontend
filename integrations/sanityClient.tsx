import sanityClient from "@sanity/client";

export type BlockContent = []

export type MainMenuItem = {
    id: string,
    slug: string,
    title: string
}

export type RootPage = {
    id: string,
    title: string,
    body: BlockContent,
    updatedAt: Date,
    subpages: [ContentSection]
}

export type ContentSection = {
    id: string,
    title: string,
    body: ContentSection,
    slug: string
}

const client = sanityClient({
    projectId: "i747gtty",
    dataset: "test",
    token: "", // or leave blank to be anonymous user
    useCdn: false // `false` if you want to ensure fresh data
})

export const getMainMenuItems = (): Promise<MainMenuItem[] > => {
    const query = `*[_type== 'rootPage']{
        'id':_id, title, 'slug': slug.current
    }`
    return client.fetch(query)
}

export const getRootPage = (slug: string): Promise<RootPage | undefined> => {
    const query = `*[_type == 'rootPage' && slug.current == $slug] {
           'id':_id, title, body,'updatedAt':_updatedAt,
            subpages[]{ "id":_key, title, body, "slug":slug.current}
    }`

    return client.fetch(query, {slug}).then(result => {
        return result && result.length === 1 ? {...result[0] } : undefined
    })

}
