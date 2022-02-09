import { useEffect, useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { makeImagePath } from "../utils";
import { IResult, ISlider } from "../interfaces";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  top: -5vw;
`;

const Row = styled(motion.div)`
  width: 100%;
  display: grid;
  grid-template-columns: 1.5vw repeat(6, 1fr) 1.5vw;
  gap: 0.5vw;
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

const PrevBtn = styled.div`
  background-color: ${(props) => props.theme.black.darker+"80"};
  display: flex;
  justify-content: right;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.black.darker+"c0"};
  }
`;

const NextBtn = styled.div`
  background-color: ${(props) => props.theme.black.darker+"80"};
  display: flex;
  justify-content: left;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.black.darker+"c0"};
  }
`;

const Icon = styled(motion.svg)`
  width: 33%;
  fill: ${(props) => props.theme.white.default};
`;

const iconVariants = {
  hide: {
    display: "none",
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

const Box = styled(motion.div)<{ bgimg: string }>`
  height: 8vw;
  background-color: ${(props) => props.theme.black.default};
  background-size: cover;
  background-position: 0% 33%;
  background-image: url(${(props) => props.bgimg});
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

function Slider({ data, offset }: { data: IResult[], offset: number }) {
  const [overSlider, setOverSlider] = useState(false);
  const [overPrev, setOverPrev] = useState(false);
  const [overNext, setOverNext] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
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
    prevAnimation.start(overSlider ? (overPrev ? "onHover" : "display") : "hide");
    nextAnimation.start(overSlider ? (overNext ? "onHover" : "display") : "hide");
  }, [overSlider, overPrev, overNext, prevAnimation, nextAnimation]);
  
  const prevIndex = () => {
    if (contents) {
      if (isLeaving) return;
    }
  };
  
  const nextIndex = () => {
    if (contents) {
      if (isLeaving) return;
      setIsLeaving(true);
      const maxIndex = Math.floor(contents.length / offset) - 1;
      setIndex((v) => (v === maxIndex ? 0 : v + 1));
    }
  };

  return (
    <Wrapper>
      <AnimatePresence initial={false} onExitComplete={() => setIsLeaving(false)}>
        <Row
          key={index}
          variants={rowVariants}
          initial="right"
          animate="center"
          exit="left"
          transition={{ type: "tween", duration: 1 }}
          onMouseEnter={() => setOverSlider(true)}
          onMouseLeave={() => setOverSlider(false)}
        >
          <PrevBtn onClick={prevIndex} onMouseOver={() => setOverPrev(true)} onMouseOut={() => setOverPrev(false)}>
            <Icon
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 212 512"
              variants={iconVariants}
              initial="hide"
              animate={prevAnimation}
              transition={{ type: "tween" }}
              style={{ originX: "right", originY: "center" }}
            >
              <motion.path d="M299,512L150,258,297,1l8,3,57,34Q299.506,146.989,237,256L362,475Z" transform="translate(-150 -0.5)" />
            </Icon>
          </PrevBtn>
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
          <NextBtn onClick={nextIndex} onMouseOver={() => setOverNext(true)} onMouseOut={() => setOverNext(false)}>
            <Icon
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 212 512"
              variants={iconVariants}
              initial="hide"
              animate={nextAnimation}
              transition={{ type: "tween" }}
              style={{ originX: "left", originY: "center" }}
            >
              <motion.path d="M213,1L362,255,215,512l-8-3-57-34q62.493-108.988,125-218Q212.507,147.511,150,38Z" transform="translate(-150 -0.5)" />
            </Icon>
          </NextBtn>
        </Row>
      </AnimatePresence>
    </Wrapper>
  );
}

export default Slider;
