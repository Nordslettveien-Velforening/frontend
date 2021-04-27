import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import DefaultErrorPage from 'next/error'
import { ContentSection, getRootPage, RootPage } from "../../integrations/sanityClient";
import Layout from "../../components/ui/layout/layout";
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Heading } from "@chakra-ui/react";
import PageHeading from "../../components/ui/elements/page-heading";
import BlockContent from "../../components/sanity/block-content";

const SimplePage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState(false);
  const [page, setPage] = useState<RootPage>();
  const [defaultOpenIndex, setDefaultOpenIndex] = useState<number | undefined>(undefined);
  const { slug } = Array.isArray(router.query) ? router.query[0] : router.query;

  useEffect(() => {
    if (slug) {
      setIsLoading(true)
      getRootPage(slug).then(page => {
        setPage(page)
        // Open content correct content section if url points to this.
        if (location.hash) {
          setDefaultOpenIndex(getIndexByHash(location.hash.substring(1), page.subpages))
        } else {
          setDefaultOpenIndex(undefined)
        }
        setIsLoading(false)
      }).catch(() => setError(true))
    }
  }, [slug])

  function getIndexByHash(hash: string, subpages: [ContentSection]) {
    return subpages.findIndex(page => page.slug === hash);
  }

  if(!isLoading && !slug) return <DefaultErrorPage statusCode={404} />
  if(!isLoading && !page) return <DefaultErrorPage statusCode={404} />
  if (error) return <DefaultErrorPage statusCode={500} />

  return (
    <Layout
        title={page && page.title}
        contentWidth="34rem"
        loading={isLoading}
    >
      <PageHeading>{page && page.title}</PageHeading>
      { page && page.subpages && (
        <Accordion allowToggle={true} defaultIndex={defaultOpenIndex} py={4}>
          { page.subpages.map(subpage => (
              <AccordionItem borderColor="purple.500" key={subpage.id}>
                <Heading as="h2" mb={0} lineHeight={8} id={subpage.slug}>
                  <AccordionButton px="0">
                    <Box flex="1" textAlign="left" color="purple.500" fontWeight="bold">
                      {subpage.title}
                    </Box>
                    <AccordionIcon color="purple.500" />
                  </AccordionButton>
                </Heading>
                <AccordionPanel pb={4}>
                  <BlockContent blocks={subpage.body}/>
                </AccordionPanel>
              </AccordionItem>
          ))}
        </Accordion>
      )}
      <Box pt={4}>
        {page && page.body &&
          <BlockContent blocks={page.body}/>
        }
      </Box>
    </Layout>
  );
};

export default SimplePage;
