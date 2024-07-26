const supabase = require('../supabase.js')

const NodeCache = require('node-cache')
const cache = new NodeCache({ stdTTL: 12 * 60 * 60 })

module.exports.fetchCoordinators = async (req, res) => {
    try {
        const cacheKey = 'coordinators'
        const cachedCoordinators = cache.get(cacheKey)

        if (cachedCoordinators) {
            return res.status(200).json({
                data: cachedCoordinators,
                error: null,
            })
        }

        const { data: coordinators, error } = await supabase
            .from('coordinators')
            .select('*')
        if (error) throw error

        cache.set(cacheKey, coordinators)

        return res.status(200).json({
            data: coordinators,
            error: null,
        })
    } catch (err) {
        return res.status(409).send({
            data: null,
            error: err.message,
        })
    }
}