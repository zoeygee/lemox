import { Carousel } from 'react-carousel-minimal';

export default function PropertyCarousel({ images }) {
  console.log(images);
  return (
    <>
      {images ? (
        <div
          style={{
            padding: '0 20px',
          }}
        >
          <Carousel
            data={images}
            width="850px"
            height="300px"
            radius="10px"
            slideNumber
            captionPosition="bottom"
            automatic
            pauseIconColor="white"
            pauseIconSize="40px"
            slideBackgroundColor="darkgrey"
            slideImageFit="cover"
            thumbnails
            thumbnailWidth="100px"
            style={{
              textAlign: 'center',
              maxWidth: '850px',
              maxHeight: '300px',
              margin: '40px auto',
            }}
          />
        </div>
      ) : null}
    </>
  );
}
