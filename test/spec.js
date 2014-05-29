var fs = require('fs');

function writeScreenShot(data, filename) {
    var filepath = "test/capture/" + filename,
        stream = fs.createWriteStream(filepath);

    stream.write(new Buffer(data, 'base64'));
    stream.end();
}


describe('all test', function () {

  var browserName;
  browser.getCapabilities().then(function(capabilities){
      browserName = capabilities.toJSON().browserName;
  });


  describe('sample.html', function() {

    var input;
    var display;
    var button;

    beforeEach(function () {
        browser.get('/sample.html');

        input = element(by.model("inputText"));
        display = element(by.binding("displayText"));
        button = element(by.tagName("button"));
    });

    it('should be to upper value', function () {
        input.sendKeys('abcdef');
        button.click();
        expect(display.getText()).toEqual("ABCDEF");
    });

  });


  describe('SharedService.html', function() {

    beforeEach(function () {
        browser.get('/SharedService.html');
    });


    it('入力値が連動する', function () {
        var inputs = element.all(by.model('data.text'));

        expect(inputs.count()).toBe(2);

        // inputsはPromise → thenに渡す関数内でないと、うまくWebElementを操作できなかった。
        inputs.then(function(items) {
            // 初期値を確認
            expect(items[0].getAttribute('value')).toBe('SharedStateService');

            // キャプチャ取得
            browser.takeScreenshot().then(function (png) {
                writeScreenShot(png, browserName + 'SharedService01.png');
            });

            // 新しい値を入力（バインドされたモデルが更新される）
            items[0].clear();
            items[0].sendKeys('Test!!!');

            // モデル更新が他の項目に連動するかの確認
            expect(items[1].getAttribute('value')).toBe('Test!!!');
            expect(element(by.binding('data.text')).getText()).toBe('Test!!!');

            // キャプチャ取得
            browser.takeScreenshot().then(function (png) {
                writeScreenShot(png, browserName + 'SharedService02.png');
            });
        });

    });


  });

});
