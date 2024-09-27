import User from '../models/User.js';


export const getUsers = async (req, res) => {
    try {
        const allUsers = await User.findAll();

        return res.status(200).json({ allUsers: allUsers });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to get all users" });
    }
};


export const getUser = async (req, res) => {
    const userid = req.body.id;
    try {
        const user = await User.findOne({
            where: {
                id: userid
            }
        });

        return res.status(200).json({ user: user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to get user" });
    }
};


export const deleteUser = async (req, res) => {
    const id = req.body.id
    try {
        const deletedUser = await User.destroy({
            where: {
                id: id
            }
        });

    // Check if the user existed and was deleted
    if (deletedUser) {
        return res.status(200).json({ message: 'User deleted by Admin successfully' });
      } else {
        return res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to delete user" });
    }
};
