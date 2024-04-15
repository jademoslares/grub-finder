const Menu = require('../../models/menu');


module.exports = {
    index,
    show,
    create,
    update,
    deleteItem,
};

async function index(req, res) {
    const menuItems = await Menu.find({}).sort('name');
    res.json(menuItems);
}

async function show(req, res) {
    const menu = await Menu.findById(req.params.id);
    res.json(menu);
} 

async function create(req, res) {
    const menu = new Menu(req.body);
    const savedMenu = await menu.save();
    res.status(201).json(savedMenu);
}

async function update (req, res) {
    const menu = await Menu.findById(req.params.id);
    if (!menu) {
        res.status(404).json({ error: 'Item not found' });
    } else {
        menu.name = req.body.name;
        menu.price = req.body.price;
        menu.description = req.body.description;

        const updatedMenu = await menu.save();
        res.json(updatedMenu);
    }
}

async function deleteItem (req, res) {
    const menu = await Menu.findById(req.params.id);
    if (!menu) {
        return res.status(404).json({ error: 'Item not found' });
    }
    await menu.remove();
    res.json({ message: 'Item deleted successfully' });
}