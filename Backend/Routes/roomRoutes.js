const room = require('../Modules/Room');
const express = require('express');
const route = express.Router();

route.post('/room', async (req, res) => {
    try {
        const data = req.data;
        const roomobj = new room(data);
        const SaveRoom = await roomobj.save();
        console.log("Data saved Sucessfully");
        res.status(201).json(SaveRoom);
    } catch (err) {
        console.error('error occur while inserting data');
        res.status(500).json({ error: err.message });
    }
})

route.get('/room', async (req, res) => {
    try {
        const response = await room.find();
        console.log('data fetched sucessfully');
        res.status(200).json(response)
    } catch (err) {
        console.log('error while fetching', err);
        res.status(500).json({ message: err.message });
    }

})


route.put('/room/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedRoom = req.body;

        const response = await menu.findByIdAndUpdate(id, updatedMenu, {
            new: true,
            runValidators: true,
        })
        if (!response) {
            return res.status(404).json({ error: 'Room not found' });
        }
        console.log('data updated sucessfully');
        res.status(200).json({ message: 'updated sucessfully' });

    } catch (err) {
        console.log('error has been seen')
        if (err.name === 'ValidationError') {
            console.log('validation error');
            res.status(500).json({ error: err.message })
        }
        res.status(500).json({ error: err.message });
    }
})

