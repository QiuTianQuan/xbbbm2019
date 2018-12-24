<template>
    <div>
        <div class="article_list">
                <div class="Qcontent">
                    <div class="qcontent">
                        <div class="listhead">
                            <div class="avatar">
                                <img class="myhead" :src='data.headimgurl'>
                            </div>
                            <div class="info">
                            <div>
                            <div class="info_name">{{data.nickname}}</div>
                            <div class="info_time">{{data.time | getTime}}</div>
                            </div>
                            <div class="info_college">{{data.college}}</div>
                            </div>
                        </div>
                        <div class="questionMiddle">
                            <div class="content">{{ data.introduction }}</div>
                            <ul v-if="data.photonum!=0" class="photolist">
                                <li v-for="p in data.photos" :class="data.photos.length>1 ? 'qphotos' : 'photo'">
                                    <img :src="p.photocut">
                                </li>
                            </ul>
                        </div>
                        <div class="bottom">
                            <div class="commentsNum">{{data.answernum}}评论</div>
                            <div class="collect" ><img :src="data.collection==0 ? collect : collected" @click="tocollect($event,data.cid)">
                            </div>
                         <router-link :to="'/sendComment/' + id">
                            <div class="comment" ><img src="../assets/imgs/replay.png"></div>
                        </router-link>
                        </div>
                    </div>
                </div>
                <ul class="datalists">
                <li  v-for="(i,index) in list" :class="index == 0 ? 'fristComment' : 'commentlist' " >
                <div class="commentpart" >
                        <div class="avatar">
                            <img class="myhead" :src='i.headimgurl'>
                        </div>
                    <div class="commenthead">
                         <div :class="i.scholar==1 ? 'xbname' : 'xzname' ">{{i.nickname}}</div>
                         <div class="takeit">
                             <img :src="i.adopt==0 ? nottake : taked" @click="totakeit($event,i.answerid)">
                         </div>
                    </div>
                    <div class="commentcon">
                        <div >
                            <div class="contenttext">{{ i.content }}</div>
                            <ul v-if="i.photonum!=0" class="photolist">
                                <li v-for="p in i.photos" :class="i.photos.length>1 ? 'aphotos' : 'photo'">
                                    <img :src="p.photocut">
                                </li>
                            </ul>
                        </div>
                        <div :class="i.likes==0 ? 'like' : 'liked'" class="likeit">
                            <div>
                            <img :src="i.likes==0 ? like : liked" @click="likeit($event,i.answerid,index)">
                            </div>
                            <p>{{ i.likenum }}</p>
                        </div>
                    </div>
                </div>
                </li>
            </ul>
        </div>
        <div  class="bottomback">
            <img @click="backto" src='../assets/imgs/closeit.png' >
        </div>
        
    </div>
</template>
<script>
export default {
    inject:['reload'],
    data() {
        return {    
        id: this.$route.params.id,
        list: [],
        content:"",
        istitle :false,
        isclick:false,
        data:"",
        collect:require('../assets/imgs/collect.png'),
        collected:require('../assets/imgs/collected.png'),
        nottake:require('../assets/imgs/takeit.png'),
        taked:require('../assets/imgs/taked.png'),
        like:require('../assets/imgs/like.png'),
        liked:require('../assets/imgs/likedit.png')
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
        let id = this.id
      this.axios.post("http://wx.yyeke.com/xbbbm/get","cid="+id).then(res => {
          
                this.data = res.data.data;
                this.list= res.data.data.answer;
            }).catch(function (error) {
            console.log(error)
        })
    },
    backto(){
         this.$router.go(-1);
    },
        tocollect(event,cid){
        if(event.target.src == this.collect){
            event.target.src = this.collected ;
            this.axios.post("http://wx.yyeke.com/xbbbm/collection","cid="+cid).then(res => {
            }).catch(function (error) {
            console.log(error)
            })
        }
    },
    totakeit(event,aid){
        if(event.target.src == this.nottake){
            event.target.src = this.taked ;
            this.axios.post("http://wx.yyeke.com/xbbbm/adopt","answerid="+aid).then(res => {
            }).catch(function (error) {
            console.log(error)
            })
        }else{
           event.target.src = this.nottake ;
            this.axios.post("http://wx.yyeke.com/xbbbm/adoptout","answerid="+aid).then(res => {
            }).catch(function (error) {
            console.log(error)
            })
        }

    },
    likeit(event,aid,index){
        if(event.target.src == this.like){
            event.target.src = this.liked ;
            event.target.parentNode.nextElementSibling.style.color =  "#49adfe"
            this.list[index].likenum += 1;
            this.axios.post("http://wx.yyeke.com/xbbbm/praise","answerid="+aid).then(res => {
            }).catch(function (error) {
            console.log(error)
            })
        }else{
           event.target.src = this.like ;
            this.list[index].likenum -= 1;
            event.target.parentNode.nextElementSibling.style.color =  "#9d9d9d"
            this.axios.post("http://wx.yyeke.com/xbbbm/praiseout","answerid="+aid).then(res => {
            }).catch(function (error) {
            console.log(error)
            })
        }

    }
  }
}
</script>
<style  scoped>

#content{
    height: 50vw;
    margin-top: 5vw;
    border: solid 1px #ebebeb;
    border-radius: 10px;
    width: 80vw;
    font-size: 4vw;
    outline: none;
    color: #b8b8b8;
    padding: 0 3vw;
    margin: 0 auto;
    display: block;
}



.addComments{
    margin-left: 30vw;
}

.commentSendPage{
    position: absolute;
    top: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgb(231, 211, 211);
}

.sendit {
    padding-top: 20vw;
}

.commentcon {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 1vh;
}

.bottomback{
    width: 100%;
    position: fixed;
    height: 16vw;
    bottom: 0;
    justify-content: center;
    align-items: center;
    background-image: url(../assets/imgs/navbg.png);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center top;
}

.bottomback img {
    width: 12vw;
    margin: 0 auto;
    display: block;
    margin-top: 1vh;
}
.title{
    border: solid 1px #7e5b5b;
    margin-top: 13vw;
    font-size: 5vw;
    text-align: center;
    background-color: floralwhite;
}

.topback{
    position: fixed;
    margin-left: 3vw;
    top: 5vw;
}

.topback img {
     width: 5vw;
}

.article_list {
  margin: 0 auto;
  width: 100vw;
  background-color: #fff;
  margin-bottom: 18vw;
}

.datalist{
list-style-type: none;
  margin-bottom: 2vh;
  background-color: #fff;
}

.article_list ul {
  padding: 0;
  margin: 0;
}

.commentlist{
  list-style-type: none;
  background-color: #fff;
  width: 94vw;
  margin: 0 auto;
  border-top: solid 1px #d4d4d4;
}

.fristComment{
  list-style-type: none;
  background-color: #fff;
  width: 94vw;
  margin: 0 auto;
  border:none;
}

.qcontent {
    width: 92vw;
    margin: 0 auto;
    overflow: hidden;

}

.Qcontent{
    border-bottom: solid 1px #d4d4d4;
}

a {
    text-decoration: none;
}

.title {
    padding: 2vh 0;
    color: #5a5858;
}

.author,.creattime{
    font-size: 2vw;
    color: #ada8a8;
    display: inline-block;
}

.commentsNum {
    font-size: 3.5vw;
    color: #ada8a8;
    margin-top: 2vw;
}

.avatar {
    height: 100%;
    border-radius: 25px;
    background-color: #ebebeb;
    display: inline-block;
    float: left;
    overflow: hidden;
    margin-right: 2vw;
}
.listhead {
    height: 10.6vw;
    margin: 0 auto;
    margin-top: 2vh
}

.listhead > .avatar {
    width: 10.6vw;
}

.commentpart > .avatar{
    width: 8vw;
    height: 8vw;
}

.collect{
    margin-left: 65vw;
}

.collect img,.comment img {
    width: 6vw;
}

.comment img {
    margin-top: 0.5vw;
}

.info {
    display: flex;
    justify-content: space-between;
}

.info p,
.college p {
    font-size: 3.2vw;
}

.info_name{
    color: #444444;
    font-size: 3.8vw;
}

.contenttext{
    color: #444444;
    font-size: 3.5vw;
}

.xzname{
    color: #444444;
    font-size: 3.5vw;
}

.xbname{
    color: #49adfe;
    font-size: 3.5vw;
}

.info_time{
    color: #9d9d9d;
    font-size: 3vw;
    margin-top: 1vw;
}

.info_college {
    display: inline-block;
    float: right;
    color: #49adfe;
    height: 6vh;
    line-height: 6vh;
    font-size: 4vw;
}

.content {
    margin: 0 auto;
    padding: 1vh 0;
    color: #333333;
    font-size: 4.2vw;
}

.bottom {
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    padding-bottom: 1vh;
}

.commenthead{
    margin-top: 2vh;
    display: flex;
    justify-content: space-between;
    height: 8vw;
    line-height: 8vw;
}
.bottomboder{
    width: 100vw;
    height: 2vh;
    background-color: #f2f2f2;
    margin-left: -4vw;
}

.takeit img{
    width: 13vw;
}

.contenttext{
    padding: 1vh 0 1vh;
}

.commentImg img{
    width: 60%;
    border-radius: 6px;
}

.likeit{
    display: flex;
}

.likeit img {
    width: 4vw;
}

.like p {
    margin: 0;
    font-size: 3.7vw;
    margin-left: 1vw;
    color: #9d9d9d;
}

.liked p {
    margin: 0;
    font-size: 3.7vw;
    margin-left: 1vw;
    color: #49adfe;
}


.photo img{
    width: 100%;
    border-radius: 6px;
}

.myhead {
    width: 100%;
}

.photolist {
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    margin-bottom: 2vw;
}

.qphotos {
    width: 29vw;
    height: 29vw;
    margin-right: 1.6vw;
    position: relative;
    margin-bottom: 1vh;
}

.aphotos {
    width: 25vw;
    height: 25vw;
    margin-right: 1.6vw;
    position: relative;
    margin-top: 1vh;
}

.qphotos img,.aphotos img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
}

</style>
