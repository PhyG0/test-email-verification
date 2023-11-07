import userSchema from '../models/User.js';

const getUsers = async (req, res) => {
    const users = await userSchema.find();
    res.status(200).json(users);
}

const getUser = async (req, res) => {
    const { username } = req.params;
    const foundOne = await userSchema.findOne({ username }).exec();

    if(!foundOne) return res.status(400).json({ 'message' : `username ${username} does not exist` })

    res.json(foundOne);
}

const deleteUser = async (req, res) => {
    const { username } = req.params;

    const foundOne = await userSchema.findOne({ username }).exec();

    if(!foundOne) return res.status(400).json({ 'message' : `username ${username} does not exist`});

    await userSchema.deleteOne({ username });
    
    await res.status(200).json({ 'success' : 'true', 'deletedUser' : foundOne });
}

export default { getUsers, getUser, deleteUser }