const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	group: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	role: {
		// owner, supervisor, or user
		type: String,
		required: true
	},
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	vaccineType: {
		// pfizer, modern, janssen, or none
		type: String,
		default: 'none'
	},
	doses: {
		type: Number,
		default: 0
	},
	vaccineStatus: {
		// 0 = not, 1 = partially, 2 = fully
		type: Number,
		default: 0
	},
	dateUpdated: {
		type: Date,
		default: Date.now
	},
	vaccineCard: {
		type: Buffer
	},
	vaccineCardType: {
		type: String
	},
	needReview: {
		type: Boolean,
		default: false
	}
});

function updateVaccineStatus(user) {
	user.dateUpdated = Date.now();
	if (user.doses === 0) {
		return 0;
	}
	if (['pfizer', 'moderna'].includes(user.vaccineType) && user.doses === 1) {
		return 1;
	}
	if (user.vaccineType === 'janssen') {
		user.doses = 1;
	}
	return 2;
}

userSchema.virtual('vaccineCardPath').get(function () {
	if (this.vaccineCard != null && this.vaccineCardType != null) {
		return `data:${
			this.vaccineCardType
		};charset=utf-8;base64,${this.vaccineCard.toString('base64')}`;
	}
});

module.exports = mongoose.model('User', userSchema);
module.exports.updateVaccineStatus = updateVaccineStatus;
