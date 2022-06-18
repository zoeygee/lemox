// src/reusable/image-gallery.component.js
import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { RViewer, RViewerTrigger } from 'react-viewerjs';

export default function PropertyCarousel({ images }) {
  const opt = {
    rewind: true,
    fixedWidth: '100%',
    fixedHeight: '440px',
    isNavigation: true,
    focus: 'center',
    pagination: true,
    cover: true,
    dragMinThreshold: {
      mouse: 4,
      touch: 10,
    },
  };
  return (
    <div>
      {!images ? (
        'loading...'
      ) : (
        <RViewer imageUrls={images}>
          <Splide aria-label="property-images" options={opt}>
            {images.map((image, index) => (
              <SplideSlide key={index}>
                <RViewerTrigger index={index}>
                  <img src={image} alt="... 1" />
                </RViewerTrigger>
              </SplideSlide>
            ))}
            <div className="my-slider-progress">
              <div className="my-slider-progress-bar" />
            </div>
          </Splide>
        </RViewer>
      )}
    </div>
  );
}
