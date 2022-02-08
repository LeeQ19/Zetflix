import styled, { keyframes } from "styled-components";
import loaderLogo from "./images/react.svg";

const loaderLogoSpin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const LoaderLogo = styled.img.attrs({
  src: `${loaderLogo}`,
})`
  width: 50vmin;
  max-width: 500px;
  margin-bottom: 3vmin;
  animation: ${loaderLogoSpin} infinite 5s linear;
`;

const LoaderText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.7rem;
  font-weight: 700;
`;

const LoaderBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Loader = () => {
  return (
    <LoaderBox>
      <LoaderLogo />
      <LoaderText>Loading...</LoaderText>
    </LoaderBox>
  );
};

export default Loader;
