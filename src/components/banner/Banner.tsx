import styled from "styled-components";
import { makeImagePath } from "../utils";
import { IResult } from "../interfaces";

const Wrapper = styled.div<{ bgimg: string }>`
  width: 100%;
  min-height: 50vw;
  background-image: linear-gradient(${(props) => props.theme.black.darker+"00"}, ${(props) => props.theme.black.darker+"ff"}), url(${(props) => props.bgimg});
  background-size: cover;
  background-position: 0% 33%;
  padding: 11vh 3.5vw;
  margin-bottom: -20vh;
  cursor: default;
`;

const Title = styled.h2`
  width: 50vw;
  font-size: 8vw;
  margin-bottom: 5vh;
`;

const Overview = styled.p`
  width: 33vw;
  font-size: 1.4vw;
  font-weight: 400;
  letter-spacing: 0.07rem;
`;

function Banner({ data }: { data: IResult }) {
  const imagePath = makeImagePath(data.backdrop_path ? data.backdrop_path : data.poster_path);
  const title = data.title;
  const overview = data.overview;

  return (
    <Wrapper
      bgimg={imagePath}
    >
      <Title>{title}</Title>
      <Overview>{overview}</Overview>
    </Wrapper>
  );
}

export default Banner;
