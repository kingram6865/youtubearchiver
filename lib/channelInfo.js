import 'dotenv/config';
const youtubeBase = 'https://youtube.googleapis.com/youtube/v3'

export async function getChannelData(channelId) {
  let youtubeData, localData
  let results = {}
  let databaseInfo = {}
  let apiInfo = {}

  let youtubeUrl = `${youtubeBase}/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=${process.env.API_KEY1}`
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

export async function getChannelId(channelName) {
  let searchList = [];
  let results;
  let youtubeUrl = `${youtubeBase}/search?part=snippet&q=${encodeURIComponent(channelName)}&type=channel&maxResults=50&key=${process.env.API_KEY1}`
  try {
    const apiData = await fetch(youtubeUrl);
    results = await apiData.json();

  } catch(err) {
    console.log(`Channel Search Error:\n${err}`)
  }

  return results;
}

async function execute(input) {
  let results = await getChannelData(input);
  console.log(results);
  // let results = await getChannelId(input)
  // results.items.forEach(element => {
  //   console.log(element.snippet.publishedAt, element.snippet.channelId, element.snippet.title, element.snippet.thumbnails.high.url)
  // });
}

execute(process.argv[2]);
