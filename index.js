/**
 * A server side tool which accesses the YOUTUBE API to gather video and channel info.
 */

import { getChannelData } from './lib/channelInfo.js'
import { getVideoData } from './lib/videoInfo.js'
import * as utils from './lib/utilities.js'

async function insertNewVideo(data) {
  let results, insertResults
  let url = `http://andre:3019/youtube/video/add`  
  let postData = {
    keywords: (data.tags?.length > 0) ? data.tags.join(","): "",
    published: utils.formatDate(data.publishedAt),
    title: data.title,
    description: data.description,
    duration: utils.formatDuration(data.duration),
    url: data.url,
    channel_owner_id: data.channel_owner_id,
    status: 1,
    rewatch: 0,
    thumbnails: JSON.stringify(data.thumbnails)
  }

  let options = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(postData)
  }

  insertResults = await fetch(url, options);
  results = await insertResults.json();

  return results.insertId
}

async function insertNewChannel(data) {
  let results, insertResults
  let url = `http://andre:3019/youtube/channel/add`
  let postData = {
    channel_id: data.id,
    published: utils.formatDate(data.snippet.publishedAt),
    title: data.snippet.title,
    description: data.snippet.description,
    thumbnail: data.snippet.thumbnails.high,
    views: data.statistics.viewCount
  }

  let options = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(postData)
  }

  insertResults = await fetch(url, options);
  results = await insertResults.json();
  
  return results.insertId
}

async function execute(input) {
  let channelObjid, channelInfo;
  let videoPostData = {}
  let channelPostData = {}

  let videoStatus = await getVideoData(input)

  if (videoStatus?.dbInfo.objid) {
    channelInfo = await getChannelData(videoStatus.api.channelId);
    videoPostData.channel_owner_id = videoStatus.dbInfo.objid
    console.log(`Video already exists for Channel {objid: ${ videoStatus.dbInfo.objid} channel_owner_name: ${videoStatus.dbInfo.channel_owner_name} }`)
  } else {
    console.log(`Video does not exist`)
    videoPostData = {...videoStatus.api, url: `https://www.youtube.com/watch?v=${input}`}
    channelInfo = await getChannelData(videoStatus.api.channelId);

    if (channelInfo?.dbInfo.objid) {
      console.log(`Channel ${channelInfo.dbInfo.owner_name} already exists`)
      videoPostData.channel_owner_id = channelInfo.dbInfo.objid
    } else {
      channelPostData = {...channelInfo.apiInfo.items[0]}
      console.log(`Adding Channel ${channelInfo.apiInfo.items[0].snippet.title}`)
      channelObjid = await insertNewChannel(channelPostData)
      console.log('New Channel id: ', channelObjid)
      videoPostData.channel_owner_id = channelObjid
    }

    let videoId = await insertNewVideo(videoPostData);
    console.log(`New Video id: ${videoId}`);
  }
}

execute(process.argv[2]);
