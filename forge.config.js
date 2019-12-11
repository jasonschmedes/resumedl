const path = require('path')

module.exports = {
  "packagerConfig": {
    "icon": "build/icon.icns"
  },
  "makers": [
    {
      "name": "@electron-forge/maker-squirrel",
      "config": {
        "name": "ResumeDL"
      }
    },
    {
      "name": "@electron-forge/maker-zip",
      "platforms": [
        "darwin"
      ]
    },
    {
      "name": "@electron-forge/maker-deb",
      "config": {}
    },
    {
      "name": "@electron-forge/maker-dmg",
      "config": {
        "additionalDMGOptions": {
          "window": {
            "size": {
              "width": 540,
              "height": 380
            }
          }
        },
        "background": "build/background.png",
        "contents": [
          { "x": 300, "y": 200, "type": "link", "path": "/Applications" },
          { "x": 60, "y": 200, "type": "file", "path": path.resolve(__dirname, "out/ResumeDL-darwin-x64/ResumeDL.app") }
        ],
        "format": "ULFO",
        "icon": "build/icon.icns",
        "overwrite": true
      }
    },
    {
      "name": "@electron-forge/maker-rpm",
      "config": {}
    }
  ]
}
