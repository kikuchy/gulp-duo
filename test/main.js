var should = require('should');
var duo = require('../')();
var gutil = require('gulp-util');
var fs = require('fs');
var pj = require('path').join;

describe('gulp-duo', function () {
    describe('duo()', function () {

        it('should pass the file when it isNull()', function (done) {
            var stream = duo();
            var emptyFile = {
                isNull: function () {
                    return true;
                }
            };
            stream.once('data', function (data) {
                data.should.equal(emptyFile);
                done();
            });
            stream.write(emptyFile);
            stream.end();
        });

    it('should emit errors when the file isStream()', function (done) {
        var stream = duo();
        var streamFile = {
            isNull: function () { return false; },
            isStream: function () { return true; }
        };
        stream.once('error', function (err) {
            err.message.should.equal('Streaming not supported');
            done();
        });
        stream.write(streamFile);
        stream.end();
    });

    it('should build single javascript file requires one local file', function (done) {
        var base = pj(__dirname, 'fixtures');
        var filePath = pj(base, 'index.js');
        var targetFile = new gutil.File({
            cwd: __dirname,
            base: base,
            path: filePath,
            contents: fs.readFileSync(filePath)
        });
        var stream = duo();
        stream.once('data', function (file) {
            should.exist(file);
            should.exist(file.path);
            should.exist(file.relative);
            should.exist(file.contents);
            file.path.should.equal(pj(__dirname, 'fixtures', 'index.js'));
            String(file.contents).should.equal(fs.readFileSync(pj(__dirname, 'expect', 'index.js'), 'utf8'));
        }).on('end', function () {
            done();
        });
        stream.write(targetFile);
        stream.end();
    });

    });
});
