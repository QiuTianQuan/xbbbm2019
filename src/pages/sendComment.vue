<template>
    <div>
        <PostContent type="问题" ownurl="http://wx.yyeke.com/xbbbm/answer"  contentL="100" pathto="-1" :istitle="false"  :id="id" />
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
