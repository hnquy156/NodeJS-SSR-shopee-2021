const multer  = require('multer');
const path = require('path');
const fs = require('fs');

const StringHelpers = require(__path_helpers + 'string');
const NotifyConfig = require(__path_configs + 'notify');
const imageFileExtensions = /jpeg|jpg|png|gif/ig;

const uploadFile = (fieldname, destinationFolder, fileSizeMb = 2, filenameLength = 10, fileExtensions = imageFileExtensions) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, __path_uploads + destinationFolder);
        },
        filename: function (req, file, cb) {
            cb(null, StringHelpers.randomStrings(filenameLength) + path.extname(file.originalname));
        }
    });
    return upload = multer({ 
        storage: storage,
        fileFilter: (req, file, cb) => {
            const extname = fileExtensions.test(path.extname(file.originalname));
            const mimetype = fileExtensions.test(file.mimetype);
            if(extname || mimetype) {
                return cb(null, true)
            }
            return cb(NotifyConfig.ERROR_FILE_EXTENSION, false)
        },
        limits:{
            fileSize:  fileSizeMb * 1024 * 1024,
        }
    }).single(fieldname);
}

const removeFile = (folder, filename) => {
    let link = folder + filename;
    if (filename && fs.existsSync(link)) {
        fs.unlink(link, (err) => {
            if (err) throw err;
        });
    }
}

const catchFileError = (fieldname, folder) => {
    return (req, res, next) => {
        const uploadAvatar = uploadFile(fieldname, folder);
        uploadAvatar(req, res, function (err) {
            if (err) {
                req.errorMulter = err;
            }
            next();
        })
    }
}


module.exports = {
    upload: catchFileError,
    removeFile,
}