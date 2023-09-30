const router = require('express').Router();
// const { Model } = require('sequelize');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint


// find all categories
// be sure to include its associated Products
router.get('/', async (req, res) => {
  try {
    const categoriesData = await Category.findAll({ include: [{ model: Product }] });
    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// find one category by its `id` value
// be sure to include its associated Products
router.get('/:id', async (req, res) => {
  try {
    const categoriesData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!categoriesData) {
      res.status(404).json({ message: "No Category with this ID." })
    }

    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }

});

// create category
router.post('/', async (req, res) => {
  try {
    const categoriesData = await Category.create(
      req.body
    );
    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updatedCategory = await Category.update(req.body, {
      where: { id: req.params.id },
    });
    res.json(updatedCategory);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});


router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoriesData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!categoriesData) {
      res.status(404).json({ message: 'No locatoin with this id!' })
      return;
    }

    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
