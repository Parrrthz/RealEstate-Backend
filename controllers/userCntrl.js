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

// export const bookVisit = asyncHandler(async(req,res)=>{
//     // console.log("booking a visit to residency")
//     const {email,date} = req.body;
//     const {id} = req.params

//     try {
        
//         const alreadyBooked = await  prisma.user.findUnique({
//             where:{email},
//             select: {bookedVisits :true},
//         });

//         if (alreadyBooked.bookedVisits.some((visit)=> visit.id === id)) {
//             res.status(400).json({message:" This Residency Already booked by you "});
//         }else{
//             await prisma.user.update({
//                 where: {email:email},
//                 data: {
//                     bookedVisits: { push: {id, date}}, // Ensure correct field name and format
//              },
//             });
//             res.send("Your Visit is booked successfully");
//         }
//     } catch (err) {
//         throw new Error(err.message);
//     }
// });

// or

export const bookVisit = asyncHandler(async (req, res) => {
    const { email, date } = req.body;
    const { id } = req.params;

    if (!email || !date || !id) {
        return res.status(400).json({ message: "Email, date, and residency ID are required" });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email },
            select: { bookedVisit: true }, // Correct field name
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isAlreadyBooked = user.bookedVisit?.some((visit) => visit.id === id);
        if (isAlreadyBooked) {
            return res.status(400).json({ message: "This residency is already booked by you" });
        }

        await prisma.user.update({
            where: { email },
            data: {
                bookedVisit: { push: { id, date } }, // Correct field name
            },
        });

        res.status(200).json({ message: "Your visit is booked successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            message: "An error occurred while booking the visit",
            error: err.message,
        });
    }
});




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


// gpt code
export const allBookings = asyncHandler(async (req, res) => {
    const { email } = req.body; // Extract email from request body

    // Validate the input
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    try {
        // Retrieve user's booked visits
        const user = await prisma.user.findUnique({
            where: { email },
            select: { bookedVisit: true }, // Adjust the field name as per your Prisma schema
        });

        // If user not found
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Respond with the booked visits
        res.status(200).json({
            message: "User bookings retrieved successfully",
            bookings: user.bookedVisit || [], // Return an empty array if no bookings exist
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            message: "An error occurred while retrieving bookings",
            error: err.message,
        });
    }
});
