const Personage = require("../models/Personage");

//Creacion de personaje.

const CharacterCreate = (req, res) => {
  try {
    Personage.create({
      name: req.body.name,
      age: req.body.age,
      weight: req.body.weight,
      history: req.body.history,
      mediaAssociated: req.body.mediaAssociated,
      image: req.body.image,
    })
      .then((character) => {
        res.status(201).json({
          character: character,
        });
      })
      .catch((err) => res.status(500).json(err));
  } catch (error) {
    res.status(404).json(error);
  }
};

const CharacterDelete = (req, res) => {
  try {
    Personage.destroy({ where: { name: req.body.name } })
      .then(
        res.status(200).json({
          msg: "character delete",
          success: true,
        })
      )
      .catch((err) => res.status(500).json(err));
  } catch (error) {
    res.status(404).json(error);
  }
};

// edit personaje

const CharacterEdits = async (req, res) => {
  const { name, age, weight, history, mediaAssociated, image, id } = req.body;

  try {
    const characterEdit = await Personage.findByPk(id);

    name
      ? (characterEdit.name = name)
      : (characterEdit.name = characterEdit.name);
    age ? (characterEdit.age = age) : (characterEdit.age = characterEdit.age);
    weight
      ? (characterEdit.weight = weight)
      : (characterEdit.weight = characterEdit.weight);
    history
      ? (characterEdit.history = history)
      : (characterEdit.history = characterEdit.history);
    mediaAssociated
      ? (characterEdit.mediaAssociated = mediaAssociated)
      : (characterEdit.mediaAssociated = characterEdit.mediaAssociated);
    image
      ? (characterEdit.image = image)
      : (characterEdit.image = characterEdit.image);

    await characterEdit.save();

    res.status(200).json({ characterEdit });
  } catch (error) {
    res.status(404).json(error);
  }
};

const characterList = async (req, res) => {
  try {
    const list = await Personage.findAll();

    const listC = list.map((character) => {
      return {
        name: character.name,
        image: character.image,
      };
    });

    res.status(200).json(listC);
  } catch (error) {}
};

const characterDescription = async (req, res) => {
  try {
    const id = req.params.id;

    const character = await Personage.findByPk(id);

    res.status(200).json(character);
  } catch (error) {
    res.status(404).json(error);
  }
};
const characterSearch = async (req, res) => {
    try {
        const name = req.query.name;
        const age = req.query.age;
    
        if(name){
            try {
             
              const character = await Personage.findOne({ where: { name: name } });
          
              if (!character) res.status(500).json({ msg: "character that doesn't exist" });
          
              res.status(200).json(character);
            } catch (error) {
                res.status(500).json(error)
            }
        }

        if(age){
            try {
                const character = await Personage.findAll({ where: { age: age } });
          
              if (!character) res.status(500).json({ msg: "character that doesn't exist" });
          
              res.status(200).json(character);
            } catch (error) {
                res.status(500).json(error)
            }
        }
    } catch (error) {
        res.status(404).json(error)
    }
};


module.exports = {
  CharacterCreate,
  CharacterDelete,
  CharacterEdits,
  characterList,
  characterDescription,
  characterSearch,
};
