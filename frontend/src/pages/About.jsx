import Footer from "../components/extras/Footer";

function About() {
  const text1 =
    "Hi I'm Sadia and welcome to my Blog Page. i'm currently a uni student, hustling and apsiring to become the best academic student i can. Born and raised in london, I feel so grateful to have grown up in a culture enriched with so much love and diversity, passion and culture from the very second i took my first steps. As a woman of color, i want to express those feelings to readers alike and those that are indifferent to me.";

  const text2 =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled.";

  const text3 =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unc.";

  return (
    <section>
      <div className="w-full lg:grid lg:grid-cols-2 bg-navajoWhite">
        <section className="lg:border-r-4 lg:border-black lg:grid lg:grid-rows-3 h-full font-semibold lg:text-md">
          <div className="w-full h-full px-20 flex items-center justify-center text-jadeGreen">
            <h2 className="capitalize text-pretty text-center">{text1}</h2>
          </div>
          <div className="w-full h-full px-20 border-y-2 border-black flex items-center justify-center">
            <h2 className="capitalize">{text2}</h2>
          </div>
          <div className="w-full h-full px-20 flex items-center justify-center">
            <h2 className="">{text3}</h2>
          </div>
        </section>
        <section className="w-full">
          <img
            src="./src/assets/57.jpg"
            alt="description"
            className="w-full h-[80svh] object-fill" //controls height of the entire container from here for whatever reason keep that in mind
          />
        </section>
      </div>
      <Footer />
    </section>
  );
}

export default About;
