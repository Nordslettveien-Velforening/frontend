import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
const BlockContent = require('@sanity/block-content-to-react')
import DefaultErrorPage from 'next/error'
import { getRootPage, RootPage } from "../../integrations/sanityClient";
import Accordion from "../../components/ui/accordion/accordion";

const SimplePage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>()
  const [error, setError] = useState();
  const [page, setPage] = useState<RootPage>();
  const { slug } = Array.isArray(router.query) ? router.query[0] : router.query;

  useEffect(() => {
    if (slug) {
      setLoading(true)
      getRootPage(slug).then(page => {
        setPage(page)
        setLoading(false)
      })
    }
  }, [slug])

  if(!slug) return null;

  if (error)  {
    return <DefaultErrorPage statusCode={500} />
}
  if (loading) return <div>Loading</div>;
  if (!page) return <DefaultErrorPage statusCode={404} />

  console.log(page)
  return (
    <section>
      <h1>{page.title}</h1>
      <BlockContent blocks={page.body}/>
      <Accordion>
        { page.subpages.map(subpage => (
            <div key={subpage.id} title={subpage.title} id={subpage.id}>
              <BlockContent blocks={subpage.body}/>
            </div>
        ))}
      </Accordion>

    </section>
  );
};

export default SimplePage;
