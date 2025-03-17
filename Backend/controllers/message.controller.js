import messageModel from "../models/message.model.js";


const getMessages = async (req, res) => {
    try {
        const messages = await messageModel.find();
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const createMessage = async (req, res) => {
    const { username, message } = req.body;

    const newMessage = new messageModel({
        username,
        message
    })

    try {
        await newMessage.save();
        req.app.get('io').emit('message', newMessage); // Pass io via app
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

export { getMessages, createMessage };