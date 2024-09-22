export const getComments = async (req, res) => {
    try {

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to get all comments" });
    }
};


export const addComment = async (req, res) => {
    try {

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to add comment" });
    }
};


export const editComment = async (req, res) => {
    try {

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to edit comment" });
    }
};


export const deleteComment = async (req, res) => {
    try {

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to delete comment" });
    }
};
