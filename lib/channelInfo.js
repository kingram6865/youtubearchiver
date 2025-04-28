import 'dotenv/config';
import axios from 'axios';

export async function getChannelData(channelId) {
  let databaseInfo = {}
  let apiInfo = {}
  let youtubeUrl = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=${process.env.API_KEY1}`
  let localUrl = `http://andre:3019/youtube/channel/channelid/${channelId}`

  try {
    // let youtubeData = await axios.get(youtubeUrl);
    // let localData = await axios.get(localUrl);

    let youtubeData = await fetch(youtubeUrl);
    let localData = await fetch(localUrl);

    // apiInfo = youtubeData.data.items[0];
    // databaseInfo = localData.data;
  
    // return {
    //   channelData: {
    //     youtubeAPI: apiInfo,
    //     localdb: databaseInfo
    //   }
    // }

    return {
      channelData: {
        youtubeAPI: youtubeData,
        localdb: localData
      }
    }
  } catch (err) {
    console.log(err)
  }

}
