import 'dotenv/config';
// import axios from 'axios';

export async function getChannelData(channelId) {
  let youtubeData
  let databaseInfo = {}
  let apiInfo = {}
  let youtubeUrl = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=${process.env.API_KEY1}`
  let localUrl = `http://andre:3019/youtube/channel/channelid/${channelId}`

  try {
    // let youtubeData = await axios.get(youtubeUrl);
    // let localData = await axios.get(localUrl);

    let localData = await fetch(localUrl);
    databaseInfo = await localData.json;

    if (databaseInfo?.objid) {
      console.log(`Channel already exists`);
    } else {
      console.log('Need to fectch channel info from Youtube API');
      // youtubeData = await fetch(youtubeUrl);
      // apiInfo = await youtubeData.json();
    }
    

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
        youtubeAPI: {...apiInfo},
        localdb: {...databaseInfo}
      }
    }
  } catch (err) {
    console.log(err)
  }
}

async function execute(input) {
  let results = await getChannelData(input);
  console.log(results);
}

execute(process.argv[2]);