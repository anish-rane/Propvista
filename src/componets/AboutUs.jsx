import React from "react";
import "./AboutUs.css"; 

import AshwinImg from '../assets/Ashwin.jpg';
import AnishImg from '../assets/Anish.jpg';
import SudnyanImg from '../assets/Sudyan.jpg';

const teamMembers = [
  {
    name: "Anish Rane",
    role: "Founder & CEO",
    image: AnishImg,
    description:
      "Anish leads our vision and strategy, bringing over a decade of real estate expertise and innovation.",
  },
  {
    name: "AshwinKumar Goyal",
    role: "Operations Manager",
    image: AshwinImg,
    description:
      "Ashwin ensures seamless property transactions and client satisfaction across all operations.",
  },
  {
    name: "Sudnyan Pal",
    role: "Lead Developer",
    image: SudnyanImg,
    description:
      "Sudnyan builds and maintains our digital platform, keeping user experience intuitive and efficient.",
  }
];

export default function AboutUs() {
  return (
    <div className="about-container">
      <h1 className="heading">About Us</h1>
      <p className="intro">
        At RealEstate Management, we simplify property transactions by combining
        industry expertise with cutting-edge technology. Meet the team behind
        the mission.
      </p>
      <div className="card-grid">
        {teamMembers.map((member, index) => (
          <div className="team-card" key={index}>
            <img src={member.image} alt={member.name} />
            <h2>{member.name}</h2>
            <h4>{member.role}</h4>
            <p>{member.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}