import { useEffect, useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AnimatePresence, motion, useViewportScroll } from "framer-motion";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #000000bb;
`;

const Wrapper = styled(motion.div)`
  position: absolute;
  width: 40vw;
  min-height: 80vh;
  background-color: ${(props) => props.theme.black.default};
  border-radius: 0.5vw;
  left: 0;
  right: 0;
  margin: 0 auto;
`;

const Cover = styled.div`
  width: 100%;
  background-size: cover;
  height: 400px;
`;

const Title = styled.h2`
  color: ${(props) => props.theme.white.default};
`;

const Overview = styled.p`
  color: ${(props) => props.theme.white.default};
`;

function Modal() {
  const match = useMatch("/:route/:id");
  const navigate = useNavigate();
  const { scrollY } = useViewportScroll();
  
  return (
    <AnimatePresence>
      <Overlay
        onClick={() => navigate(-1)}
      />
      <Wrapper
        layoutId={match?.params.id}
        style={{ top: scrollY.get() + 100 }}
      >
        <Cover />
        <Title></Title>
        <Overview></Overview>
      </Wrapper>
    </AnimatePresence>
  );
}

export default Modal;
