const fs = require("fs");
const lame = require("@suldashi/lame");
const speaker = require("speaker");


var playMP3 = function(file, callback) {
	var decoder	= lame.Decoder();
	var mp3	= fs.createReadStream(file);

	// Pipe the file contents to the decoder
	mp3.on('readable', function() {
		mp3.pipe(decoder);
	});

	// Pipe the decoder output into the actual speaker interface
	decoder.on('format', function(format) {
		var s = new speaker(format);
		s.on('flush', function() {
			callback();
		});

		decoder.pipe(s);
	});
};

module.exports = {
    playMP3
}