
const cloudinary = require('cloudinary')
const cloudStorage = require('multer-storage-cloudinary')
const multer = require('multer')


//config cloudinary
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUD_LOCK, 
    api_secret: process.env.CLOUDINARY_SECRET 
  });

const storage = cloudStorage({
    cloudinary,
    folder: 'Bloggie',
    allowedFormats: ['jpg','png'],
    filename:(req,file,cb)=> cb(undefined,Date.now() + '-avatar')

})

const uploader = multer({storage})

module.exports = uploader;