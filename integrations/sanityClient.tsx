import sanityClient from "@sanity/client";
import { SanityReference } from "@sanity/image-url/lib/types/types";

export type BlockContent = []

export type MainMenuItem = {
    id: string,
    icon: string,
    slug: string,
    title: string
}

export type RootPage = {
    id: string,
    title: string,
    slug: string,
    body: BlockContent,
    updatedAt: Date,
    subpages: [ContentSection]
}

export type ContentSection = {
    id: string,
    title: string,
    body: BlockContent,
    slug: string
}

export type ContentReference = {
    id: string,
    documentType: string,
    slug: string
}

const clientConfig = {
    projectId: "i747gtty", //TODO: Read from .env
    dataset: "test",  //TODO: Read from .env
    apiVersion: '2021-04-01', // see https://www.sanity.io/help/js-client-api-version
    token: "", // or leave blank to be anonymous user
    useCdn: false // `false` if you want to ensure fresh data
}

export const client = sanityClient(clientConfig)

export const cdnClient = sanityClient({
    ...clientConfig,
    useCdn: true
});

const bodyProjection = `
    body[]{
        ...,
        markDefs[]{
          ...,
          _type == "internalLink" => {
            "slug": @.reference->slug.current,
          	"linkTo": @.reference->_type
          }
        }
      }
`
const rootPageProjection = `
    'id':_id, 
    title, 
    ${bodyProjection},
    "updatedAt":_updatedAt,
    "slug":slug.current,
    subpages[]-> {
        'id':_id, 
        title, 
        "slug":slug.current,
        ${bodyProjection}
    }`;

const unwrap = (result) => {
    return result && result.length === 1 ? {...result[0]} : undefined
}

export const getMainMenuItems = (): Promise<MainMenuItem[] > => {
    const query = `*[_type == "mainMenu"] { 
          menuItems[] {
            "id": rootPage->_id,
            icon,
            "title": rootPage->title,
            "slug": rootPage->slug.current
          }
        }`
    return client.fetch(query).then(unwrap).then(res => res.menuItems)
}

export const getRootPage = (slug: string): Promise<RootPage | undefined> => {

    const query = `
        *[_type == 'rootPage' && slug.current == $slug] {
            ${rootPageProjection}
        }
    `
    return client.fetch(query, {slug}).then(unwrap)
}

export const getReference = (id: string): Promise<ContentReference | undefined> => {
    const query = `*[_id == $id] {
            "id": _id,
            "documentType": _type,
            "slug": slug.current
        }`

    return client.fetch(query, {id}).then(unwrap)
}

export function getContentSectionParent(ref: SanityReference):Promise<RootPage | undefined> {
    const query = `*[_type == "rootPage" && references($id)] {
        ${rootPageProjection}
    }`
    return client.fetch(query, {id: ref._ref}).then(unwrap)
}
