const clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: '00f26b71259f4805a38a075947c50635'
});

const hanldeApiCall = (req, res) => {
  app.models
    .predict("a403429f2ddf4b49b307e318f00e528b", req.body.input)
    .then(data => res.json(data))
    .catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users').where({id})
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0]);
    })
    .catch(err => res.status(400).json('error getting user'))
}

module.exports = {
  handleImage,
  hanldeApiCall
}