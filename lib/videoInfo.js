import 'dotenv/config';
// import axios from 'axios';

export async function getVideoData(videoId) {
  let apiData = {};
  let localData = {};
  let youtubeUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${process.env.API_KEY1}`;
  let dbUrl = `http://andre:3019/youtube/videoid/${videoId}`;

  try {
    // let apiResult = await axios.get(youtubeUrl);
    // let dbResult = await axios.get(dbUrl);

    let apiResult = await fetch(youtubeUrl);
    let dbResult = await fetch(dbUrl);


    // apiData = apiResult.data.items[0]
    // localData = dbResult.data
    
    apiData = await apiResult.json()
    localData = await dbResult.json()


    return {
      videoData: {
        api: {...apiData.items[0].snippet, duration: apiData.items[0].contentDetails.duration},
        localdb: {...localData}
      }
    }

  } catch (err) {
    console.log(err)
  }
}
