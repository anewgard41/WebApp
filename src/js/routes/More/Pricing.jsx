import React, { Component } from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import AnalyticsActions from '../../actions/AnalyticsActions';
import { renderLog } from '../../utils/logging';
import Footer from '../../components/Welcome/Footer';
import Section from '../../components/Welcome/Section';
import VoterStore from '../../stores/VoterStore';
import PricingSwitch from '../../components/Widgets/PricingSwitch';
import WelcomeAppbar from '../../components/Navigation/WelcomeAppbar';
import { Title } from '../../components/Welcome/Header';
import PricingCard from '../../components/More/PricingCard';

class Pricing extends Component {
  static getProps () {
    return {};
  }

  constructor (props) {
    super(props);

    this.state = {
      selectedCategoryIndex: 0,
    };
  }

  componentDidMount () {
    AnalyticsActions.saveActionAboutMobile(VoterStore.electionId());
  }

  switchToDifferentCategoryFunction = (selectedCategoryIndex) => {
    this.setState({ selectedCategoryIndex });
  }

  render () {
    const { selectedCategoryIndex } = this.state;

    renderLog(__filename);
    return (
      <Wrapper>
        <Helmet title="Pricing - We Vote" />
        <WelcomeAppbar pathname="/more/pricing" />
        <HeaderForAbout>
          <Title>Pricing</Title>
        </HeaderForAbout>
        <Section>
          <AboutDescriptionContainer>
            <div className="container">
              <div className="u-show-mobile-tablet">
                <SwitchContainer>
                  <PricingSwitch
                    color="white"
                    choices={['Free', 'Professional', 'Enterprise']}
                    selectedCategoryIndex={selectedCategoryIndex}
                    switchToDifferentCategoryFunction={this.switchToDifferentCategoryFunction}
                  />
                </SwitchContainer>

                <div className="row">
                  {selectedCategoryIndex === 0 ? (
                    <PricingCard
                      fullWidth
                      planName="Free"
                      price={0}
                      priceDescribe="For life"
                      description="Just start creating: get a free site and be on your way to empowering your supporters in less than five minutes"
                      bullets={['Create your own endorsements', 'Add to your own website', 'See visitor metrics']}
                      buttonText="Start with Free"
                    />
                  ) : (
                    <React.Fragment>
                      {selectedCategoryIndex === 1 ? (
                        <PricingCard
                          fullWidth
                          premium
                          planName="Professional"
                          price={125}
                          priceDescribe="Per month billed annually"
                          description="Best for regional campaigns to grow your reach"
                          bullets={['Custom domain name', 'Prioritize unlimited endorsements', 'Fine tune for social media sharing']}
                          buttonText="Start with Professional"
                        />
                      ) : (
                        <PricingCard
                          fullWidth
                          premium
                          priceDescribe={null}
                          planName="Enterprise"
                          description="Best for local political clubs"
                          bullets={['Branding control', 'Analytics integration', 'Up to 3 administrators']}
                          buttonText="Request a Demo"
                        />
                      )}
                    </React.Fragment>
                  )}
                </div>
              </div>
              <div className="row u-show-desktop">
                <PricingCard
                  planName="Free"
                  price={0}
                  priceDescribe="For life"
                  description="Just start creating: get a free site and be on your way to empowering your supporters in less than five minutes"
                  bullets={['Create your own endorsements', 'Add to your own website', 'See visitor metrics']}
                  buttonText="Start with Free"
                />
                <PricingCard
                  premium
                  planName="Professional"
                  price={125}
                  priceDescribe="Per month billed annually"
                  description="Best for regional campaigns to grow your reach"
                  bullets={['Custom domain name', 'Prioritize unlimited endorsements', 'Fine tune for social media sharing']}
                  buttonText="Start with Professional"
                />
                <PricingCard
                  premium
                  priceDescribe={null}
                  planName="Enterprise"
                  description="Best for local political clubs"
                  bullets={['Branding control', 'Analytics integration', 'Up to 3 administrators']}
                  buttonText="Request a Demo"
                />
              </div>
            </div>
          </AboutDescriptionContainer>
        </Section>
        <Section>
          &nbsp;
        </Section>
        <Footer />
      </Wrapper>
    );
  }
}

const styles = theme => ({
  buttonContained: {
    borderRadius: 32,
    height: 50,
    [theme.breakpoints.down('md')]: {
      height: 36,
    },
  },
  buttonMaxWidth: {
    width: '100%',
  },
  iconButton: {
    color: 'white',
  },
});

const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  background: white;
  overflow-x: hidden;
`;

const HeaderForAbout = styled.div`
  position: relative;
  height: 190px;
  width: 110%;
  color: white;
  background-image: linear-gradient(to bottom, #415a99, #2d3b5e);
  border-bottom-left-radius: 50% 25%;
  border-bottom-right-radius: 50% 25%;
  padding: 0 2em;
  margin-top: -72px;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 190px;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    height: 190px;
  }
`;

const AboutDescriptionContainer = styled.div`
  margin: 1em auto;
  width: 960px;
  max-width: 90vw;
  text-align: left;
`;

const SwitchContainer = styled.div`
  background: #2e3c5d;
  border-radius: 50px;
  width: calc(100% - 30px);
  margin: 0 auto;
  padding: 4px;
  margin-bottom: 32px;
`;

export default withStyles(styles)(Pricing);
