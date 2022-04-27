const Personage = require("../models/Personage");
const Media = require("../models/media");

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

// eliminacion de personaje
const CharacterDelete = (req, res) => {
  try {
    Personage.destroy({ where: { id: req.body.id } })
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
//lista de personaje que muestra nombre e imagen.
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
// descripcion de personaje.
const characterDescription = async (req, res) => {
  try {
    const id = req.params.id;

    const character = await Personage.findByPk(id);
    
    let movie= character.mediaAssociated.map(media=>{
      return Media.findByPk(media)
    })

    const media = await Promise.all(movie)

    const result= {
      atributes: {
        name: character.name, 
        age:character.age,
        weight: character.weight,
        history: character.history,
        image: character.image,
      },
      mediaAssociated: media
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(404).json(error);
  }
};

// busqueda de personaje por querys
const characterSearch = async (req, res) => {
  try {
    const name = req.query.name;
    const age = req.query.age;
    const idMovie = req.query.movies;
    const weight = req.query.weight;

    if (name) {
      try {
        const character = await Personage.findOne({ where: { name: name } });

        if (!character)
          res.status(500).json({ msg: "character that doesn't exist" });

        res.status(200).json(character);
      } catch (error) {
        res.status(500).json(error);
      }
    }

    if (age) {
      try {
        const character = await Personage.findAll({ where: { age: age } });

        if (!character)
          res.status(500).json({ msg: "character that doesn't exist" });

        res.status(200).json(character);
      } catch (error) {
        res.status(500).json(error);
      }
    }
    if (weight) {
      try {
        const character = await Personage.findAll({ where: { weight: weight } });

        if (!character)
          res.status(500).json({ msg: "character that doesn't exist" });

        res.status(200).json(character);
      } catch (error) {
        res.status(500).json(error);
      }
    }
    if (idMovie) {
      const media = await Media.findByPk(idMovie);

      let characters = media.associatedCharacters.map((character) => {
        return Personage.findByPk(character);
      });
      const personaje = await Promise.all(characters);

      res.status(200).json(personaje);
    }
  } catch (error) {
    res.status(404).json(error);
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
