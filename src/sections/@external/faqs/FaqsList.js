import { Accordion, AccordionSummary, AccordionDetails, Grid, Container } from '@mui/material';
import Iconify from '../../../components/Iconify';
// material
// utils
//

// ----------------------------------------------------------------------

const allFaqs = [
  {
    id: 1,
    value: `panel1`,
    heading: 'What is Lemox',
    detail: `Lemox is a marketplace where you can co-invest in tokenized real estate from as low as $100, receive rentals and sell ownership tokens at any time.`,
  },
  {
    id: 2,
    value: `panel2`,
    heading: 'How does the Lemox Marketplace work?',
    detail: `Lemox is not a fund. We do not purchase properties, flip them, and then sell them on our website.
    Instead, we are a marketplace like Airbnb, eBay, or Amazon.
    The Lemox marketplace consists of buyers (token holders) and sellers (people who want to sell their properties). These sellers have years of experience rehabbing and selling turnkey properties with a great track record.`,
  },
  {
    id: 3,
    value: `panel3`,
    heading: 'How can I invest in real estate with Lemox?',
    detail: `You can invest in tokenized real estate by buying tokens that represent fractional digital ownership of a particular property or portfolio. In order to do that, you have to register on our platform, pass the KYC (Know Your Customer) procedure and complete your investor profile. Then, select the offering you like and invest.`,
  },
  {
    id: 4,
    value: `panel4`,
    heading: 'Who can invest?',
    detail:
      'Permanent residents of whitelisted countries over 18 years old can open an investor account on our platform. If you are from a sanctioned country, you will not be able to purchase tokens due to restrictions by the Office of Foreign Assets Control (OFAC). Sanctioned countries include Balkans, Belarus, Burma, Côte D’Ivoire (Ivory Coast), Cuba, Democratic Republic of Congo, Iran, Iraq, Liberia, North Korea, Sudan, Syria, and Zimbabwe.',
  },
  {
    id: 5,
    value: `panel5`,
    heading:
      'In the case of a purchase requiring renovation or work, who is responsible for the execution, site monitoring, and payment?',
    detail: `All properties listed are being managed by property management companies and they handle the
    renovations as well, the costs are the responsibility of the SAS carrying the property and
    managed by the Property Manager.`,
  },
  {
    id: 6,
    value: `panel6`,
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
  {
    id: 10,
    value: `panel10`,
    heading: 'If the tenant terminates, how does the rent-free step go, who handles this situation?',
    detail: `The Real Estate Manager's mission is to find a new tenant as soon as possible.`,
  },
  {
    id: 11,
    value: `panel11`,
    heading: 'What guarantee do I have this project is legitimate?',
    detail: `1. As Lemox, we want to guarantee full transparency about the building and the entire tokenization process, building are LLC owned and thoroughly investigated
    2. The core founders have a combined real estate development experience of over 50 years.
   `,
  },
  {
    id: 12,
    value: `panel12`,
    heading: 'Am I liable if my co-token holders are linked to fraudulent activity?',
    detail: `
    No fraudulent activity is accepted and we ensure the careful verification of each file. You are not responsible for the activities of your associates as stipulated in the articles of association that you have signed or will have to sign as a token holder.
   `,
  },
  {
    id: 13,
    value: `panel13`,
    heading: 'What are my risks when investing?',
    detail: `
    The goal of the Lemox team is to make a careful selection of different projects to make sure that you only invest in quality programs. However, any investment involves risks, we have listed for you the risks that you bear as an investor:
RENTAL RISK: An extended vacancy of one or more lots would reduce the return on the investment.
WORK RISK: During the duration of the project, unscheduled work may need to be carried out
INSURANCE RISK: The insurance taken out could not fully cover damage to the property.
CASH RISK: The available cash could be insufficient to meet the commitments.
REAL ESTATE RISK: The total or partial destruction of the building could cause a loss of the investment.
LIQUIDITY RISK: A partner wishing to sell his tokens may not find a buyer.
 `,
  },
  {
    id: 14,
    value: `panel14`,
    heading: 'When will I get my tokens?',
    detail: `
    You will be allocated purchased tokens only after being KYC approved and once your payment has been received. `,
  },
  {
    id: 15,
    value: `panel15`,
    heading: 'When can I cash out my profits?',
    detail: `
    You can cash out your rental profit whenever you like, we offer dividends payouts in Crypto (BTC). `,
  },
  {
    id: 16,
    value: `panel16`,
    heading: 'What would happen if Lemox ceased operating??',
    detail: `
    Commercial real estate listed on our platform is owned by SPVs (Special Purpose Vehicles). Each offering has its own SPV so that it is independent from both Lemox and SPVs established for other properties. This way, if something happens to Lemox, it will not affect any SPV or your tokens – your ownership is recorded on blockchain and is legally binding, as per the U.S. Securities and Exchange Commission.
 `,
  },
  {
    id: 17,
    value: `panel17`,
    heading: 'Can I sell my tokens anytime?',
    detail: `
    Yes, currently tokens can be sold anytime for no fees or penalties. If you would like to liquidate your tokens, please reach out to support@lemox.io  and we will refund your original purchase method once we receive your tokens to our company wallet. `,
  },
  {
    id: 18,
    value: `panel18`,
    heading: 'How does Lemox make money?',
    detail: `
    We have a 5% listing fee on each deal. Lemox charges investors a 3% fee a month on withdrawal. `,
  },
  {
    id: 19,
    value: `panel19`,
    heading: 'Do I have to pay for tokenizing my property upfront?',
    detail: `
    Yes, Our tokenization clients are charged an upfront fee of 5% of the total value of the property after we have done a thorough investigation and assessment of the property.`,
  },
  {
    id: 20,
    value: `panel20`,
    heading: 'Is it possible to lose more than your investment?',
    detail: `
    No, by investing through a simplified joint-stock company, you cannot lose more than the amount invested. The liability of SAS partners is limited to their respective contributions.`,
  },
  {
    id: 21,
    value: `panel21`,
    heading: 'How do taxes work?',
    detail: `
    Investors are subjected to withholding taxes when you try to sell their tokens for a gain or withdraw your rental income. `,
  },
  {
    id: 22,
    value: `panel22`,
    heading: 'What legal work do I have to do for tokenization?',
    detail: `
    Lemox takes care of all the legal work required for tokenization, such as creating an SPV and issuing digital shares. You will only have to provide us with some property-related documents, such as proof of ownership. `,
  },
  {
    id: 23,
    value: `panel23`,
    heading: 'Does Lemox own the assets?',
    detail: `
    No. Every asset sold through  Lemox smart contract is owned by a separate special purpose vehicle (SPV), as it would be in a traditional investment structure. Token holders own digital shares of this SPV. `,
  },
  {
    id: 24,
    value: `panel24`,
    heading: 'What type of real estate can I tokenize?',
    detail: `
    You can tokenize all types of real estate which includes apartment buildings, warehouses, offices, hotels, retail centers.`,
  },
  {
    id: 25,
    value: `panel25`,
    heading: 'What is the minimum/maximum value of the property I can tokenize?',
    detail: `
    There is no minimum/maximum value of the property you can tokenize.`,
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
                <AccordionSummary expandIcon={<Iconify icon="bytesize:arrow-right" width={20} height={20} />}>
                  <p className="my-1">
                    <strong>{accordion.heading}</strong>
                  </p>
                </AccordionSummary>
                <AccordionDetails>
                  <p className="mb-0">{accordion.detail}</p>
                </AccordionDetails>
              </Accordion>
            ))}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
