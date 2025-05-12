import 'dotenv/config';

export async function getChannelData(channelId) {
  let youtubeData, localData
  let results = {}
  let databaseInfo = {}
  let apiInfo = {}
  let youtubeUrl = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=${process.env.API_KEY1}`
  let localUrl = `http://${process.env.LOCALAPIHOST}:${process.env.LOCALAPIPORT}/youtube/channel/channelid/${channelId}`

  try {
    localData = await fetch(localUrl);
    databaseInfo = await localData.json();

    if (databaseInfo[0]?.objid) {
      results.dbInfo = databaseInfo[0];
      results.apiInfo = {}
    } else {
      youtubeData = await fetch(youtubeUrl);
      apiInfo = await youtubeData.json();
      results.dbInfo = {}
      results.apiInfo = apiInfo
    }

    return results;

  } catch (err) {
    console.log(err)
  }
}

async function execute(input) {
  let results = await getChannelData(input);
  console.log(results);
}

// execute(process.argv[2]);
