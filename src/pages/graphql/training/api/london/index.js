import React from 'react'
import Helmet from 'react-helmet'

import { BOOTCAMP } from 'src/../images/imageNames'
import Layout from 'src/components/layout'
import Section, { TopSection } from 'src/components/layout/Section'
import Grid, { Col, Row } from 'src/components/layout/Grid'
import { H2Ref, P } from 'src/components/text'
import Ul, { Li } from 'src/components/layout/Ul'
import { CurriculumGraphQLAPI } from 'src/components/curriculum'
import { Card, Video } from 'src/components/elements'
import { HideComponentsUsingCss } from 'src/components/utils'
import Header from 'src/components/layout/Header'
import { BOOTCAMP_COLLAB } from 'src/config/images'
import {
  UpcomingTrainingSection,
  TrainingDetails,
  ALEX_LOBERA,
  selectUpcomingTrainings,
  selectNthTraining,
  getUpcomingTrainingsByType,
  AlternativeTrainings,
} from 'src/components/training'
import { Image } from 'src/components/elements'
import header from 'src/components/layout/Header.json'
import { PaymentSection } from 'src/components/payment'
import { Link, Breadcrumb } from 'src/components/navigation'
import {
  GRAPHQL_API,
  GRAPHQL_CLIENT,
  GRAPHQL_BOOTCAMP,
  REACT_FUNDAMENTALS,
  LONDON,
} from 'src/config/data'
import { LIST_TWO_COL } from 'src/components/curriculum/selectCurriculumLayout'
import { createSocialMetas } from 'src/components/utils'

const metas = {
  title: 'GraphQL API Training in London | React GraphQL Academy',
  description:
    'Looking for a GraphQL API training in London? Learn how to build GraphQL APIs with our experts in London. Contact us now!',
  image: BOOTCAMP_COLLAB,
  type: 'website',
}

const BootcampLondon = () => (
  <Layout>
    {({ trainings, trainingLoading, trainingError }) => {
      const upcomingGqlTrainings = selectUpcomingTrainings({
        trainings,
        type: GRAPHQL_API,
        city: LONDON,
      })
      const training =
        selectNthTraining({ trainings: upcomingGqlTrainings }) || {}
      const crossSellTrainings = getUpcomingTrainingsByType({
        trainings,
        types: [GRAPHQL_BOOTCAMP, GRAPHQL_CLIENT, REACT_FUNDAMENTALS],
      })
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
              { to: '/graphql', label: 'GraphQL' },
              { to: '/graphql/training', label: 'Training' },
              { to: '/graphql/training/api', label: 'API' },
              { to: '/graphql/training/api/london', label: 'London' },
            ]}
          />
          <Header
            titleLines={['Build GraphQL APIs', `with experts in London`]}
            subtitle="Take your dev career to the next level by learning how to build real-world GraphQL APIs"
            links={header.landingTraining.links}
            bgImageName={BOOTCAMP}
            type={GRAPHQL_API}
            training={training}
            showInfoBox={true}
          />
          <TopSection xsBgDark>
            <Grid>
              <Card bg="dark">
                <Row>
                  <Col md={6} lg={5} lgOffset={1}>
                    <PaymentSection
                      training={training}
                      trainingError={trainingError}
                      trainingLoading={trainingLoading}
                    />
                  </Col>
                  <Col md={6} lg={4} lgOffset={1}>
                    <Video youtubeId="2-IPT7Plsfc" />
                    <TrainingDetails coaches={[ALEX_LOBERA]} />
                  </Col>
                </Row>
              </Card>
            </Grid>
          </TopSection>
          <Section>
            <Grid>
              <Card border="shadow">
                <Row>
                  <Col lg={10} lgOffset={1}>
                    <CurriculumGraphQLAPI layout={LIST_TWO_COL} />
                  </Col>
                </Row>
              </Card>
            </Grid>
          </Section>

          <Section>
            <Grid>
              <Row>
                <HideComponentsUsingCss xs sm>
                  <Col md={6} lg={5}>
                    <Image src={BOOTCAMP_COLLAB} width="100%" />
                  </Col>
                </HideComponentsUsingCss>
                <Col md={4} lgOffset={1}>
                  <H2Ref>
                    Is this GraphQL API training right for me? Are you...{' '}
                    <Link to="#target-audience" name="target-audience">
                      #
                    </Link>
                  </H2Ref>
                  <Ul>
                    <Li>
                      A developer with 1+ year experience building backends and
                      REST APIs?
                    </Li>
                    <Li>
                      Do you have some experience with JavaScript and npm?
                    </Li>
                    <Li>
                      Not satisfied with the pace of online learning and it's
                      lack of 1-on-1 mentoring and real-world examples?
                    </Li>
                  </Ul>
                  <P>
                    If you've said 'yes' to these, our training could be for
                    you!
                  </P>
                </Col>
              </Row>
            </Grid>
          </Section>
          <Section>
            <Grid>
              <Row>
                <Col lg={10} lgOffset={1}>
                  <AlternativeTrainings trainings={crossSellTrainings} />
                </Col>
              </Row>
            </Grid>
          </Section>

          <UpcomingTrainingSection trainings={trainings} />
        </React.Fragment>
      )
    }}
  </Layout>
)
export default BootcampLondon
