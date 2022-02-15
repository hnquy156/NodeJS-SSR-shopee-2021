const path 				= require('path');

const multer 			= require('multer');

const collectionName 	= 'settings';
const MainModel 		= require(__path_models + collectionName);
const systemConfigs 	= require(__path_configs + 'system');
const NotifyConfig 		= require(__path_configs + 'notify');
const FileHelpers 		= require(__path_helpers + 'file');
const StringHelpers 	= require(__path_helpers + 'string');

const folderView 		= `${__path_views_admin}pages/${collectionName}`;
const folderUploads 	= `${__path_uploads}${collectionName}/`;
const linkIndex 		= `/${systemConfigs.prefixAdmin}/${collectionName}`;
const pageTitle 		= "Settings";

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, folderUploads);
	},
	filename: function (req, file, cb) {
		cb(null, StringHelpers.randomStrings(10) + path.extname(file.originalname));
	},
});

const upload = multer({
	storage: storage,
	fileFilter: (req, file, cb) => {
		const mimetypeExt = ['image/png', 'image/jpg', 'image/jpeg'];
		if (mimetypeExt.indexOf(file.mimetype) > -1) {
			return cb(null, true)
		}
		return cb(NotifyConfig.ERROR_FILE_EXTENSION, false)
	},
	limits: {
		fileSize: 1 * 1024 * 1024,
	}
}).fields([
	{ name: 'logo', maxCount: 1 },
	{ name: 'logo_white', maxCount: 1 },
]);

module.exports = {
	getForm: async (req, res) => {
		const messages = req.flash('notify');
		let emptyItem = {
			id: '', linkedin: '', twitter: '', google: '', instagram: '',
			facebook: '', email: '', address: '', copyright: '', logo: '', logo_white: ''
		};
		res.locals.sidebarActive = `${collectionName}|form`;
		let item = await MainModel.getItem();
		item = item ? item : emptyItem;
	
		res.render(`${folderView}/form`, { pageTitle, item, messages });
	},
	postForm: (req, res) => {
		upload(req, res, async (err) => {
			if (err) {
				req.flash('notify', `danger|Có lỗi khi tải file. Vui lòng kiểm tra kích thước, kiểu file`);
				return res.redirect(linkIndex);
			}
			const item = req.body;
			const task = item.id ? 'edit' : 'add';
	
			const fileFields = Object.keys(req.files)
	
			if (fileFields.length === 0) {
				
			} else for(let i = 0; i < fileFields.length; i++) {
				const files = req.files;
				const filename = files[fileFields[i]][0].filename;
				const fieldname = fileFields[i];
				FileHelpers.removeFile(folderUploads, item[fieldname]);
				item[fieldname] = filename;
			}
	
			await MainModel.saveItem(item, { task });
			req.flash('notify', `success|Đã lưu cài đặt`);
			res.redirect(linkIndex);
		});
	},
}
