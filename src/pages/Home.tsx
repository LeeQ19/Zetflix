import { useQuery } from "react-query";
import styled from "styled-components";
import { getNowPlaying } from "../components/api";
import { INowPlaying } from "../components/interfaces";
import Loader from "../components/Loader";
import { makeImagePath } from "../components/utils";

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.black.darker};
`;

const Banner = styled.div<{ bgPhoto: string }>`
  width: 100%
  height: 56.25vw;
  background-image: linear-gradient(rgba(20, 20, 20, 0) 60%, rgba(20, 20, 20, 1)), url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: 0% 20%;
  padding: 150px 60px;
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

function Home() {
  const { data: nowPlaying } = useQuery<INowPlaying>(["movies", "nowPlaying"], getNowPlaying);
  return (
    <Wrapper>
      {nowPlaying ? (
        <>
          <Banner bgPhoto={makeImagePath(nowPlaying.results[0].poster_path)}>
            <Title>{nowPlaying.results[0].title}</Title>
            <Overview>{nowPlaying.results[0].overview}</Overview>
          </Banner>
        </>
      ) : (
          <Loader />
      )}
    </Wrapper>
  );
}

export default Home;
