import React from 'react';
import { Container } from '@mui/material';

export default function Team() {
  const lemoxTeam = [
    {
      fullName: 'Peter Aman',
      role: 'CEO',
      image: 'https://res.cloudinary.com/codack/image/upload/v1654384251/lemox/team/photo1654373296_anyyr4.jpg',
    },
    {
      fullName: 'Tiffany Frazee',
      role: 'Cheif Fianancial Officer',
      image: 'https://res.cloudinary.com/codack/image/upload/v1654384253/lemox/team/photo1654373309_dgfa3n.jpg',
    },
    {
      fullName: 'Kevin Brändli',
      role: 'Blockchain Developer',
      image: 'https://res.cloudinary.com/codack/image/upload/v1654384259/lemox/team/photo1654373444_umoxkq.jpg',
    },
    {
      fullName: 'Isaac Veltmate',
      role: 'Chief Technology Officer',
      image: 'https://res.cloudinary.com/codack/image/upload/v1654384261/lemox/team/photo1654373501_paoit9.jpg',
    },
  ];
  return (
    <section className="pt-10 pt-md-8 bg-dark">
      <Container>
        <div className="container-lg">
          <div className="row align-items-center mb-9">
            <div className="col-12 col-md">
              <h2 className="display-4 text-white mb-0">Our Team</h2>

              <p className="text-gray-500 mb-md-0" style={{ maxWidth: '768px' }}>
                Our founding team is composed of both real estate veterans with decades of accumulated experience in the
                field, and young tech-savvy entrepreneurs. We believe this provides us with an ideal complementary blend
                of skills to carry Lemox forward..
              </p>
            </div>
          </div>
          <div className="row mt-n5" id="team" data-isotope='{"layoutMode": "fitRows", "imagesLoaded": true}'>
            {lemoxTeam.map((team, index) => (
              <div className="col-6 col-md-3 founders investors" key={index}>
                <div className="card card-sm bg-transparent mt-5">
                  <img
                    className="card-img-top rounded-top-start rounded-bottom-end"
                    src={team.image}
                    alt={team.fullName}
                  />

                  <div className="card-body px-0 text-center">
                    <h5 className="font-sans-serif text-white mb-0">{team.fullName}</h5>

                    <small className="text-muted">{team.role}</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
