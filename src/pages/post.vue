<template>
    <div id="sendpage">
        <div class="banner">
            <img src='../assets/imgs/banner.png'>
        </div>
        <div class="btn">
            <router-link  to="/sendQuestion" >
                <div class="sendPost sendq">
                    <img src='../assets/imgs/toq.png'>
                </div>
            </router-link>
            <router-link  to="/sendShare" >
                <div class="sendPost sends" >
                    <img src='../assets/imgs/tos.png'>
                </div>
            </router-link>
            <router-link  to="/" >
            <div class="close" >
                <img src='../assets/imgs/close2.png'>
            </div>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            content:"",
            isQ:false,
            isS:false
        }
    },
    methods: {
        sendQ (){
            this.isQ=true;
        },
        sendShare (){
            this.isS=true;
        },
        backto(){
            this.isQ=false;
            this.isS=false;
        }
    }
}
</script>

<style scoped>
#sendpage{
    height: 100vh;
    overflow: hidden;
    background-image: url(../assets/imgs/bg.png);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center bottom;
}

.btn{
    position: absolute;
    bottom: 3vh;
}

.sendPost,.close{
    width: 100vw;
}

.sendPost img{
    width: 69vw;
    margin: 0 auto;
    display: block;
}

.close img {
    width: 13vw;
    margin: 0 auto;
    display: block;
}

.banner{
    width: 100vw;
    margin-top: 6vh;
}

.banner img {
    width: 94%;
    margin: 0 auto;
    display: block;
}

.sendq{
    margin-bottom: 3vh;
}

.sends{
    margin-bottom: 5vh;
}

</style>

