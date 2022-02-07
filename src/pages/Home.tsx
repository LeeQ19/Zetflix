import { useQuery } from "react-query";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { getNowPlaying } from "../components/api";
import { INowPlaying, Result } from "../components/interfaces";
import Loader from "../components/Loader";
import { makeImagePath } from "../components/utils";
import { useEffect, useState } from "react";

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.black.darker};
  height: 200vh;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  width: 100%
  height: 56.25vw;
  background-image: linear-gradient(rgba(20, 20, 20, 0) 60%, rgba(20, 20, 20, 1)), url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: 0% 20%;
  padding: 150px 60px;
  cursor: default;
  user-select: none;
`;

const Title = styled.h2`
  width: 65%;
  font-size: 10vw;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  width: 36%;
  font-size: 1.4vw;
  font-weight: 400;
  letter-spacing: 0.07rem;
`;

const Slider = styled.div`
  position: relative;
  top: -10vh;
`;

const Row = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 1vw;
  position: absolute;
  width: 100%;
`;

const rowVariants = {
  left: {
    x: -window.innerWidth - 5,
  },
  center: {
    x: 0,
  },
  right: {
    x: window.innerWidth + 5,
  },
};

const Box = styled(motion.div)<{ bgPhoto: string }>`
  width: 15vw;
  height: 9.3vw;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  border-radius: 5px;
  cursor: pointer;
`;

const boxVariants = {
  onHover: {
    scale: 1.3,
    borderRadius: 0,
    transition: {
      delay: 0.4,
      duaration: 0,
    },
  },
};

const Info = styled(motion.div)`
  background-color: ${(props) => props.theme.black.default};
  width: 100%;
  height: 2vw;
  opacity: 0;
  position: absolute;
  bottom: -2vw;
  display: flex;
  justify-content: center;
  align-items: center;
  h4 {
    text-align: center;
    font-size: 1.4vw;
  }
`;

const infoVariants = {
  onHover: {
    opacity: 1,
    zIndex: 1,
    transition: {
      delay: 0.4,
      duaration: 0,
      type: "tween",
    },
  },
};

function Home() {
  const { data: nowPlaying } = useQuery<INowPlaying>(["movies", "nowPlaying"], getNowPlaying);
  const [index, setIndex] = useState(0);
  const [isLeaving, setIsLeaving] = useState(false);
  const offset = 6;

  const nextIndex = (list: Result[], offset: number) => {
    if (list) {
      if (isLeaving) return;
      setIsLeaving(true);
      const maxIndex = Math.floor((list.length - 1) / offset) - 1;
      setIndex((v) => (v === maxIndex ? 0 : v + 1));
    }
  };

  return (
    <Wrapper>
      {nowPlaying ? (
        <>
          <Banner
            onClick={() => nextIndex(nowPlaying.results, offset)}
            bgPhoto={makeImagePath(nowPlaying.results[0].poster_path)}
          >
            <Title>{nowPlaying.results[0].title}</Title>
            <Overview>{nowPlaying.results[0].overview}</Overview>
          </Banner>
          <Slider>
            <AnimatePresence initial={false} onExitComplete={() => setIsLeaving(false)}>
              <Row
                key={index}
                variants={rowVariants}
                initial="right"
                animate="center"
                exit="left"
                transition={{ type: "tween", duration: 1 }}
              >
                {nowPlaying.results.slice(1)
                  .slice(index * offset, index * offset + offset)
                  .map((v, i) => (
                    <Box
                      key={v.id}
                      variants={boxVariants}
                      whileHover="onHover"
                      transition={{ type: "tween", }}
                      bgPhoto={makeImagePath(v.backdrop_path, "w500")}
                      style={{ originX: (i === 0 ? 0 : (i === offset - 1 ? 1 : 0.5)), originY: 1, }}
                    >
                      <Info
                        variants={infoVariants}
                        transition={{ type: "tween", duration: 0 }}
                      >
                        <h4>{v.title}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>
        </>
      ) : (
          <Loader />
      )}
    </Wrapper>
  );
}

export default Home;
