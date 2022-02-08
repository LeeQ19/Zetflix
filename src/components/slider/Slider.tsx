import { useEffect, useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { makeImagePath } from "../utils";
import { IResult, ISlider } from "../interfaces";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  top: -5vw;
`;

const PrevBtn = styled.button`
  position: relative;
`;

const NextBtn = styled.button`
  position: relative;
`;

const Row = styled(motion.div)`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 1vw;
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
  width: 15vw;
  height: 9vw;
  background-color: ${(props) => props.theme.black.default};
  background-size: cover;
  background-position: 0% 33%;
  background-image: url(${(props) => props.bgimg});
  border-radius: 5px;
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
  const [index, setIndex] = useState(0);
  const [isLeaving, setIsLeaving] = useState(false);
  const [contents, setContents] = useState<ISlider[]>();

  useEffect(() => {
    const contentsTemp: ISlider[] = [];
    data.map((v) => {
      contentsTemp.push({
        id: v.id,
        imagePath: makeImagePath(v.backdrop_path ? v.backdrop_path : v.poster_path, "w500"),
        title: v.title,
        overview: v.overview,
      });
      return;
    });
    setContents(contentsTemp);
  }, [data]);
  
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
      <PrevBtn onClick={prevIndex}>Prev</PrevBtn>
      <AnimatePresence initial={false} onExitComplete={() => setIsLeaving(false)}>
        <Row
          key={index}
          variants={rowVariants}
          initial="right"
          animate="center"
          exit="left"
          transition={{ type: "tween", duration: 1 }}
        >
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
        </Row>
      </AnimatePresence>
      <NextBtn onClick={nextIndex}>Next</NextBtn>
    </Wrapper>
  );
}

export default Slider;
