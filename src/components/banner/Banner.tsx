import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { makeImagePath } from "../utils";
import { IResult } from "../interfaces";

const Wrapper = styled.div<{ bgimg: string }>`
  width: 100%;
  min-height: 50vw;
  display: flex;
  flex-direction: column;
  gap: 2vw;
  background-image: linear-gradient(${(props) => props.theme.black.darker+"00"}, ${(props) => props.theme.black.darker+"ff"}), url(${(props) => props.bgimg});
  background-size: cover;
  background-position: 0% 33%;
  padding: 5vw 3.5vw;
  margin-bottom: -10vw;
  cursor: default;
`;

const Title = styled.h2`
  width: 50vw;
  font-size: 8vw;
`;

const Overview = styled.p`
  width: 33vw;
  font-size: 1.4vw;
  font-weight: 400;
  letter-spacing: 0.07rem;
`;

const BtnWrapper = styled.div`
  display: flex;
  gap: 0.4vw;
`;

const Btn = styled.button`
  display: flex;
  align-items: center;
  font-size: 1vw;
  font-weight: 600;
  border-radius: 0.2vw;
  padding: 0.5vw 1.5vw;
  gap: 0.7vw;
  cursor: pointer;
`;

const PlayBtn = styled(Btn)`
  background-color: ${(props) => props.theme.white.default};
  &:hover {
    background-color: ${(props) => props.theme.white.darker+"bb"};
  }
`;

const InfoBtn = styled(Btn)`
  color: ${(props) => props.theme.white.default};
  background-color: ${(props) => props.theme.gray.darker+"bb"};
  &:hover {
    background-color: ${(props) => props.theme.gray.darker+"88"};
  }
`;

const Icon = styled.svg`
  width: 1.5vw;
  height: 1.5vw;
`

function Banner({ data }: { data: IResult }) {
  const navigate = useNavigate();
  const id = data.id;
  const imagePath = makeImagePath(data.backdrop_path ? data.backdrop_path : data.poster_path);
  const title = data.title;
  const overview = data.overview;

  return (
    <Wrapper bgimg={imagePath}>
      <Title>{title}</Title>
      <Overview>{overview}</Overview>
      <BtnWrapper>
        <PlayBtn>
          <Icon
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 622.437 769.375"
            style={{ fill: "black" }}
          >
            <path d="M227,129c20.618,0.782,33.326,15.384,47,24q42.3,26.652,84,53Q527.416,312.539,696,419c33.56,21.086,66.822,42.177,100,63,11.461,7.193,32.193,14.151,27,37-4.119,18.124-24.167,24.342-38,33-33.188,20.772-66.433,41.906-100,63Q529.687,712.6,374,811c-30.48,19.157-61.088,38.584-92,58-14.575,9.155-30.214,25.445-49,29-12.765,2.415-24.012-7.076-28-14-5.658-9.822-3-31.45-3-46V185c0-13.615-2.266-32.926,3-42C210.037,134.323,217.686,133.694,227,129Z" transform="translate(-201.375 -129)"/>
          </Icon>
          Play
        </PlayBtn>
        <InfoBtn onClick={() => navigate(id.toString())}>
          <Icon
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 490.318 490.318"
            style={{ fill: "white" }}
          >
            <path d="M245.148,0C109.967,0,0.009,109.98,0.009,245.162c0,135.182,109.958,245.156,245.139,245.156c135.186,0,245.162-109.978,245.162-245.156C490.31,109.98,380.333,0,245.148,0z M245.148,438.415c-106.555,0-193.234-86.698-193.234-193.253c0-106.555,86.68-193.258,193.234-193.258c106.559,0,193.258,86.703,193.258,193.258C438.406,351.717,351.706,438.415,245.148,438.415z" />
            <path d="M270.036,221.352h-49.771c-8.351,0-15.131,6.78-15.131,15.118v147.566c0,8.352,6.78,15.119,15.131,15.119h49.771c8.351,0,15.131-6.77,15.131-15.119V236.471C285.167,228.133,278.387,221.352,270.036,221.352z" />
            <path d="M245.148,91.168c-24.48,0-44.336,19.855-44.336,44.336c0,24.484,19.855,44.34,44.336,44.34c24.485,0,44.342-19.855,44.342-44.34C289.489,111.023,269.634,91.168,245.148,91.168z" />
          </Icon>
          More Info
        </InfoBtn>
      </BtnWrapper>
    </Wrapper>
  );
}

export default Banner;
