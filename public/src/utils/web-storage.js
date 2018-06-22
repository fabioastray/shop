class WebStorage {

    constructor(type, cacheTimeSpan) {

        const supportedTypes = ['localStorage', 'sessionStorage'];

        if (!Utils.isEmpty(type) && supportedTypes.indexOf(type) === -1)
            console.error([
                'Unsupported storage type, currently supported are: ',
                supportedTypes.join(', '),
                ' defaulting to ',
                supportedTypes[0]
            ].join(''));

        this.type = type || supportedTypes[0];
        this.cacheTimeSpan = cacheTimeSpan || 5 * 60;// 5 mins
    }

    getNamespace(namespaceKey) {
        const element = window[this.type].getItem(namespaceKey);

        if (!Utils.isEmpty(element))
            return JSON.parse(element);
    }

    setNamespace(namespaceKey, namespace) {
        window[this.type].setItem(namespaceKey, JSON.stringify(namespace));

        this.clearExpiredCacheItems(namespaceKey);
    }

    removeNamespace(namespaceKey) {
        window[this.type].removeItem(namespaceKey);

        this.clearExpiredCacheItems(namespaceKey);
    }

    getItem(namespaceKey, key) {
        const namespace = this.getNamespace(namespaceKey);

        if (!Utils.isEmpty(namespace) && namespace.hasOwnProperty(key)) {
            const item = namespace[key];
            const cachedSince = new Date(item.date).getTime();
            const age = (Date.now() - cachedSince) / 1000;

            if (age > this.cacheTimeSpan) {
                return this.removeItem(namespaceKey, key);
            }

            return item;
        }
    }

    setItem(namespaceKey, key, value) {
        value.date = Date.now();
        let namespace = this.getNamespace(namespaceKey);

        if (Utils.isEmpty(namespace)) {
            namespace = {};       
            namespace[key] = value;
            return this.setNamespace(namespaceKey, namespace);     
        }

        namespace[key] = value;
        window[this.type].setItem(namespaceKey, JSON.stringify(namespace));

        this.clearExpiredCacheItems(namespaceKey);
    }

    removeItem(namespaceKey, key) {
        let namespace = this.getNamespace(namespaceKey);

        if (!Utils.isEmpty(namespace) && namespace.hasOwnProperty(key)) {
            delete namespace[key];
            this.setNamespace(namespaceKey, namespace);
        }

        this.clearExpiredCacheItems(namespaceKey);
    }

    clearExpiredCacheItems(namespaceKey) {
        let namespace = this.getNamespace(namespaceKey);

        if (!Utils.isEmpty(namespace)) {
            for (const key in namespace) {
                this.getItem(namespaceKey, key);
            }
            this.getUsedStorageSize();
        }
    }

    findAlikeItemsKeys(namespaceKey, key) {
        const namespace = this.getNamespace(namespaceKey);

        if (!Utils.isEmpty(namespace)) {
            const namespaceKeys = Object.keys(namespace);
            return namespaceKeys.filter((skey) => skey.indexOf(key) !== -1)
                                .sort((a, b) => {
                                    a = a.length;
                                    b = b.length;
                                    
                                    if (a < b)
                                        return -1;
                                    if (a > b)
                                        return 1;

                                    return 0;
                                });
        }
    }

    getUsedStorageSize() {
        let total = 0;
        for (const x in window[this.type]) {
            // Value is multiplied by 2 due to data being stored in 'utf-16' format, which requires twice the space.
            const element = window[this.type][x];
            if (typeof element !== 'function' && element.length) {
                const amount = (element.length * 2) / 1024 / 1024;
                total += amount;
            }
        }

        // console.info('Space used for' + this.type + ' : ' + total + ' Mb');
        return total.toFixed(2);
    }
}