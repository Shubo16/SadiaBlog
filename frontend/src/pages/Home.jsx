import HomeBlog from "../components/homePage/blog/HomeBlog";
import LandingBlog from "../components/homePage/blog/LandingBlog";
import { NewsLetter } from "../components/homePage/Newsletter";

function Home() {
  return (
    <>
    <LandingBlog/>
      <HomeBlog />
      <NewsLetter />
    </>
  );
}
export default Home;
