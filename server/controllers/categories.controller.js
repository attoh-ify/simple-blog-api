export const getCategories = async (req, res) => {
    try {

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to get all categories" });
    }
};


export const addCategory = async (req, res) => {
    try {

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to add new category" });
    }
};
