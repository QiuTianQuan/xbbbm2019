<template>
    <div>
        <PostContent type="问题" ownurl="http://wx.yyeke.com/2720/xbbbm/answer"  contentL="100" pathto="-1" :istitle="false"  :id="id" :iscollege="false"/>
    </div>
</template>

<script>
export default {
    data(){
        return {
            id: this.$route.params.id
        }
    }
}
</script>
