// material
import { styled } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import { FaqsHero, FaqsCategory, FaqsList, FaqsForm } from '../sections/@external/faqs';

// ----------------------------------------------------------------------

// const RootStyle = styled(Page)(({ theme }) => ({

// }));

// ----------------------------------------------------------------------

export default function Faqs() {
  return (
    <Page title="Faqs">
      <FaqsHero />

      <Container sx={{ mt: 15, mb: 10 }}>
        <FaqsCategory />

        <Grid container spacing={10}>
          <Grid item xs={12} md={10}>
            <FaqsList />
          </Grid>
        </Grid>
      </Container>
      <section className="py-10 py-md-12">
        <div className="container-lg">
          <div className="row justify-content-center">
            <div className="col-md-10 col-lg-8 text-center">
              <hr className="hr-sm bg-warning mx-auto mb-10 mb-md-12" />
              <h2 className="display-3 mb-4">
                Didn’t find <span className="text-underline text-underline-warning">an answer</span>?
              </h2>
              <p className="text-gray-600 mb-9">
                Email your query to info@lemox.co <br />
                If you cannot find answer to your question in our FAQ, you can always contact us. We will answer you
                shortly!
              </p>
            </div>
          </div>
        </div>
      </section>
    </Page>
  );
}
