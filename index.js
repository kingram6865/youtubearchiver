/**
 * A server side tool which accesses the YOUTUBE API to gather video and channel info.
 */

import {getChannelData} from './lib/channelInfo.js'
import { getVideoData } from './lib/videoInfo.js'

async function execute(input) {
  let videoResult = await getVideoData(input)
  let channel = videoResult.videoData.api.channelId

  let channelResult = await getChannelData(channel);

  // console.log(JSON.stringify(videoResult, null, 2));
  console.log(JSON.stringify(channelResult, null, 2));

}

execute(process.argv[2]);
