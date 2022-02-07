import { Link, useMatch } from "react-router-dom";
import styled from "styled-components";
import { motion, useAnimation, useViewportScroll } from "framer-motion";
import { useEffect, useState } from "react";
import profile from "./images/img_Profile.png";

const navList = [
  {
    name: "Home",
    to: "browse"
  },
  {
    name: "TV Shows",
    to: "tv"
  },
  {
    name: "Movies",
    to: "movie"
  },
  {
    name: "New & Popular",
    to: "latest"
  },
  {
    name: "My List",
    to: "my-list"
  },
];

const Nav = styled(motion.nav)`
  width: 100%;
  height: 70px;
  color: ${(props) => props.theme.white.default};
  transition: background-color 0.4s;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  font-size: 15px;
  font-weight: 300;
  padding: 0px 60px;
`;

const navVariants = {
  fill: {
    backgroundColor: "rgba(20, 20, 20, 1)",
  },
  gradient: {
    backgroundColor: "",
    backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0.7) 10%, rgba(0, 0, 0, 0))",
  },
};

const Col = styled.div`
  display: flex;
  align-items: center;
  > * {
    margin-right: 20px;
  }
`;

const Logo = styled(motion.svg)`
  width: 92.5px;
  height: 25px;
  fill: ${(props) => props.theme.red.default};
`;

const NavItems = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavItem = styled.li`
  margin: 0 0 5px 25px;
  transition: color 0.4s;
  color: ${(props) => props.theme.white.darker};
  &:hover {
    color: ${(props) => props.theme.white.darkest};
  }
`;

const NavCurrent = styled.li`
  margin: 0 0 5px 25px;
  transition: color 0.4s;
  color: ${(props) => props.theme.white.darker};
  font-weight: 700;
  cursor: default;
`;

const Icon = styled(motion.svg)`
  width: 20px;
  height: 20px;
  fill: ${(props) => props.theme.white.default};
  z-index: 1;
`;

const searchIconVariants = {
  open: {
    x: -200,
    cursor: "default",
  },
  close: {
    x: 0,
    cursor: "pointer",
  },
};

const Search = styled(motion.input)`
  background-color: ${(props) => props.theme.black.darkest};
  color: ${(props) => props.theme.white.default};
  border: solid 1px ${(props) => props.theme.white.default};
  padding: 6px 40px;
  transform-origin: right center;
  position: absolute;
  right: 0;
  &:focus {
    outline: none;
  }
`;

const searchVariants = {
  open: {
    scaleX: 1,
  },
  close: {
    scaleX: 0,
  },
};

const SearchWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const ProfileWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Profile = styled.img.attrs({
  src: `${profile}`,
})`
  width: 32px;
  border-radius: 10%;
  margin-right: 10px;
`;

const profileVariants = {
  initial: {
    rotate: 0,
  },
  onHover: {
    rotate: 180,
  },
};

function Header() {
  const [openSearch, setOpenSearch] = useState(false);
  const [overProfile, setOverProfile] = useState(false);
  const match = useMatch("/:route/*");
  const { scrollY } = useViewportScroll();
  const navAnimation = useAnimation();
  const searchAnimation = useAnimation();
  const profileAnimation = useAnimation();

  useEffect(() => {
    scrollY.onChange(() => {
      console.log(scrollY.get() > 0);
      if (scrollY.get() > 0) {
        navAnimation.start("fill");
      } else {
        navAnimation.start("gradient");
      }
    });
  }, [scrollY, navAnimation]);

  useEffect(() => {
    if (openSearch) {
      searchAnimation.start("open");
    } else {
      searchAnimation.start("close");
    }
  }, [openSearch, searchAnimation]);

  useEffect(() => {
    if (overProfile) {
      profileAnimation.start("onHover");
    } else {
      profileAnimation.start("initial");
    }
  }, [overProfile, profileAnimation]);
  
  return (
    <Nav
      variants={navVariants}
      initial="gradient"
      animate={navAnimation}
    >
      <Col>
        <Link to="/browse">
          <Logo
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 4266 1153"
          >
            <motion.path d="M0,0H587V182L210,951l377-36v170q-293.47,33.99-587,68V970L391,181v-1H0V0ZM761,0h499V181H942V422l241-4V600c-81.17-.121-163.79,1.078-241,3V870c105.24-6.073,208.68-18.6,318-19v174q-249.48,19.995-499,40V0Zm614,0h555V181H1743v828l-181,3V181H1375V0Zm670,0h505V181H2223V409h247V591H2223V999H2045V0Zm616,0h181V841c105.81-.551,203.62,14.314,306,15v179l-143-9q-53.49-2.505-107-5-42.495-2-85-4-75.99-2.5-152-5V0Zm638,0h178V1061c-58-1.56-116.76-12.5-178-13V0Zm331,0h196q58.5,149.985,117,300h1Q4006,150.015,4068,0h198q-113.985,273.972-228,548,113.985,302.471,228,605h-7q-98.49-16.5-197-33-63.99-164.985-128-330h-1q-64.995,151.985-130,304-97.485-12-195-24v-1Q3724,805.527,3840,542,3735.015,271.027,3630,0Z" />
          </Logo>
        </Link>
        <NavItems>
          {navList.map((v) => {
            return (match?.params.route === v.to ? (
              <NavCurrent key={v.name}>
                {v.name}
              </NavCurrent>
            ) : (
              <NavItem key={v.name}>
                <Link to={v.to}>
                  {v.name}
                </Link>
              </NavItem>
            ))
          })}
        </NavItems>
      </Col>
      <Col>
        <SearchWrapper>
          <Icon
            id="search"
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 980 979.813"
            onClick={() => setOpenSearch(true)}
            variants={searchIconVariants}
            initial="close"
            animate={searchAnimation}
            transition={{ type: "linear" }}
          >
            <motion.path d="M377,0C559.587-3.277,684.733,111.679,739,238c19.536,45.476,41.024,116.325,29,184-8.718,49.064-20.759,88.918-38,128l-30,53L963,865c22.42,28.469,19.868,76.416-8,98-52.319,40.52-90.462-1.456-121-32L602,700l-57,33c-39.983,17.608-80.3,28-132,36-70.354,10.889-138.111-13.949-184-34C105.093,680.86-36.658,515.96,6,318c7.17-33.275,16.647-63.849,29-92C76.436,131.572,157.022,61.195,255,23c24.866-9.693,53.246-14.933,82-20ZM364,140c-23.636,9.33-50.129,8.721-72,18-68.313,28.982-119.78,84.957-143,159-44.633,142.323,53.98,256.9,146,295,26.917,11.146,68.3,25.224,111,18,98.9-16.732,168.073-65.25,203-145,66.687-152.268-29.963-287.326-141-331C438.74,142.491,405.447,139.8,364,140Z" transform="translate(0.969 0.031)" />
          </Icon>
          <Search
            variants={searchVariants}
            initial="close"
            animate={searchAnimation}
            transition={{ type: "linear" }}
            placeholder="Titles, people, genres"
          />
          {openSearch &&
            <Icon
              id="close"
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"
              onClick={() => setOpenSearch(false)}
              style={{ cursor: "pointer", marginRight: "5px", }}
            >
              <path d="M638.6,500l322.7-322.7c38.3-38.3,38.3-100.3,0-138.6C923,0.4,861,0.4,822.7,38.7L500,361.4L177.3,38.7C139,0.4,77,0.4,38.7,38.7C0.4,77,0.4,139,38.7,177.3L361.4,500L38.7,822.7C0.4,861,0.4,923,38.7,961.3C57.9,980.4,82.9,990,108,990s50.1-9.6,69.3-28.7L500,638.6l322.7,322.7c19.1,19.1,44.2,28.7,69.3,28.7c25.1,0,50.1-9.6,69.3-28.7c38.3-38.3,38.3-100.3,0-138.6L638.6,500z" />
            </Icon>
          }
        </SearchWrapper>
        <Icon
          id="alarm"
          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 513.469"
          style={{ cursor: "pointer", }}
        >
          <path d="M278,44c55.336,3.689,100.282,49.7,118,92,5.315,12.689,6.781,27.333,10,42v42c0,31.756.508,59.43,9,82,6.97,18.525,18.979,33.434,30,48,6.922,9.149,18.156,13.286,23,25,9.314,22.521-6.618,44.043-21,50-7.629,3.16-19.695,2-30,2H143c-36.946,0-80.672,6.061-95-17-4.754-7.651-7.572-25.294-3-36,5.575-13.056,19.968-19.333,28-30,8.994-11.945,17.906-25.464,24-40,9.726-23.2,10-54.055,10-87V175c3.94-17.8,6.546-34.585,14-49,19.374-37.469,61.734-78.269,114-82-0.2-11.747-1.875-28.811,3-36,2.5-3.693,7.758-5,11-8C278.588-.7,278.705,15.019,278,44Zm57,404c-4.579,39.5-56.789,80.541-107,60-27.962-11.439-40.415-30.8-51-60H335Z" transform="translate(-0.734 0.735)" />
        </Icon>
        <ProfileWrapper onMouseOver={() => setOverProfile(true)} onMouseOut={() => setOverProfile(false)}>
          <Profile />
          <Icon
            id="caret"
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 640"
            variants={profileVariants}
            initial="initial"
            animate={profileAnimation}
            transition={{ type: "linear", }}
            style={{ width: "12px", originX: "center", originY: "center", }}
          >
            <path d="M10 6392 c0 -4 1438 -1445 3195 -3202 l3195 -3194 3195 3194 c1757 1757 3195 3198 3195 3202 0 5 -2875 8 -6390 8 -3515 0 -6390 -3 -6390 -8z" transform="translate(0.000000,640.000000) scale(0.100000,-0.100000)" />
          </Icon>
        </ProfileWrapper>
      </Col>
    </Nav>
  );
}

export default Header;
