// import asyncHandler from "express-async-handler";
// import { prisma } from "../config/prismaConfig.js";

// export const createResidency = asyncHandler(async (req, res) => {
// //    console.log("endpoint created")
//    const {title,description,price,address,country,city,facilities,image,userEmail } = req.body.data

//    console.log(req.body.data);
//    try {
//     const residency = await prisma.residency.create({
//         data:{
//             title,
//             description,
//             price,
//             address,
//             country,
//             city,
//             facilities,
//             image,
//             owner: {connect:{email:userEmail}},
//         },
//     });

//     res.send({message: "Residency created successfully",residency});
//    } catch (err) {
//     if(err.code === "p2002"){
//         throw new Error("A Residency with address already there");
//     }
//     throw new Error(err.message);
//    }
// })

import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

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
  } = req.body.data || req.body ;

  try {
    // Validate user existence
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "User with the provided email does not exist." });
    }

    // Create residency
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

    res.send({message: "Residency created successfully",residency});
   } catch (err) {
    if(err.code === "P2002"){
        throw new Error("A Residency with address already there");
    }
    throw new Error(err.message);
   }
});



// getAllResidencies

// export const getAllResidencies = asyncHandler(async (req, res) => {
//     const residencies = await prisma.residency.findMany({
//         orderBy:{
//             createdAt: "desc",
//         },
//     });
//     res.send(residencies);
// });

//or

export const getAllResidencies = asyncHandler(async (req, res) => {
    try {
        const residencies = await prisma.residency.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
        res.status(200).json(residencies);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch residencies", error: error.message });
    }
});



//get a residency by id

// export const getResidency = asyncHandler(async (req, res) => {
//        const {id} = req.params;
//        try {
//         const  residency = await prisma.residency.findUnique({
//             where:{ id },
//         });

//         res.send(residency);
//        } catch (err) {
//         throw new Error(err.message);
//        }
// });

//or 

export const getResidency = asyncHandler(async (req, res) => {
    console.log("get id")
    const { id } = req.params;

    try {
        const residency = await prisma.residency.findUnique({
            where: { id: id }, // Ensures `id` is parsed as an integer
        });

        if (!residency) {
            return res.status(404).json({ message: "Residency not found" });
        }

        res.status(200).json(residency);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch residency", error: error.message });
    }
});














// ======================CGPT==================================





// import asyncHandler from "express-async-handler";
// import { prisma } from "../config/prismaConfig.js";

// export const createResidency = asyncHandler(async (req, res) => {


//     console.log("create Residency")   // print in terminal create residency
//     const { title, description, price, address, country, city, facilities, image, userEmail } = req.body.data;

//     try {
//         // Check if user exists
//         const user = await prisma.user.findUnique({
//             where: { email: userEmail },
//         });

//         if (!user) {
//             return res.status(400).json({ message: "User with the provided email does not exist." });
//         }

//         // Create residency
//         const residency = await prisma.residency.create({
//             data: {
//                 title,
//                 description,
//                 price,
//                 address,
//                 country,
//                 city,
//                 facilities,
//                 image,
//                 owner: { connect: { email: userEmail } },
//             },
//         });

//         res.status(201).json({ message: "Residency created successfully", residency });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Internal server error. Please try again later." });
//     }
// });
