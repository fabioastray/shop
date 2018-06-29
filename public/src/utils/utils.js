import MobileDetect from 'mobile-detect'

export default {
    isDevEnvironment: ['localhost'].indexOf(window.location.hostname) !== -1,

    isEmptyObject: function(data) {
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                return false
            }
        }
        return true
    },

    isObject: function(data) {
        return typeof data === 'object' && data.constructor === Object
    },

    isMap: function(data) {
        return typeof data === 'object' && data.constructor === Map
    },

    isArray: function(data) {
        return typeof data === 'object' && data.constructor === Array
    },

    isString: function(data) {
        return typeof data === 'string'
    },

    isEmpty: function(data) {
        try {
            return !data.constructor ||
                ((this.isArray(data) || this.isString(data)) && data.length === 0) ||
                (this.isObject(data) && this.isEmptyObject(data))
        } catch (error) {
            return true
        }
    },

    groupOneBy: function(array, property) {
        return array.reduce(function(acc, object) {
            var key = object[property]
            acc[key] = object

            return acc
        }, {})
    },

    groupArrayBy: function(array, property) {
        return array.reduce(function(acc, object) {
            var key = object[property]
            if (!acc[key]) {
                acc[key] = []
            }

            acc[key].push(object)

            return acc
        }, {})
    },

    normalizeData: function(rawData) {
        if (!rawData || this.isEmpty(rawData)) {
            return []
        } else if (this.isObject(rawData)) {
            rawData = [rawData]
        }

        return rawData
    },

    copyObjectKeys: function(objectToBeCopied, initAs) {
        var newObj = {}

        for (var key in objectToBeCopied) {
            newObj[key] = initAs
        }

        return newObj
    },

    copyObjectValues: function(objectToBeCopied, initAs) {
        var newObj = {}

        for (var key in objectToBeCopied) {
            newObj[objectToBeCopied[key]] = initAs
        }

        return newObj
    },

    copyObjectProperty: function(objectToBeCopied, property, initAs) {
        var newObj = {}

        for (var key in objectToBeCopied) {
            var object = objectToBeCopied[key]
            if (object) {
                newObj[object[property]] = initAs
            }
        }

        return newObj
    },

    resetArraySize: function(array) {
        array.length = 0
        return array
    },

    goToUrl: function(url, target) {
        window.open(url, target)
    },

    isMobile: function() {
        var mobileDetect = new MobileDetect(window.navigator.userAgent)
        var mobileBrand = mobileDetect.mobile()

        return mobileBrand !== null
    },

    toHash: function(string) {
        var hash = 0
        var stringLength = string.length

        if (stringLength === 0) { return hash }

        for (var i = 0; i < stringLength; i++) {
            var char = string.charCodeAt(i)
            hash = ((hash << 5) - hash) + char
            hash = hash & hash // Convert to 32bit integer
        }

        return Math.abs(hash).toString()
    },

    toUCFirst: function(stringL) {
        if (!this.isEmpty(stringL)) {
            if (stringL.length === 1) {
                return stringL.toUpperCase()
            } else {
                return stringL.charAt(0).toUpperCase() + stringL.substr(1)
            }
        }
    },

    getMonthsShortNames: function() {
        return [
            'jan', 'feb', 'mar', 'apr', 'may', 'jun',
            'jul', 'aug', 'sep', 'oct', 'nov', 'dec'
        ]
    },

    getMonthsLongNames: function() {
        return [
            'january', 'february', 'march', 'april', 'may', 'june',
            'july', 'august', 'september', 'october', 'november', 'december'
        ]
    },

    getI18nMonth: function(position, shortName) {
        const months = shortName ? this.getMonthsShortNames() : this.getMonthsLongNames()
        const month = months[position]
        if (!this.isEmpty(month)) {
            return window.NCLResources && window.NCLResources.strings
                ? window.NCLResources.strings[month]
                : this.toUCFirst(month)
        }
    },

    getMonthPositionAsString: function(monthName, shortName) {
        const months = shortName ? this.getMonthsShortNames() : this.getMonthsLongNames()
        let month = ''

        const position = months.indexOf(monthName)
        if (position !== -1) {
            month = (position + 1).toString()
            month = month.length > 1 ? month : '0' + month
        }

        return month
    },

    getMonthPosition: function(monthName, shortName) {
        const months = shortName ? this.getMonthsShortNames() : this.getMonthsLongNames()
        return months.indexOf(monthName)
    },

    arr_diff: function (a1, a2) {
        let a = []
        let diff = []

        for (let i = 0; i < a1.length; i++) {
            a[a1[i]] = true
        }

        for (let i = 0; i < a2.length; i++) {
            if (a[a2[i]]) {
                delete a[a2[i]]
            } else {
                a[a2[i]] = true
            }
        }

        for (const k in a) {
            diff.push(k)
        }

        return diff
    },

    getDistanceBetweenLocations: function(lat1, lon1, lat2, lon2, measurement) {
        let radius = 0
        switch (measurement) {
        case 'km':
            radius = 6371// Radius of the earth in km
            break
        case 'mile':
            radius = 3959// Radius of the earth in miles
            break
        }

        if (radius === 0) {
            return `Non supported measurement: ${measurement}`
        }

        const dLat = this.deg2rad(lat2 - lat1) // deg2rad below
        const dLon = this.deg2rad(lon2 - lon1)
        const a =
            Math.pow(Math.sin(dLat / 2), 2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
            Math.pow(Math.sin(dLon / 2), 2)

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        const distance = radius * c
        return distance
    },

    deg2rad: function(deg) {
        return deg * (Math.PI / 180)
    },

    getCurrentPosition(success, error) {
        if (this.isEmpty(navigator.geolocation)) {
            return 'geolocation IS NOT available'
        }

        return navigator.geolocation.getCurrentPosition(success, error)
    },

    getCookie(cname) {
        const name = cname + '='
        const decodedCookie = decodeURIComponent(document.cookie)
        const ca = decodedCookie.split(';')
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i]
            while (c.charAt(0) === ' ') {
                c = c.substring(1)
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length)
            }
        }
        return ''
    }
}
