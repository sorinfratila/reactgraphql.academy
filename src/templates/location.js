import React from 'react'
import Helmet from 'react-helmet'
import rehypeReact from 'rehype-react'

import Layout from 'src/components/layout'
import { Link } from 'src/components/navigation'
import { TopSection, ColSection } from 'src/components/layout/Section'
import { Col, Row } from 'src/components/layout/Grid'
import { P, Span, H2, H3, H4, H5 } from '../components/text'
import Header from 'src/components/layout/Header'
import {
  UpcomingTrainingSection,
  UpcomingTrainingTabs,
  selectUpcomingTrainings,
} from 'src/components/training'
import Ul, { Li } from 'src/components/layout/Ul'
import TrustedBySection from 'src/components/training/TrustedBySection'
import { Segment } from 'src/components/elements'
import { WHY_GQLU_ACADEMY } from 'src/config/images.js'
import { Breadcrumb } from 'src/components/navigation'
import BlogSection from 'src/components/blog/BlogSection'
import { createSocialMetas } from 'src/components/utils'
import { titleCase } from 'src/components/utils/text'
import Gallery from 'src/components/elements/Gallery'

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    a: ({ className, ...rest }) => (
      <Link className={`${className} location-description`} {...rest} />
    ),
    p: P,
    h2: H2,
    h3: H3,
    h4: H4,
    h5: H5,
    ul: Ul,
    li: Li,
    span: Span,
  },
}).Compiler

const massageGalleryImages = images =>
  images.edges
    .filter(({ node }) => node.childImageSharp)
    .map(
      ({
        node: {
          childImageSharp: {
            fluid: { src, presentationHeight, presentationWidth, originalName },
          },
        },
      }) => ({
        src,
        presentationHeight,
        presentationWidth,
        originalName,
      })
    )
    .sort((a, b) => (a.originalName > b.originalName ? 1 : -1))

const Location = ({ path, data }) => (
  <Layout>
    {({ trainings }) => {
      const { htmlAst, frontmatter } = data.markdownRemark
      const { city } = frontmatter
      const capitalCity = titleCase(city)
      const lowerCaseCity = city.toLowerCase()

      const metas = {
        title: `${capitalCity} React GraphQL Academy`,
        description: `Learn React and GraphQL in ${capitalCity} | React GraphQL Academy`,
        image: WHY_GQLU_ACADEMY,
        type: 'website',
      }

      const upcomingEvents = selectUpcomingTrainings({
        trainings,
        city,
      })

      const smallGalleryImages = massageGalleryImages(data.smallImages)
      const largeGalleryImages = massageGalleryImages(data.largeImages)

      const galleryImages = smallGalleryImages.map(
        (
          { src, presentationHeight, presentationWidth, originalName },
          index
        ) => {
          return {
            srcSmall: src,
            srcLarge: largeGalleryImages[index].src,
            height: presentationHeight,
            width: presentationWidth,
            originalName,
          }
        }
      )

      return (
        <React.Fragment>
          <Helmet
            title={metas.title}
            meta={[
              {
                name: 'description',
                content: metas.description,
              },
            ]}
          >
            {createSocialMetas(metas)}
          </Helmet>
          <Breadcrumb
            path={[
              { to: '/', label: 'Home' },
              { to: '/locations', label: 'Locations' },
              { to: path, label: capitalCity },
            ]}
          />
          <Header
            titleLines={[`React GraphQL Academy ${capitalCity}`]}
            subtitle={`The React and GraphQL hub in ${capitalCity}`}
            bgImageName={lowerCaseCity}
            links={[
              {
                text: 'Upcoming events',
                to: '#upcoming',
              },
              {
                text: 'Venues',
                to: '#venues',
              },
            ]}
          />
          <TopSection mt={-250}>
            <Segment border="shadow">
              <Link to="#upcoming" name="upcoming" />
              <Row>
                <Col lg={10} lgOffset={1}>
                  <H2>Upcoming events in {capitalCity}</H2>
                  <UpcomingTrainingTabs trainings={upcomingEvents} limit={12} />
                </Col>
              </Row>
            </Segment>
          </TopSection>

          <ColSection
            variant="thinRight"
            col={
              <Gallery
                className="pictures-city-gallery"
                photos={galleryImages}
                pageLimit={3}
              />
            }
            col2={
              <React.Fragment>
                <H2>
                  <a name="venues" />
                  {capitalCity} best tech venues and talent
                </H2>
                {renderAst(htmlAst)}
              </React.Fragment>
            }
          />
          <TrustedBySection />
          <BlogSection tags={[lowerCaseCity]} />
          <UpcomingTrainingSection trainings={trainings} />
        </React.Fragment>
      )
    }}
  </Layout>
)

export const query = graphql`
  query location($slug: String!, $regex: String!) {
    smallImages: allFile(filter: { absolutePath: { regex: $regex } }) {
      edges {
        node {
          childImageSharp {
            fluid(maxWidth: 600) {
              src
              presentationHeight
              presentationWidth
              originalName
            }
          }
        }
      }
    }
    largeImages: allFile(filter: { absolutePath: { regex: $regex } }) {
      edges {
        node {
          childImageSharp {
            fluid(maxWidth: 1200) {
              src
              presentationHeight
              presentationWidth
              originalName
            }
          }
        }
      }
    }

    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        city
        # TODO use this instead of the code above when we now how to do it using different sizes from markdown images
        # galleryImagesSrc {
        #   publicURL
        #   childImageSharp {
        #     original {
        #       width
        #       height
        #     }
        #   }
        # }
      }
      htmlAst
    }
  }
`

export default Location
