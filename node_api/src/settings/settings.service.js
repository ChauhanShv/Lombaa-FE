const Setting = require('./settings.model')

class SettingService {

    async getRawValue(key) {
        const data = await Setting.findOne({ where: { key_name: key } })
        return data?.value ?? null

    }

    async getInt(key) {
        if (!key) return null;
        const value = await this.getRawValue(key)
        return parseInt(value)
    }
    async getString(key) {
        if (!key) return null;
        const value = await this.getRawValue(key)
        return toString(value)
    }
}
module.exports = SettingService