<template>
    <view class="video-player">
        <video class="video" 
               :src= "video.src" 
               :controls="false"
               :loop="true">
        </video>
    </view>
</template>
<script>
    export default {
        props: ["video"]
    }
</script>
<style>
    .video-player {
        width: 100%;
        height: 100%;
    }
    .video {
        width: 100%;
        height: 100%;
        z-index: 19;
    }
</style>