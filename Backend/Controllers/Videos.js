const fs = require('fs');
const path = require('path');

const base_path = path.join(path.resolve(), 'Backend', 'Resources');

const isVideo = /^(mp4|ogg|webm)$/i

const Videos = {
    get: async (req, res) => {
        const files = await fs.readdirSync(base_path);

        const obj = files.reduce((previus, current) => {
            const split = current.split('.');
            const format = split.pop();
            const name = split.join('');

            if (previus[name]) {

                if (isVideo.test(format)) {
                    return {
                        ...previus,
                        [name]: {
                            ...previus[name],
                            video: current
                        }
                    }
                }
                else {
                    return {
                        ...previus,
                        [name]: {
                            ...previus[name],
                            banner: current
                        }
                    }
                }
            }

            if (isVideo.test(format)) {
                return {
                    ...previus,
                    [name]: {
                        video: current,
                        name
                    }
                }
            }
            else {
                return {
                    ...previus,
                    [name]: {
                        banner: current,
                        name
                    }
                }
            }

        }, {})

        const keys = Object.keys(obj);

        const results = keys.map(key => obj[key])

        return res.status(200).send({ results })
    }
}

module.exports = Videos;