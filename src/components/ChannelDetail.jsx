import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { Videos, ChannelCard } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState([]);

  const { id } = useParams();
  console.log(channelDetail, videos)

  useEffect(() => {
    const fetchResults = async () => {
      const data = await fetchFromAPI(`channels?part=snippet&id=${id}`);

      setChannelDetail(data?.items[0]);

      const videosData = await fetchFromAPI(`search?channelId=${id}&part=snippet%2Cid&order=date`);

      setVideos(videosData?.items);
    };

    fetchResults();
  }, [id]);

  useEffect(() => {
      fetchFromAPI(`channels?part=snippet&id=${id}`)
          .then((data) => setChannelDetail(data?.items[0]));

          fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`)
          .then((data) => setVideos(data?.items));

  }, [id])
  return (
    <Box minHeight={95}>
      <Box>
        <div style={{
          background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(14,14,155,1) 35%, rgba(28,110,185,1) 74%, rgba(0,212,255,1) 100%)", height: '300px',
          zIndex: '10'
        }}></div>
        <ChannelCard channelDetail={channelDetail} marginTop="-93px" />

      </Box>
      <Box p={2} display="flex">
        <Box sx={{ mr: { sm: '100px' } }} />
        <Videos videos={videos} />
      </Box>
    </Box>
  )
}

export default ChannelDetail