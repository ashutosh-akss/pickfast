module.exports = {
    URL: `http://api.mVaayoo.com/mvaayooapi/MessageCompose?user=${this.USERNAME}:${this.PASSWORD}&senderID=${this.SENDER_ID}&receipientno={{mobile}}&dcs=0&msgtxt={{message}}&state=4`,
    SENDER_ID: 'PICKER',
    USERNAME: process.env.SMS_USERNAME,
    PASSWORD: process.env.SMS_PASSWORD,
    TEMPLATES: {
        SIGNUP: '{{code}} is your {{purpose}} OTP. please do not share it with anyone.'
    }
}