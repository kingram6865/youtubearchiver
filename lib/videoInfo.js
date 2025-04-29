import 'dotenv/config';
// import axios from 'axios';

export async function getVideoData(videoId) {
  let localData, youtubeData;
  let results = {}
  let databaseInfo = {}
  let apiInfo = {}
  let youtubeUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${process.env.API_KEY1}`;
  let dbUrl = `http://andre:3019/youtube/videoid/${videoId}`;

  try {
    localData = await fetch(dbUrl);
    databaseInfo = await localData.json()
    results.dbInfo = databaseInfo.video

    if (results.dbInfo?.objid) {
      console.log(`Video already exists. Objid [${results.dbInfo.objid}] `)
      results.api = {}
    } else {
      console.log(`Fetching video info for v=${videoId} from Youtube API`)
      youtubeData = await fetch(youtubeUrl);
      apiInfo = await youtubeData.json();
      results.api = {
        duration: apiInfo.items[0].contentDetails.duration,
        ...apiInfo.items[0].snippet
      };
    }

    return results;

  } catch (err) {
    console.log(err)
  }
}

async function execute(input) {
  let results = await getVideoData(input);
  console.log(results)
}

execute(process.argv[2])