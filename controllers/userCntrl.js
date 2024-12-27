import asyncHandler from 'express-async-handler';
import { prisma } from "../config/prismaConfig.js";



// create user register
export const createUser = asyncHandler(async(req,res)=>{
    console.log("creating a User")

    let{email} = req.body

    // console.log(email)  
    const userExists = await prisma.user.findUnique({where:{email:email}})
    if(!userExists){
        const user = await prisma.user.create({data: req.body})
        res.send({
            message:"user registered successfully",
            user:user,
        });
    }else res.status(201).send({message:"User Already registered"});
});



//to book a visit to residency

export const bookVisit = asyncHandler(async(req,res)=>{
    // console.log("booking a visit to residency")
    const {email,date} = req.body;
    const {id} = req.params

    try {
        
        const alreadyBooked = await  prisma.user.findUnique({
            where:{email},
            select: {bookedVisit :true},
        });

        if (alreadyBooked.bookedVisit.some((visit)=> visit.id === id)) {
            res.status(400).json({message:" This Residency Already booked by you "});
        }else{
            await prisma.user.update({
                where: {email:email},
                data: {
                    bookedVisits: { push: {id:id}},
             },
            });
        }
        res.send("Your Visit is booked successfully");
    } catch (err) {
        throw new Error(err.message);
    }
});

// or

// export const bookVisit = asyncHandler(async (req, res) => {
//     const { email, date } = req.body; // Extract email and date from the request body
//     const { id } = req.params; // Extract residency ID from the request parameters

//     try {
//         // Check if the user has already booked a visit for the given residency
//         const user = await prisma.user.findUnique({
//             where: { email },
//             select: { bookedVisit: true },
//         });

//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         if (user.bookedVisit.some((visit) => visit.id === id)) {
//             return res.status(400).json({ message: "This residency is already booked by you" });
//         }

//         // Update the user's booked visits
//         await prisma.user.update({
//             where: { email },
//             data: { bookedVisits: { push: { id, date } } }, // Include date in the booking
//         });

//         res.status(200).json({ message: "Your visit is booked successfully" });
//     } catch (error) {
//         res.status(500).json({ message: "Failed to book visit", error: error.message });
//     }
// });
