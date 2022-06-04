import { Icon } from '@iconify/react';
// material
import { Accordion, Typography, AccordionSummary, AccordionDetails, Grid, Container } from '@mui/material';
// utils
//

// ----------------------------------------------------------------------

const allFaqs = [
  {
    id: 0,
    value: `panel1`,
    heading: 'What is Lemox',
    detail: `Lemox is a marketplace where you can co-invest in tokenized real estate from as low as $100, receive rentals and sell ownership tokens at any time.`,
  },
  {
    id: 1,
    value: `panel1`,
    heading: 'How does the Lemox Marketplace work?',
    detail: `Lemox is not a fund. We do not purchase properties, flip them, and then sell them on our website.
    Instead, we are a marketplace like Airbnb, eBay, or Amazon.
    The Lemox marketplace consists of buyers (token holders) and sellers (people who want to sell their properties). These sellers have years of experience rehabbing and selling turnkey properties with a great track record.`,
  },
  {
    id: 2,
    value: `panel2`,
    heading: 'How can I invest in real estate with Lemox?',
    detail: `You can invest in tokenized real estate by buying tokens that represent fractional digital ownership of a particular property or portfolio. In order to do that, you have to register on our platform, pass the KYC (Know Your Customer) procedure and complete your investor profile. Then, select the offering you like and invest.`,
  },
  {
    id: 3,
    value: `panel3`,
    heading: 'Who can invest?',
    detail:
      'Permanent residents of whitelisted countries over 18 years old can open an investor account on our platform. If you are from a sanctioned country, you will not be able to purchase tokens due to restrictions by the Office of Foreign Assets Control (OFAC). Sanctioned countries include Balkans, Belarus, Burma, Côte D’Ivoire (Ivory Coast), Cuba, Democratic Republic of Congo, Iran, Iraq, Liberia, North Korea, Sudan, Syria, and Zimbabwe.',
  },
  {
    id: 4,
    value: `panel4`,
    heading:
      'In the case of a purchase requiring renovation or work, who is responsible for the execution, site monitoring, and payment?',
    detail: `All properties listed are being managed by property management companies and they handle the
    renovations as well, the costs are the responsibility of the SAS carrying the property and
    managed by the Property Manager.`,
  },
  {
    id: 5,
    value: `panel5`,
    heading: 'In the event of a resale of its tokens, are there any costs?',
    detail: `All properties listed are being managed by property management companies and they handle the
    renovations as well, the costs are the responsibility of the SAS carrying the property and
    managed by the Property Manager.`,
  },

  {
    id: 7,
    value: `panel7`,
    heading: 'What are the payment methods?',
    detail: `You will pay for your tokens strictly via crypto (BTC, BNB, USDT, ETH).`,
  },
  {
    id: 8,
    value: `panel8`,
    heading: 'How often do I receive rent?',
    detail: `You receive rent weekly and can withdraw at any time. You can track and withdraw your dividends from your Lemox profile.`,
  },
  {
    id: 9,
    value: `panel9`,
    heading: 'How do I earn? what will be the yield of my investment?',
    detail: `There are 2 ways your Lemox investment will increase and both are happening at the same time: 1. You get revenue from the cash flow (rent) the property is generating, which is being paid directly to your portfolio. 2. You benefit from the increase in the value of the property.`,
  },
];
// ----------------------------------------------------------------------

export default function FaqsList() {
  return (
    <>
      <Container>
        <Grid container>
          <Grid item sm={12} md={4} className="col-md-4" sx={{ justifyContent: 'space-between' }}>
            <div className="position-sticky mb-8" style={{ top: '2rem' }}>
              <h1 className="mb-4">General FAQ</h1>
              <p className="mb-0">
                If you're new to Lemox or looking to invest in real estate, this guide will help you learn more about
                the platform and its features.
              </p>
            </div>
          </Grid>
          <Grid item md={8} sm={12}>
            {allFaqs.map((accordion) => (
              <Accordion key={accordion.value}>
                <AccordionSummary expandIcon={<Icon width={20} height={20} />}>
                  <Typography>{accordion.heading}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body1" color="text.primary">
                    {accordion.detail}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
