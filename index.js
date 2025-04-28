/**
 * A server side tool which accesses the YOUTUBE API to gather video and channel info.
 */

import {getChannelData} from './lib/channelInfo.js'
import { getVideoData } from './lib/videoInfo.js'

async function execute(input) {
  let videoResult = await getVideoData(input)
  // let channelResult = await getChannelData(input);
  console.log(videoResult);
}

execute(process.argv[2]);
