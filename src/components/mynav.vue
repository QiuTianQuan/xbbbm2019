<template>
    <div>
        <div class="nav">
            <div class="list" >
                <router-link class="homepage" to="/">
                    <img   :src="nothomepage">
                </router-link>
                <router-link class="post" to="/post" ></router-link>
                <router-link class="myinfo" to="/myinfo">
                    <img :src="notmyinfo">
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            onhomepage:require('../assets/imgs/onhomepage.png'),
            onmyinfo:require('../assets/imgs/onmyinfo.png'),
            nothomepage:require('../assets/imgs/homepage.png'),
            notmyinfo:require('../assets/imgs/myinfo.png')
        }
    },
    created() {
        if(this.$route.path=="/"){
            this.nothomepage = this.onhomepage
        }
        if(this.$route.path=="/myinfo"){
            this.notmyinfo = this.onmyinfo
        }
        
  },
    methods: {
  }
}
</script>

<style scoped>
.nav {
    width: 100%;
    position: fixed;
    height: 16vw;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url(../assets/imgs/navbg.png);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center top;
}

.list {
    width: 60%;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    margin-top: 1.5vw;
    text-align: center;
}

.nav-item {
    text-decoration: none;
    margin: 0;
    font-size: 3vw;
    margin-top: -1vw;
}


.homepage,.myinfo{
    background-size: contain;
    background-repeat: no-repeat;
    width: 8.5vw;
    margin-top: 2.5vw;
}

.homepage img,.myinfo img{
    width: 100%;
}

.post{
    background-size: contain;
    background-repeat: no-repeat;
    width: 12vw;
    height: 14vw;
    background-image: url(../assets/imgs/sendpost.png)
}


</style>
