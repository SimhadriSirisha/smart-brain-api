const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '8300f6badd764e3da83e34196cb32fe4'
});

const handleApiCall = (req,res) => {
    app.models
      .initModel(Clarifai.FACE_DETECT_MODEL)
      .then(generalModel => {
        return generalModel.predict(req.body.input);
      })
      .then(data => {
        res.json(data);
      })
      .catch(err => res.status(404).json('unable tp work with api'))
}

const handleImage = (req,res,db) => {
	const {id} = req.body;
	db('users').where('id','=',id)
	.increment('entries',1)
	.returning('entries')
	.then(entries => {
		res.json(entries);
	}).catch(err => res.status(404).json('unable to get entries'))
}

module.exports = {
	handleImage,
	handleApiCall
}