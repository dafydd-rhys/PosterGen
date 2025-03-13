import React from "react";
import { useTranslation } from 'react-i18next';
import { StackedCarousel, ResponsiveContainer } from "react-stacked-center-carousel";
import styled from "styled-components";
import design1 from "../assets/posters/design_1.jpg";
import design2 from "../assets/posters/design_2.jpg";
import design3 from "../assets/posters/design_3.jpg";
import design4 from "../assets/posters/design_4.jpg";
import design5 from "../assets/posters/design_5.jpg";
import design6 from "../assets/posters/design_6.jpg";
import design7 from "../assets/posters/design_7.jpg"; 

const HeroDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  margin-inline: auto;
  position: relative;
  text-align: center;
  height: 60vh; /* Adjust height for carousel */
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 10px;
  margin-block: auto;
  margin-bottom: 10px; /* Reduced margin between title/paragraph and carousel */

  @media (max-width: 550px) {
    padding: 0;
  }
`;

const Title = styled.h1`
  font-size: 5em;
  margin-bottom: 10px; /* Reduced margin-bottom */
  @media (max-width: 900px) {
    font-size: 4.5em;
  }

  @media (max-width: 600px) {
    font-size: 4em;
  }
`;

const Paragraph = styled.p`
  font-size: 1em;
  opacity: 0.5;
  width: 80%;
  font-weight: 500;
  margin: 2px 0;

  @media (max-width: 900px) {
    width: 90%;
  }
`;

const CarouselContainer = styled.div`
  width: 85%;
  max-width: 85%;
  padding: 10px 0; /* Reduced padding */
`;

const data = [
    { id: 1, image: design1, text: "Classic" },
    { id: 2, image: design2, text: "Choatic" },
    { id: 3, image: design3, text: "Modern" },
    { id: 4, image: design4, text: "Vintage" },
    { id: 5, image: design5, text: "Sleek" },
    { id: 6, image: design6, text: "Elegant" },
    { id: 7, image: design7, text: "Vibrant" }
];

const Slide = React.memo(function Slide({
  data,
  dataIndex,
  isCenterSlide,
  swipeTo,
  slideIndex,
  onDesignSelect
}) {
  const coverImage = data[dataIndex].image;
  const text = data[dataIndex].text;
  const designId = data[dataIndex].id;

  const handleClick = () => {
    swipeTo(slideIndex);
    onDesignSelect(designId);
  };

  return (
    <div className="card-card" draggable={true} onClick={handleClick}>
      <div className={`cover fill ${isCenterSlide ? "off" : "on"}`}>
        <div
          className="card-overlay fill"
          onClick={() => {
            if (!isCenterSlide) swipeTo(slideIndex);
          }}
        />
      </div>
      <div className="detail fill">
        <div className="description">
          <img
            style={{ width: "auto", height: "275px", objectFit: "cover" }}
            alt="Cover"
            className="cover-image"
            src={coverImage}
          />
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
});

const Hero = ({ onDesignSelect = () => {} }) => { // Default function to avoid errors
  const [selectedDesignId, setSelectedDesignId] = React.useState(null); 
  const ref = React.useRef(null); // Fixed useRef initialization
  const { t } = useTranslation();

  const handleDesignSelect = (designId) => {
    setSelectedDesignId(designId);
    onDesignSelect(designId);
  };

  return (
    <HeroDiv>
      <Container>
        <Title>PosterGen</Title>
        <Paragraph>{t('paragraph')}</Paragraph>
      </Container>

      <CarouselContainer>
        <ResponsiveContainer
          carouselRef={ref}
          render={(width, carouselRef) => (
            <StackedCarousel
              ref={carouselRef}
              slideComponent={(props) => <Slide {...props} onDesignSelect={handleDesignSelect} />}
              slideWidth={200}
              carouselWidth={width}
              data={data}
              maxVisibleSlide={7}
              disableSwipe
              customScales={[1, 0.85, 0.7, 0.55, 0.4]}
              transitionTime={450}
            />
          )}
        />
      </CarouselContainer>
    </HeroDiv>
  );
};


export default Hero;
