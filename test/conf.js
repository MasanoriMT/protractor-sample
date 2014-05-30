exports.config = {
    // 単一マシンで実行するならselenium serverを起動しておく必要はない
    // 但し、その場合、multiCapabilitiesで複数ブラウザを指定した場合、それぞれにselenium serverが起動されるようだ
    // 別マシンで稼働しているselenium serverに接続した場合、その端末のブラウザが起動、そのブラウザの自動テストを実行する
    seleniumAddress: "http://localhost:4444/wd/hub",

    // ieは激重 → IEDriverの問題としてレポートされている
    // 'safari'もいける（ChromeやIEのようにDriverが別途必要になることもない）
    //
    // phantomjsもOK → PhantomJSはselenium serverが起動してくれる
    // PhantomJSを手動で起動（--webdriverオプション）して、そちらに接続するようseleniumAddressを変更することもできる
    multiCapabilities: [ {
      'browserName': 'phantomjs',
    
      /* 
       * Can be used to specify the phantomjs binary path.
       * This can generally be ommitted if you installed phantomjs globally.
       */
      'phantomjs.binary.path':'./node_modules/.bin/phantomjs',
    
      /*
       * Command line arugments to pass to phantomjs. 
       * Can be ommitted if no arguments need to be passed. 
       * Acceptable cli arugments: https://github.com/ariya/phantomjs/wiki/API-Reference#wiki-command-line-options
       */
      'phantomjs.cli.args':['--webdriver-loglevel=DEBUG']
    }],

    chromeOnly: false,

    specs: ["spec.js"],
    baseUrl: 'http://localhost:9000/',
    framework: "jasmine",
    jasmineNodeOpts: {
        showColors: true
    }
}