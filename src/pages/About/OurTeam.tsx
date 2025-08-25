import muntasirImage from "@/assets/teams/muntasir.jpg";
import fatemaImage from "@/assets/teams/fatema.png";
import rahimImage from "@/assets/teams/rahim.png";

const OurTeam = () => {
  return (
    <>
      <section
        id="team"
        className="px-4 py-16 md:px-8 max-w-7xl mx-auto text-white bg-gradient-to-br from-indigo-900 via-blue-950 to-blue-800 shadow-lg"
      >
        {/* Team Section */}
        <div className="mb-8 text-center">
          <h3 className="text-2xl font-semibold mb-4">Meet Our Team</h3>
          <p className="text-white/80 mb-12 max-w-xl mx-auto">
            Our team combines innovation and expertise to create seamless
            digital finance experiences — making every transaction easier and
            more secure!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Muntasir",
                role: "Founder",
                img: `${muntasirImage}`,
              },
              { name: "Fatema", role: "CEO", img: `${fatemaImage}` },
              {
                name: "Rahim",
                role: "Product Designer",
                img: `${rahimImage}`,
              },
            ].map((member, i) => (
              <div
                key={i}
                className="text-center hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-24 h-24 mx-auto rounded-full object-cover mb-4 border-2 border-white/30"
                />
                <h4 className="font-semibold">{member.name}</h4>
                <p className="text-sm text-white/70">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default OurTeam;
