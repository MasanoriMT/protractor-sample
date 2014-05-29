#Angular - Protractor サンプル

##サンプルの実行手順

※前提：パッケージマネージャとしてnpmとbowerを利用

1. npm install
1. bower install
1. grunt
1. grunt protractor


##webdriver-manager updateがうまくいかない場合

webdriver-managerはPROXY環境に対応してないため、必要に応じて自前で必要なモジュールをダウンロードする。

まず、protratorが依存するwebdriver関連モジュールのバージョンをpackage.jsonで確認。

    "webdriverVersions": {
      "selenium": "2.41.0",
      "chromedriver": "2.9",
      "iedriver": "2.40.0"
    },

次に、webdriver-managerのスクリプトを見ると、それぞれのURLがハードコーディングされているので、それを頼りにダウンロード対象のURLを組み立てる。

それぞれをnode_modules\protractor\selenium配下に配置。（要リネーム）

zipは展開しておく。

結果、以下のようなパス構成となる。

※zipファイルが以下のように配置されてないと、seleniumサーバの起動に支障がでる

    node_modules
    └─protractor
          └─selenium
              ├─chromedriver.exe
              ├─chromedriver_2.9.zip
              ├─IEDriverServer.exe
              ├─IEDriverServer_2.40.0.zip
              └─selenium-server-standalone-2.41.0.jar
