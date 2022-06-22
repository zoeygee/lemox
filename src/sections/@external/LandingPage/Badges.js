export default function Badges() {
  const allbadges = [
    {
      name: 'chattlechain',
      link: 'https://proclass.chattlechain.com/defi/lemox-launches-new-asset-tokenization-platform-to-increase-global-access-to-real-estate-investment',
      img: 'static/badges/chattlechain.jpeg',
    },
    { name: 'startup', link: 'https://www.startupworldcup.io/', img: '/static/badges/startup.jpeg' },
    {
      name: 'Rapid',
      img: '/static/badges/rapidlei.jpeg',
      link: 'https://search.rapidlei.com/lei-record/636700GLDG7R8KT1AP15/',
    },
    { name: 'binance', img: 'static/badges/binance.png' },
    { name: 'probate', img: 'static/badges/probate.jpeg' },
    { name: 'bnb', img: 'static/badges/bnb.jpeg' },
  ];
  return (
    <>
      <section>
        <div className="container-lg mt-12">
          <div className="row mt-n5" style={{ justifyContent: 'center', alignItems: 'baseline' }}>
            {allbadges.map((badge, index) => (
              <div className="col-4 col-md-2 mt-5" key={index}>
                {badge.link ? (
                  <a href={badge.link} target="_blank" rel="noreferrer">
                    <div className="img-fluid svg-shim mx-auto" style={{ maxWidth: '112px' }}>
                      <img src={badge.img} alt="badge" />
                    </div>
                  </a>
                ) : (
                  <div className="img-fluid svg-shim mx-auto" style={{ maxWidth: '112px' }}>
                    <img src={badge.img} alt="badge" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
