const router = require('express').Router();
const { Category, Product,} = require('../../models');

// finds all categories
// be sure to include its associated Products
router.get('/', async (req, res) => {
  Category.findAll({
    include: [Product]
  }).then((categories) => {
    res.json(categories)

  }).catch((err) => {
    res.status(404).json({ message: "No category found!"});
    return;
  })
});

// find one category by its `id` value
// be sure to include its associated Products
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{model: Product}]
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!'}); // will update messages 
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new category
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create ({category_name: req.body.category_name});
    res.status(200).json(categoryData);
  } catch (err){
    res.status(400).json(err);
  }
});

// update a category by its `id` value
router.put('/:id', async (req, res) => { // look at another put example to compare order of response messages
  try {
    const categoryData = await Category.update(req.body ({category_name: req.body.category_name}), {
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData[0]) {
      res.status(404).json({ message: 'No category with this id!'}
      );
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categoryData){
      res.status(404).json({ message: 'No category found with this id!'});
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
