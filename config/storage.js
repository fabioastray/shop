module.exports = {
  'use': 'local',
  'platforms': {
    'local': {
      'rootFolder': './public/static',
      'imagesFolder': '/images'
    }
  },
  getCurrentPlatform() {
    return this.platforms[this.use];
  },
  getRootFolder() {
    return this.getCurrentPlatform().rootFolder;
  },
  getImageFolder() {
    this.getCurrentPlatform().imagesFolder
  }
}