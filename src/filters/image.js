module.exports = {
  imageOnly(req, file, callback) {
    if (!file.mimetype.split('/').pop().match(/(jpg|jpeg|png|gif)$/)) {
      return callback(new Error('Only image files are allowed!'), false)
    }

    callback(null, true)
  }
}