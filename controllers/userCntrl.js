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



//======================To book a visit to residency=========================================================

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
                    bookedVisits: { push: {id, date}}, // Ensure correct field name and format
             },
            });
            res.send("Your Visit is booked successfully");
        }
    } catch (err) {
        throw new Error(err.message);
    }
});

// or

// export const bookVisit = asyncHandler(async (req, res) => {
//     const { email, date } = req.body;
//     const { id } = req.params;

//     try {
//         // Check if the user already booked the residency
//         const alreadyBooked = await prisma.user.findUnique({
//             where: { email },
//             select: { bookedVisit: true }, // Use the correct field name
//         });

//         if (alreadyBooked.bookedVisit.some((visit) => visit.id === id)) {
//             return res.status(400).json({ message: "This residency is already booked by you." });
//         }

//         // Update user's bookedVisit field
//         await prisma.user.update({
//             where: { email },
//             data: {
//                 bookedVisit: { push: { id, date } }, 
//             },
//         });

//         res.status(200).json({ message: "Your visit has been booked successfully." });
//     } catch (err) {
//         res.status(500).json({ message: "Failed to book visit", error: err.message });
//     }
// });


// ===================================================================================================================


// to get all booking


// export const allBookings = asyncHandler(async(req,res)=>{
//     const {email} = req.params

//     try {
//         const bookings = await prisma.user.findUnique({
//             where: { email },
//             select: { bookedVisit: true }
//         });
//         res.status(200).send(bookings)
//     } catch (err) {
//         throw new Error(err.message)
//     }
// });

// or 

export const allBookings = asyncHandler(async (req, res) => {
    const { email } = req.params;

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    try {
        const bookings = await prisma.user.findUnique({
            where: { email },
            select: { bookedVisit: true },
        });

        if (!bookings) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(bookings);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch bookings", error: err.message });
    }
});
