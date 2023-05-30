const express = require('express');
const router = express.Router();
const Theater = require('./models/theatre');
const Show = require('./models/show');
const Booking = require('./models/booking');

const app = express()


// Get all bookings
router.get('/bookings', async (req, res) => {
    try {
        const bookings = await Booking.findAll();
        res.json(bookings);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Server Error'
        });
    }
});

// Create a booking
router.post('/bookings', async (req, res) => {
    const {
        seatNumber,
        theaterId,
        showId
    } = req.body;

    // Start a transaction
    const t = await sequelize.transaction();

    try {
        // Check if the seat is available
        const existingBooking = await Booking.findOne({
            where: {
                seatNumber,
                showId,
            },
            transaction: t,
        });

        if (existingBooking) {
            await t.rollback(); // Rollback the transaction
            return res.status(400).json({
                message: 'Seat is already booked'
            });
        }

        // Check if the theater and show exist
        const theater = await Theater.findByPk(theaterId, {
            transaction: t
        });
        const show = await Show.findByPk(showId, {
            transaction: t
        });

        if (!theater || !show) {
            await t.rollback(); // Rollback the transaction
            return res.status(400).json({
                message: 'Invalid theater or show'
            });
        }

        // Check if the seat is within the theater's capacity
        const bookedSeats = await Booking.findAll({
            where: {
                theaterId,
                showId,
            },
            transaction: t,
        });

        if (bookedSeats.length >= theater.capacity) {
            await t.rollback(); // Rollback the transaction
            return res.status(400).json({
                message: 'Theater is fully booked'
            });
        }

        // Create the booking
        const booking = await Booking.create({
            seatNumber,
            theaterId,
            showId
        }, {
            transaction: t
        });

        // Commit the transaction
        await t.commit();

        res.status(201).json(booking);
    } catch (err) {
        console.error(err);
        await t.rollback(); // Rollback the transaction
        res.status(500).json({
            message: 'Server Error'
        });
    }
});


app.listen(5001, () => {

    console.log('Server started');
})