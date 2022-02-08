import styled from "styled-components";

const Title = styled.h1`
  font-size: 1.5vw;
  margin: 6vh 2.2vw;
`;

function EmptyPage({ title }: { title: string }) {
  return (
    <Title>{title}</Title>
  );
}

export default EmptyPage;
