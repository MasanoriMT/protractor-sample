exports.config = {
    // 単一マシンで実行するならselenium serverを起動しておく必要はない
    seleniumAddress: "http://localhost:4444/wd/hub",

    // ieは激重 → IEDriverの問題としてレポートされている
    multiCapabilities: [{
      'browserName': 'firefox'
    }, {
      'browserName': 'chrome'
    }],

    chromeOnly: false,

    specs: ["spec.js"],
    baseUrl: 'http://localhost:9000/',
    framework: "jasmine",
    jasmineNodeOpts: {
        showColors: true
    }
}