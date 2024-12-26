import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

export const createResidency = asyncHandler(async (req, res) => {
//    console.log("endpoint created")
   const {title,description,price,address,country,city,facilities,image,userEmail } = req.body.data

   console.log(req.body.data);
   try {
    const residency = await prisma.residency.create({
        data:{
            title,
            description,
            price,
            address,
            country,
            city,
            facilities,
            image,
            owner: {connect:{email:userEmail}},
        },
    });

    res.send({message: "Residency created successfully",residency});
   } catch (err) {
    if(err.code === "p2002"){
        throw new Error("A Residency with address already there");
    }
    throw new Error(err.message);
   }
})




// import asyncHandler from "express-async-handler";
// import { prisma } from "../config/prismaConfig.js";

// export const createResidency = asyncHandler(async (req, res) => {
//     const { title, description, price, address, country, city, facilities, image, userEmail } = req.body.data;

//     try {
//         // Validate user existence
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
