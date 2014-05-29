module.exports = function (grunt) {

    // この関数はテスト実行に必要ない。調査用に残してある。
    function log(err, stdout, stderr, cb) {
    //    grunt.file.write("err.txt", err);
        cb();
    }

    grunt.initConfig({

        connect: {
          server: {
            options: {
              // keepaliveを付与しないと、gruntが実行を終えたときに、サーバも停止してしまう
              // grunt connect で起動しっぱにするならkeepaliveをつけとく
              //keepalive: true,
              port: 9000,
              base: 'app'
            }
          }
        },

        // selenium serverを起動する
        // 単一マシンでテスト実行するならselenium serverは必須じゃないはず
        shell: {
            options: {
                stdout: true
            },

            start: {
                // nodeコマンドを経由しても実行できるはずなのだが、うまくいかなかった。。。
                command: "node ./node_modules/protractor/bin/webdriver-manager start",
                options: {
                    //async: true,
                    callback: log
                }
            }
        },

        protractor: {
            options: {
                keepAlive: true,
                noColor: false
            },
            target: {
                options: {
                    configFile: "test/conf.js"
                }
            }
        }
    });

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // http server起動 → selenium serverを起動
    // 別ターミナルでprotractorテストという流れ
    grunt.registerTask('default', ['connect', 'shell']);

};
