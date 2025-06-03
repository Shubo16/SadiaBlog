import HomeBlog from "../components/homePage/blog/HomeBlog";
import LandingBlog from "../components/homePage/blog/LandingBlog";
import Charity from "../components/homePage/donation/Charity";
import { NewsLetter } from "../components/homePage/Newsletter";

function Home() {
  return (
    <>
    <LandingBlog/>
      <HomeBlog />
      <Charity/>
      <NewsLetter />
    </>
  );
}
export default Home;
