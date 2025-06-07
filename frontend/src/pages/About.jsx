import headerImg from "/57.jpg";

function About() {
  return (
    <section className=" bg-navajoWhite">
      <div className="flex flex-col md:flex-row md:h-full">
        {/* Image First on mobile, second on large */}
        <div className="w-full md:w-1/2 order-1 md:order-2">
          <img
            src={headerImg}
            alt="Sadia's portrait"
            className="w-full h-auto md:h-full object-cover"
          />
        </div>

        {/* Text Section */}
        <div className="w-full md:w-1/2 order-2 md:order-1 flex flex-col justify-center p-6 gap-6 text-base md:text-md font-light text-jadeGreen">
          <p>
            Hi I'm Sadia and welcome to my Blog Page. I'm currently a uni student, hustling and aspiring to become the best academic student I can. Born and raised in London, I feel so grateful to have grown up in a culture enriched with so much love and diversity.
          </p>
          <p>
            As a woman of color, I want to express those feelings to readers alike and those that are indifferent to me.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About