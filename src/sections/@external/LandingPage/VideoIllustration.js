export default function VideoIllustration() {
  return (
    <div className="container pb-12">
      <div className="row">
        <div className="col-10 col-sm-12 mx-auto">
          <h1 className="display-4 mb-4">Invest easily in real estate</h1>
          <p className="text-muted">
            Buy slices of properties. Enjoy the financial benefits of ownership and let Lemox manage the rest.
          </p>

          <video width="100%" height="auto" controls loop muted={false} autoPlay>
            <source src="static/videos/video-illustration.mp4" type="video/mp4" />
            <track src="captions_en.vtt" kind="captions" srcLang="en" label="english_captions" />
          </video>
        </div>
      </div>
    </div>
  );
}
