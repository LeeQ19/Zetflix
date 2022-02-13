import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

import { makeImagePath } from "../utils";
import { IResult, ISlider } from "../interfaces";

const Wrapper = styled.div`
  width: 100%;
  align-items: left;
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
  width: 1vw;
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
  gap: 0.4vw;
  position: absolute;
`;

const rowVariants = {
  left:   { x: -window.innerWidth * 0.93 ,},
  center: { x: 0, },
  right:  { x: window.innerWidth * 0.93, },
};

const Box = styled(motion.div)<{ bgimg: string | undefined }>`
  background-color: ${(props) => props.theme.black.default};
  background-image: url(${(props) => props.bgimg});
  background-size: cover;
  background-position: 50% 33%;
  border-radius: 0.2vw;
  cursor: pointer;
`;

const boxVariants = {
  onHover: {
    scale: 1.5,
    borderRadius: 0,
    boxShadow: "0 0 5px black",
    transition: {
      delay: 0.4,
      duaration: 0,
    },
  },
};

const BoxLeft = styled(Box)`
  background-position: 100% 33%;
  border-radius: 0 0.2vw 0.2vw 0;
  cursor: default;
`;

const BoxRight = styled(Box)`
  background-position: 0% 33%;
  border-radius: 0.2vw 0 0 0.2vw;
  cursor: default;
`;

const Pannel = styled(motion.div)`
  background-color: ${(props) => props.theme.black.default};
  width: 100%;
  height: 4vw;
  transform: scale(1, 0);
  position: absolute;
  bottom: -4vw;
  h4 {
    text-align: center;
    font-size: 1vw;
  }
`;

const pannelVariants = {
  onHover: {
    transform: "scale(1, 1)",
    zIndex: 1,
    transition: {
      delay: 0.4,
      duration: 0,
      type: "tween",
    },
  },
};

const PannelBtnWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0.5vw;
`;

const PannelBtnSub = styled.div`
  display: flex;
  gap: 0.5vw;
`;

const PannelBtn = styled.button`
  width: 1.5vw;
  height: 1.5vw;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
  background-color: ${(props) => props.theme.black.default};
  border: 2px solid ${(props) => props.theme.gray.default};
  &:hover {
    background-color: ${(props) => props.theme.black.lightest};
    border: 2px solid ${(props) => props.theme.white.default};
  }
  svg {
    width: 60%;
  }
`;

const PlayBtn = styled(PannelBtn)`
  background-color: ${(props) => props.theme.white.default};
  border: none;
  &:hover {
    background-color: ${(props) => props.theme.white.darkest};
    border: none;
  }
  svg {
    width: 50%;
  }
`;

function Slider({ title, data, offset }: { title: string, data: IResult[], offset: number }) {
  const navigate = useNavigate();
  const [overSlider, setOverSlider] = useState(false);
  const [overPrev, setOverPrev] = useState(false);
  const [overNext, setOverNext] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const [isRtL, setIsRtL] = useState(true);
  const [isInitial, setIsInitial] = useState(true);
  const [index, setIndex] = useState(0);
  const [currentContents, setCurrentContents] = useState<ISlider[]>([]);
  const [leftContent, setLeftContent] = useState<ISlider>();
  const [rightContent, setRightContent] = useState<ISlider>();

  const contents = data.map((v) => {
    return ({
      id: v.id,
      imagePath: makeImagePath(v.backdrop_path ? v.backdrop_path : v.poster_path, "w500"),
      title: v.title,
      overview: v.overview,
    });
  });

  const prevAnimation = useAnimation();
  const nextAnimation = useAnimation();

  useEffect(() => {
    if (index + offset <= contents.length) {
      setCurrentContents(contents.slice(index, index + offset));
    } else {
      setCurrentContents([...contents.slice(index), ...contents.slice(0, offset - contents.length % offset)]);
    }
    setLeftContent(contents.at(index - 1));
    setRightContent(contents.at((index + offset) % contents.length));
  }, [index, offset]);

  useEffect(() => {
    prevAnimation.start(overPrev ? "onHover" : (overSlider ? "display" : "hide"));
    nextAnimation.start(overNext ? "onHover" : (overSlider ? "display" : "hide"));
  }, [overSlider, overPrev, overNext, prevAnimation, nextAnimation]);
  
  const prevIndex = () => {
    if (isLeaving) return;
    setIsRtL(false);
    setIsLeaving(true);
    setTimeout(() => setIndex((v) => (v - offset >= 0 ? v - offset : (v === 0 ? contents.length - offset : 0))), 0);
  };
  
  const nextIndex = () => {
    if (isLeaving) return;
    setIsRtL(true);
    setIsLeaving(true);
    setTimeout(() => setIndex((v) => (v + offset * 2 < contents.length ? v + offset : (v + offset === contents.length ? 0 : contents.length - offset))), 0);
    if (isInitial) setIsInitial(false);
  };

  return (
    <Wrapper>
      <Title>{title}</Title>
      <RowWrapper
        onMouseEnter={() => setOverSlider(true)}
        onMouseLeave={() => setOverSlider(false)}
      >
        {isInitial ? (
          <div></div>
        ) : (
          <PrevBtn
            onClick={prevIndex}
            onMouseOver={() => setOverPrev(true)}
            onMouseOut={() => setOverPrev(false)}
          >
            <Icon
              id="prev"
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
        )}
        <AnimatePresence initial={false} onExitComplete={() => setIsLeaving(false)}>
          <Row
            key={index}
            variants={rowVariants}
            initial={isRtL ? "right" : "left"}
            animate="center"
            exit={isRtL ? "left" : "right"}
            transition={{ type: "tween", duration: 0.5 }}
          >
            <BoxLeft
              key={leftContent?.id}
              bgimg={leftContent?.imagePath}
            />
            {currentContents.map((v, i) => {
              return (
                <Box
                  key={v.id}
                  layoutId={v.id.toString()}
                  variants={boxVariants}
                  whileHover="onHover"
                  transition={{ type: "tween" }}
                  bgimg={v.imagePath}
                  style={{ originX: (i === 0 ? 0 : (i === offset - 1 ? 1 : 0.5)), originY: 1.2, }}
                >
                  <Pannel
                    variants={pannelVariants}
                    transition={{ type: "tween", duration: 0 }}
                  >
                    <PannelBtnWrapper>
                      <PannelBtnSub>
                        <PlayBtn>
                          <svg
                            id="play"
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 622.437 769.375"
                            style={{ fill: "black" }}
                          >
                            <path d="M227,129c20.618,0.782,33.326,15.384,47,24q42.3,26.652,84,53Q527.416,312.539,696,419c33.56,21.086,66.822,42.177,100,63,11.461,7.193,32.193,14.151,27,37-4.119,18.124-24.167,24.342-38,33-33.188,20.772-66.433,41.906-100,63Q529.687,712.6,374,811c-30.48,19.157-61.088,38.584-92,58-14.575,9.155-30.214,25.445-49,29-12.765,2.415-24.012-7.076-28-14-5.658-9.822-3-31.45-3-46V185c0-13.615-2.266-32.926,3-42C210.037,134.323,217.686,133.694,227,129Z" transform="translate(-201.375 -129)" />
                          </svg>
                        </PlayBtn>
                        <PannelBtn>
                          <svg
                            id="plus"
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                            style={{ fill: "white" }}
                          >
                            <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" />
                          </svg>
                        </PannelBtn>
                        <PannelBtn>
                          <svg
                            id="like"
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                            style={{ fill: "white" }}
                          >
                            <path d="M512,304.021c0-12.821-5.099-24.768-13.867-33.6c9.963-10.901,15.019-25.536,13.632-40.725 c-2.475-27.115-26.923-48.363-55.616-48.363H324.395c6.485-19.819,16.939-56.149,16.939-85.333c0-46.272-39.317-85.333-64-85.333 c-22.165,0-38.016,12.459-38.677,12.992c-2.539,2.048-3.989,5.099-3.989,8.341v72.32l-61.44,133.141l-2.56,1.28v-4.075 c0-5.888-4.779-10.667-10.667-10.667H53.333C23.936,224,0,247.936,0,277.333V448c0,29.397,23.936,53.333,53.333,53.333h64 c23.083,0,42.773-14.72,50.219-35.243c17.749,9.131,41.643,13.931,56.469,13.931H419.84c23.232,0,43.541-15.68,48.32-37.269 c2.453-11.115,1.024-22.315-3.84-32.043c15.744-7.936,26.347-24.171,26.347-42.688c0-7.552-1.728-14.784-5.013-21.333 C501.397,338.752,512,322.517,512,304.021z M149.333,448c0,17.643-14.379,32-32,32h-64c-17.664,0-32-14.357-32-32V277.333 c0-17.643,14.357-32,32-32v0.107h95.957v10.667c0,0.064,0.043,0.107,0.043,0.171V448z M466.987,330.368 c-4.117,0.469-7.595,3.264-8.896,7.211c-1.301,3.925-0.235,8.277,2.795,11.115c5.44,5.141,8.427,12.011,8.427,19.349 c0,13.44-10.155,24.768-23.637,26.304c-4.117,0.469-7.595,3.264-8.896,7.211c-1.301,3.925-0.235,8.277,2.795,11.115 c7.04,6.635,9.856,15.936,7.744,25.472c-2.624,11.883-14.187,20.523-27.499,20.523H224c-15.851,0-41.365-6.848-53.333-15.744 V262.656l15.381-7.68c2.155-1.088,3.883-2.88,4.907-5.077l64-138.667c0.64-1.387,0.981-2.923,0.981-4.459V37.909 c4.437-2.453,12.139-5.803,21.333-5.803c11.691,0,42.667,29.077,42.667,64c0,37.525-20.416,91.669-20.629,92.203 c-1.237,3.264-0.811,6.955,1.195,9.835c2.005,2.88,5.269,4.608,8.789,4.608h146.795c17.792,0,32.896,12.715,34.389,28.971 c1.131,12.16-4.672,23.723-15.168,30.187c-3.285,2.005-5.205,5.653-5.056,9.493c0.128,3.84,2.347,7.296,5.781,9.067 c9.003,4.608,14.592,13.653,14.592,23.595C490.603,317.504,480.448,328.832,466.987,330.368z" />
                          </svg>
                        </PannelBtn>
                        <PannelBtn>
                          <svg
                            id="dislike"
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                            style={{ fill: "white" }}
                          >
                            <path d="M3785 4987 c-133 -44 -252 -145 -312 -265 l-30 -58 -96 38 c-54 22 -145 51 -205 66 l-107 26 -1075 4 c-777 2 -1092 0 -1135 -8 -126 -24 -271 -123 -332 -227 -65 -111 -81 -262 -42 -389 19 -62 20 -68 4 -77 -45 -25 -122 -98 -156 -147 -82 -120 -106 -285 -60 -419 12 -35 21 -64 19 -66 -2 -1 -23 -16 -48 -32 -149 -101 -229 -280 -203 -457 12 -82 54 -181 100 -236 l30 -34 -33 -47 c-218 -303 -75 -703 296 -825 51 -17 112 -19 763 -22 389 -1 707 -5 707 -8 0 -3 -18 -67 -40 -143 -48 -165 -94 -379 -110 -513 -15 -121 -8 -323 14 -402 72 -260 250 -492 455 -594 92 -45 179 -53 296 -27 92 20 225 85 259 126 l26 31 0 377 0 378 309 668 c169 368 313 671 320 673 6 2 11 -6 11 -17 0 -39 28 -89 59 -105 44 -23 1143 -24 1240 -1 93 22 177 71 251 145 74 74 123 158 145 251 22 96 22 1852 0 1948 -41 172 -172 320 -340 384 -58 21 -72 22 -485 24 -419 2 -426 2 -495 -20z m930 -215 c96 -44 165 -132 185 -237 8 -43 10 -317 8 -945 l-3 -885 -26 -55 c-37 -80 -81 -125 -157 -162 l-67 -33 -512 -3 -513 -3 0 1043 c0 679 4 1056 10 1080 14 49 66 125 112 161 81 65 101 67 528 64 378 -2 386 -2 435 -25z m-1635 -209 c112 -28 245 -77 292 -108 l38 -25 0 -903 0 -903 -80 -39 c-44 -22 -89 -48 -99 -60 -10 -11 -164 -335 -342 -720 l-324 -700 -5 -365 -5 -365 -56 -22 c-31 -12 -81 -25 -112 -29 -77 -9 -131 19 -233 120 -94 93 -161 202 -201 321 -64 190 -20 524 126 976 28 86 51 170 51 188 0 20 -10 42 -29 63 l-29 33 -804 5 -803 5 -49 23 c-105 48 -165 118 -192 221 -31 122 22 256 131 331 87 60 83 142 -11 204 -119 79 -161 220 -101 341 39 80 100 125 196 146 64 13 101 53 101 108 0 29 -10 50 -43 94 -53 67 -72 127 -64 206 11 128 81 197 245 240 81 22 103 109 44 178 -61 73 -77 111 -77 193 0 57 5 84 22 115 38 72 108 124 190 144 22 6 481 8 1088 7 1029 -2 1052 -3 1135 -23z" transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" />
                          </svg>
                        </PannelBtn>
                      </PannelBtnSub>
                      <PannelBtn onClick={() => navigate(v.id.toString())}>
                        <svg
                          id="down"
                          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 264"
                          style={{ fill: "white" }}
                        >
                          <path d="M206 2396 c-110 -128 -198 -237 -197 -242 3 -10 2542 -2144 2551 -2144 5 0 2519 2107 2552 2139 7 6 -383 473 -400 479 -4 1 -489 -401 -1077 -893 -588 -492 -1072 -895 -1075 -895 -3 0 -487 403 -1075 895 -588 492 -1072 895 -1075 895 -3 0 -95 -105 -204 -234z" transform="translate(0.000000,264.000000) scale(0.100000,-0.100000)" />
                        </svg>
                      </PannelBtn>
                    </PannelBtnWrapper>
                    <h4>{v.title}</h4>
                  </Pannel>
                </Box>
              );
            })}
            <BoxRight
              key={rightContent?.id}
              bgimg={rightContent?.imagePath}
            />
          </Row>
        </AnimatePresence>
        <NextBtn
          onClick={nextIndex}
          onMouseOver={() => setOverNext(true)}
          onMouseOut={() => setOverNext(false)}
        >
          <Icon
            id="next"
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
