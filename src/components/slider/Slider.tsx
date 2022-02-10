import { useEffect, useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { makeImagePath } from "../utils";
import { IResult, ISlider } from "../interfaces";

const Wrapper = styled.div`
  width: 100%;
  align-items: left;
  position: relative;
`;

const Title = styled.h1`
  font-size: 1.4vw;
  font-weight: 700;
  color: ${(props) => props.theme.white.darker};
  margin: 0 0 1vw 3.5vw;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.white.default};
  }
`;

const RowWrapper = styled.div`
  width: 100%;
  height: 8vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MoveBtn = styled.div`
  width: 3vw;
  height: 100%;
  background-color: ${(props) => props.theme.black.darker+"80"};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.black.darker+"c0"};
  }
  z-index: 1;
`;

const PrevBtn = styled(MoveBtn)`
  border-radius: 0 0.2vw 0.2vw 0;
`;

const NextBtn = styled(MoveBtn)`
  border-radius: 0.2vw 0 0 0.2vw;
`;

const Icon = styled(motion.svg)`
  width: 33%;
  fill: ${(props) => props.theme.white.default};
`;

const iconVariants = {
  hide: {
    display: "none",
    scale: 1,
  },
  display: {
    display: "inline-block",
    scale: 1,
  },
  onHover: {
    display: "inline-block",
    scale: 1.5,
  },
};

const Row = styled(motion.div)`
  width: 100%;
  height: 8vw;
  display: grid;
  grid-template-columns: 3vw repeat(6, 1fr) 3vw;
  gap: 0.3vw;
  position: absolute;
`;

const rowVariants = {
  left: {
    x: -window.innerWidth
  },
  center: {
    x: 0,
  },
  right: {
    x: window.innerWidth,
  },
};

const Box = styled(motion.div)<{ bgimg: string }>`
  background-color: ${(props) => props.theme.black.default};
  background-size: cover;
  background-position: 0% 33%;
  background-image: url(${(props) => props.bgimg});
  border-radius: 0.2vw;
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

function Slider({ title, data, offset }: { title: string, data: IResult[], offset: number }) {
  const [overSlider, setOverSlider] = useState(false);
  const [overPrev, setOverPrev] = useState(false);
  const [overNext, setOverNext] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const [isRtL, setIsRtL] = useState(true);
  const [index, setIndex] = useState(0);
  const [contents, setContents] = useState<ISlider[]>();
  const prevAnimation = useAnimation();
  const nextAnimation = useAnimation();

  useEffect(() => {
    const contentsTemp: ISlider[] = [];
    data.map((v) => {
      contentsTemp.push({
        id: v.id,
        imagePath: makeImagePath(v.backdrop_path ? v.backdrop_path : v.poster_path, "w500"),
        title: v.title,
        overview: v.overview,
      });
      return 0;
    });
    setContents(contentsTemp);
  }, [data]);

  useEffect(() => {
    prevAnimation.start(overPrev ? "onHover" : (overSlider ? "display" : "hide"));
    nextAnimation.start(overNext ? "onHover" : (overSlider ? "display" : "hide"));
  }, [overSlider, overPrev, overNext, prevAnimation, nextAnimation]);
  
  const prevIndex = () => {
    if (contents) {
      if (isLeaving) return;
      setIsLeaving(true);
      setIsRtL(false);
    }
  };
  
  const nextIndex = () => {
    if (contents) {
      if (isLeaving) return;
      setIsLeaving(true);
      setIsRtL(true);
      const maxIndex = Math.floor(contents.length / offset) - 1;
      setIndex((v) => (v === maxIndex ? 0 : v + 1));
    }
  };

  return (
    <Wrapper>
      <Title>{title}</Title>
      <RowWrapper
        onMouseEnter={() => setOverSlider(true)}
        onMouseLeave={() => setOverSlider(false)}
      >
        <PrevBtn
          onClick={prevIndex}
          onMouseOver={() => setOverPrev(true)}
          onMouseOut={() => setOverPrev(false)}
        >
          <Icon
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 264 512"
            variants={iconVariants}
            initial="hide"
            animate={prevAnimation}
            transition={{ type: "tween" }}
            style={{ originX: "right", originY: "center" }}
          >
            <motion.path d="M340,0l48,41L208,256,388,471l-48,41L125,256Z" transform="translate(-124.5)" />
          </Icon>
        </PrevBtn>
        <AnimatePresence initial={false} onExitComplete={() => setIsLeaving(false)}>
          <Row
            key={index}
            variants={rowVariants}
            initial={isRtL ? "right" : "left"}
            animate="center"
            exit={isRtL ? "left" : "right"}
            transition={{ type: "tween", duration: 0.5 }}
          >
            <div></div>
            {contents?.slice(index * offset, (index + 1) * offset).map((v, i) => {
              return (
                <Box
                  key={v.id}
                  variants={boxVariants}
                  whileHover="onHover"
                  transition={{ type: "tween" }}
                  bgimg={v.imagePath}
                  style={{ originX: (i === 0 ? 0 : (i === offset - 1 ? 1 : 0.5)), originY: 1, }}
                >
                  <Info
                    variants={infoVariants}
                    transition={{ type: "tween", duration: 0 }}
                  >
                    <h4>{v.title}</h4>
                  </Info>
                </Box>
              );
            })}
            <div></div>
          </Row>
        </AnimatePresence>
        <NextBtn
          onClick={nextIndex}
          onMouseOver={() => setOverNext(true)}
          onMouseOut={() => setOverNext(false)}
        >
          <Icon
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 264 512"
            variants={iconVariants}
            initial="hide"
            animate={nextAnimation}
            transition={{ type: "tween" }}
            style={{ originX: "left", originY: "center" }}
          >
            <motion.path d="M173,0L125,41,305,256,125,471l48,41L388,256Z" transform="translate(-124.5)" />
          </Icon>
        </NextBtn>
      </RowWrapper>
    </Wrapper>
  );
}

export default Slider;
