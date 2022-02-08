import styled from "styled-components";
import { makeImagePath } from "../utils";
import { IResult } from "../interfaces";

const Wrapper = styled.div<{ bgimg: string }>`
  width: 100%;
  height: 50vw;
  background-image: linear-gradient(rgba(20, 20, 20, 0), rgba(20, 20, 20, 1)), url(${(props) => props.bgimg});
  background-size: cover;
  background-position: 0% 33%;
  padding: 150px 60px;
  cursor: default;
  user-select: none;
`;

const Title = styled.h2`
  width: 50%;
  font-size: 8vw;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  width: 36%;
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
