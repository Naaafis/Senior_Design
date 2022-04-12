var fs = require("file-system");
const http = require("http");
const FormData = require("form-data");
const server = http.createServer();
const fileName = "recording.wav";
const axios = require('axios').default;

server.on("request", (request, response) => {
	if (request.method == "POST" && request.url === "/uploadAudio") {
		var recordingFile = fs.createWriteStream(fileName, { encoding: "utf8" });
		request.on("data", function(data) {
			recordingFile.write(data);
		});

		request.on("end", async function() {
			recordingFile.end();
			
			//const transciption = await speechToTextAPI();
			response.writeHead(200, { "Content-Type": "text/plain" });
			response.end("transciption");
		});

		//app.post('/upload', async (req, res) => {

			// existing code for receiving the file
			const formData = new FormData();
			formData.append('received', "received");

			try {

				const res = axios.post(
					'http://192.168.0.169:5000/predict',
					formData
				);

				console.log(res);

			} catch (e) {

				console.log(e);

			}

		//});
	} else {
		console.log("Error Check your POST request");
		response.writeHead(405, { "Content-Type": "text/plain" });
	}
});

// async function speechToTextAPI() {
// 	// Imports the Google Cloud client library
// 	const speech = require("@google-cloud/speech");
// 	const fs = require("fs");

// 	// Creates a client
// 	const client = new speech.SpeechClient();

// 	// Reads a local audio file and converts it to base64
// 	const file = fs.readFileSync(fileName);
// 	const audioBytes = file.toString("base64");

// 	// The audio file's encoding, sample rate in hertz, and BCP-47 language code
// 	const audio = {
// 		content: audioBytes
// 	};
// 	const config = {
// 		encoding: "LINEAR16",
// 		sampleRateHertz: 16000,
// 		languageCode: "en-US"
// 	};
// 	const request = {
// 		audio: audio,
// 		config: config
// 	};

// 	// Detects speech in the audio file
// 	const [response] = await client.recognize(request);
// 	const transcription = response.results.map((result) => result.alternatives[0].transcript).join("\n");
// 	console.log(`Transcription: ${transcription}`);
// 	return transcription;
// }

const port = 8888;
server.listen(port);
console.log(`Listening at ${port}`);
