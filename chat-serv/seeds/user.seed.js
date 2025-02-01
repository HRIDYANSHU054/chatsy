import { config } from "dotenv";
config();

import { connectDb } from "../db/connectDb.js";
import { User } from "../models/User.model.js";

const seedUsers = [
  // Female Users
  {
    email: "emma.thompson@example.com",
    fullName: "Emma Thompson",
    password: "$2a$12$fSdONx3sLZmujiVoVtB0Gef.2jqQYAmVjtCdZ12gEpXZhHkN978iO",
    profilePic: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    email: "olivia.miller@example.com",
    fullName: "Olivia Miller",
    password: "$2a$12$08982DOf9NypnzwNseJzJOFtGoYbY3YD82Ai7Ku3ZoDLOsuQAnuay",
    profilePic: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    email: "sophia.davis@example.com",
    fullName: "Sophia Davis",
    password: "$2a$12$fSdONx3sLZmujiVoVtB0Gef.2jqQYAmVjtCdZ12gEpXZhHkN978iO",
    profilePic: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    email: "ava.wilson@example.com",
    fullName: "Ava Wilson",
    password: "$2a$12$08982DOf9NypnzwNseJzJOFtGoYbY3YD82Ai7Ku3ZoDLOsuQAnuay",
    profilePic: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    email: "isabella.brown@example.com",
    fullName: "Isabella Brown",
    password: "$2a$12$08982DOf9NypnzwNseJzJOFtGoYbY3YD82Ai7Ku3ZoDLOsuQAnuay",
    profilePic: "https://randomuser.me/api/portraits/women/5.jpg",
  },
  {
    email: "mia.johnson@example.com",
    fullName: "Mia Johnson",
    password: "$2a$12$08982DOf9NypnzwNseJzJOFtGoYbY3YD82Ai7Ku3ZoDLOsuQAnuay",
    profilePic: "https://randomuser.me/api/portraits/women/6.jpg",
  },
  {
    email: "charlotte.williams@example.com",
    fullName: "Charlotte Williams",
    password: "$2a$12$08982DOf9NypnzwNseJzJOFtGoYbY3YD82Ai7Ku3ZoDLOsuQAnuay",
    profilePic: "https://randomuser.me/api/portraits/women/7.jpg",
  },
  {
    email: "amelia.garcia@example.com",
    fullName: "Amelia Garcia",
    password: "$2a$12$fSdONx3sLZmujiVoVtB0Gef.2jqQYAmVjtCdZ12gEpXZhHkN978iO",
    profilePic: "https://randomuser.me/api/portraits/women/8.jpg",
  },

  // Male Users
  {
    email: "james.anderson@example.com",
    fullName: "James Anderson",
    password: "$2a$12$08982DOf9NypnzwNseJzJOFtGoYbY3YD82Ai7Ku3ZoDLOsuQAnuay",
    profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    email: "william.clark@example.com",
    fullName: "William Clark",
    password: "$2a$12$fSdONx3sLZmujiVoVtB0Gef.2jqQYAmVjtCdZ12gEpXZhHkN978iO",
    profilePic: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    email: "benjamin.taylor@example.com",
    fullName: "Benjamin Taylor",
    password: "$2a$12$08982DOf9NypnzwNseJzJOFtGoYbY3YD82Ai7Ku3ZoDLOsuQAnuay",
    profilePic: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    email: "lucas.moore@example.com",
    fullName: "Lucas Moore",
    password: "$2a$12$fSdONx3sLZmujiVoVtB0Gef.2jqQYAmVjtCdZ12gEpXZhHkN978iO",
    profilePic: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    email: "henry.jackson@example.com",
    fullName: "Henry Jackson",
    password: "$2a$12$fSdONx3sLZmujiVoVtB0Gef.2jqQYAmVjtCdZ12gEpXZhHkN978iO",
    profilePic: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    email: "alexander.martin@example.com",
    fullName: "Alexander Martin",
    password: "$2a$12$08982DOf9NypnzwNseJzJOFtGoYbY3YD82Ai7Ku3ZoDLOsuQAnuay",
    profilePic: "https://randomuser.me/api/portraits/men/6.jpg",
  },
  {
    email: "javiel.hernandez@example.com",
    fullName: "Javiel Hernandez",
    password: "65445698",
    profilePic: "https://randomuser.me/api/portraits/men/8.jpg",
  },
  {
    email: "daniel.rodriguez@example.com",
    fullName: "Daniel Rodriguez",
    password: "$2a$12$fSdONx3sLZmujiVoVtB0Gef.2jqQYAmVjtCdZ12gEpXZhHkN978iO",
    profilePic: "https://randomuser.me/api/portraits/men/7.jpg",
  },
];

const seedDatabase = async () => {
  try {
    await connectDb();

    await User.insertMany(seedUsers);
    console.log("Database seeding successfull");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
