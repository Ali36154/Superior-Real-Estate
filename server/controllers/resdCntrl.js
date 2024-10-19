import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

// Function to create a new residency
export const createResidency = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    price,
    address,
    country,
    city,
    facilities,
    image,
    userEmail,
  } = req.body.data;

  console.log(req.body.data);
  
  try {
    const residency = await prisma.residency.create({
      data: {
        title,
        description,
        price,
        address,
        country,
        city,
        facilities,
        image,
        owner: { connect: { email: userEmail } },
      },
    });

    res.status(201).send({ message: "Residency created successfully", residency });
  } catch (err) {
    if (err.code === "P2002") {
      res.status(400).send({ message: "A residency with this address already exists" });
    } else {
      res.status(500).send({ message: err.message });
    }
  }
});

// Function to get all residencies
export const getAllResidencies = asyncHandler(async (req, res) => {
  try {
    const residencies = await prisma.residency.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    res.status(200).send(residencies);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// Function to get a specific residency
export const getResidency = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const residency = await prisma.residency.findUnique({
      where: { id },
    });

    if (!residency) {
      res.status(404).send({ message: "Residency not found" });
    } else {
      res.status(200).send(residency);
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});
