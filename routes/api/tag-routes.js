const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

  // find all tags
router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }],
    });
    res.json(tags);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

  // find a single tag by its `id`
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag }],
    });

    if (!tagData) {
      res.status(404).json({ message: 'Tag Not Found' });
      return;
    }

    res.json(tagData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }

});

  // create a new tag
router.post('/', async (req, res) => {
  try {
    const newTagData = await Tag.create(req.body);
    res.json(newTagData);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const updatedTagData = await Tag.update(req.body, {
      where: { id: req.params.id },
    });
    res.json(updatedTagData);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const deletedTagData = await Tag.destroy({
      where: { id: req.params.id },
    });
    res.json(deletedTagData);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

module.exports = router;
