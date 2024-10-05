import Category from "../models/Category.js";


export const getCategories = async (req, res) => {
    try {
        const allCategories = await Category.findAll();

        return res.status(200).json({ categories: allCategories });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to get all categories" });
    };
};


export const getCategory = async (req, res) => {
    try {
        const category = await Category.findOne({
            where: {
                slug: req.params.slug
            }
        });

        return res.status(200).json({ categories: category });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to get category" });
    };
};


export const addCategory = async (req, res) => {
    const { name, description, slug } = req.body;

    try {
        const newCategory = await Category.create({
            name: name,
            description: description,
            slug: slug
        });

        return res.status(200).json({ message: "Category created successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to add new category" });
    };
};


export const updateCategory = async (req, res) => {
    try {
        const [updateCategory] = await Category.update(req.body, {
            where: {
                slug: req.params.slug
            }
        }); 

        return res.status(200).json({ message: "Category updated successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to update category" });
    };
};


export const deleteCategory = async (req, res) => {
    try {
        const deletedCategory = await Category.destroy({
            where: {
                slug: req.params.slug
            }
        });

        // Check if the category exists and was deleted
        if (deletedCategory) {
            return res.status(200).json({ message: 'Category deleted successfully' });
        } else {
            return res.status(404).json({ message: 'Category not found' });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to delete category" });
    }
};
