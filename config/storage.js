module.exports = {
  'use': 'local',
  'platforms': {
    'local': {
      'hostname': 'http://localhost:8083',
      'rootFolder': './public/static',
      'imagesFolder': '/images'
    }
  },
  getCurrentPlatform() {
    return this.platforms[this.use];
  },
  getHostname() {
    return this.getCurrentPlatform().hostname;
  },
  getRootFolder() {
    return this.getCurrentPlatform().rootFolder;
  },
  getImageFolder() {
    return this.getCurrentPlatform().imagesFolder
  }
}