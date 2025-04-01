// import Navbar from '../components/Navbar';
import Ronit from "../assets/Ronit.png"
import Rohit from "../assets/Rohit.png"
import Vedang from "../assets/Vedang.png"

interface TeamMember {
  name: string;
  role: string;
  description: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Ronit Naik",
    role: "Digital Artist",
    description: "Expert in creating AI models.",
    image: Ronit
  },
  {
    name: "Vedang Mirgal",
    role: "3D Stylist",
    description: "Specializes in 3D animations.",
    image: Vedang
  },
  {
    name: "Rohit Patra",
    role: "Designer",
    description: "Design the website for user.",
    image: Rohit
  }
];

const About = () => {
  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1507502707541-f369a3b18502?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center bg-fixed text-white">
      {/* <Navbar /> */}
      
      <div className="bg-gray-800 bg-opacity-80 text-white text-center p-12">
        <h1 className="text-4xl font-bold mb-4">About ArtFusion</h1>
        <p className="text-lg mb-6">
          ArtFusion merges 2D and 3D art styles to create visually engaging artwork 
          suitable for various mediums like video games and animations.
        </p>
      </div>

      <h2 className="text-3xl font-semibold text-center text-white mt-10">Our Team</h2>
      <div className="container mx-auto px-6 py-10 flex flex-wrap justify-center gap-8">
        {teamMembers.map((member, index) => (
          <div key={index} className="bg-white bg-opacity-90 shadow-lg rounded-lg overflow-hidden text-center p-6 w-full max-w-xs">
            <img 
              src={member.image} 
              alt={member.name} 
              className="w-32 h-32 object-cover mx-auto rounded-full shadow-md mb-4 border-4 border-gray-300"
            />
            <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
            <p className="text-indigo-500 mb-4">{member.role}</p>
            <p className="text-gray-700 mb-4">{member.description}</p>
            <button className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-700">
              Contact
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;