const { default: slugify } = require('slugify');
const Category = require('../models/category');

const createCategory = (categories, parentId = null) => {
    const categoryList = [];
    let category;
    if (parentId === null) {
        category = categories.filter(cat => cat.parentId == undefined); // '===' will not work because it check for type and value and here we want to comapre value
    } else {
        category = categories.filter(cat => cat.parentId == parentId);
    }

    for (let cat of category) {
        categoryList.push({
            _id: cat._id,
            name: cat.name,
            slug: cat.slug,
            children: createCategory(categories, cat._id)
        })
    }

    return categoryList;
}

exports.addCategory = (req, res) => {
    const categoryObj = {
        name: req.body.name,
        slug: slugify(req.body.slug)
    }

    if (req.body.parentId) {
        categoryObj.parentId = req.body.parentId;
    }

    const cat = new Category(categoryObj);
    cat.save((error, category) => {
        if (error) return res.status(400).json({ error });
        if (category) return res.status(201).json({ category });
    });
}

exports.getCategories = (req, res) => {
    Category.find({})
        .exec((error, categories) => {
            if (error) return res.status(400).json({ error });
            if (categories) {

                const categoryList = createCategory(categories);

                res.status(200).json({ categoryList });
            }
        })
}