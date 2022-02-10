import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getNowPlaying } from "../components/api";
import { INowPlaying, IResult } from "../components/interfaces";
import Loader from "../components/loader/Loader";
import Banner from "../components/banner/Banner";
import Slider from "../components/slider/Slider";

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.black.darker};
  height: 200vh;
`;

function Home() {
  const { data: nowPlaying } = useQuery<INowPlaying>(["movies", "nowPlaying"], getNowPlaying);
  const [dataBanner, setDataBanner] = useState<IResult>();
  const [dataSlider, setDataSlider] = useState<IResult[]>();
  const offset = 6;

  useEffect(() => {
    if (nowPlaying) {
      setDataBanner(nowPlaying.results[0]);
      setDataSlider(nowPlaying.results.slice(1));
    }
  }, [nowPlaying]);

  return (
    <>
      {dataBanner && dataSlider ? (
        <Wrapper>
          <Banner data={dataBanner} />
          <Slider title="Now Playing" data={dataSlider} offset={offset} />
        </Wrapper>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default Home;
