<template>
    <div class="list">
         <div class="article_list">
            <ul class="datalists">
                <li v-for="(i,index) in list" class="datalist">
                    <div class="listcontent">
                    <div class="listhead">
                        <div class="avatar">
                            <img class="myhead" :src='i.headimgurl'>
                        </div>
                        <div class="info">
                        <div>
                        <div class="info_name">{{i.nickname}}</div>
                        <div class="info_time">{{i.time | getTime}}</div>
                        </div>
                        <div class="info_college">{{i.college}}</div>
                        </div>
                        </div>
                <div class="questionMiddle">
                    <router-link :to="'/thread/' + i.cid">
                        <div class="title" v-if="i.title!=null">{{ i.title }}</div>
                        <div class="content">{{ i.introduction }}</div>
                    </router-link>
                    <ul v-if="i.photonum!=0" class="photolist">
                        <li v-for="(p) in i.photos" :class="i.photos.length>1 ? 'photos' : 'photo'">
                            <img :src="p.photocut" :large='p.photo' :preview="index">
                        </li>
                    </ul>
                </div>
                <div class="bottom">
                    <div class="commentsNum">{{i.answernum}}评论</div>
                    <div class="collect" ><img :src="i.collection==0 ? notcollect : collected" @click="tocollect($event,i.cid)">
                    </div>
                    <router-link :to="'/thread/' + i.cid">
                        <div class="comment"><img src="../assets/imgs/replay.png"></div>
                    </router-link>
                </div>
                <div  v-if="i.answernum!=0" class="commentpart">
                        <div class="avatar">
                            <img class="myhead" :src='i.answer.headimgurl'>
                        </div>
                    <div class="commenthead">
                         <div :class="i.scholar==1 ? 'xbname' : 'xzname' ">{{i.answer.nickname}}</div>
                         <div class="takeit">
                             <img :src="i.answer.adopt==0 ? nottake : taked" @click="totakeit($event,i.answer.answerid)">
                         </div>
                    </div>
                    <router-link :to="'/thread/' + i.cid">
                    <div class="comcontent">
                        <div class="contenttext">
                            <p>{{i.answer.content}}</p>
                            <p class="imgword" v-if="i.answer.photos.length!=0">[图片]</p>
                        </div>
                    </div>
                    </router-link>
                </div>
                 </div>
                </li>
            </ul>
            <div class="loadmore" @click="loadmore"  v-show="tomore" >{{tips}}</div>
        </div>
        <div class="notfind" v-if="nofind">
            <img src='../assets/imgs/nofind.png'>
            <div class="nofindwords">还没有相关结果~</div>
        </div>
    </div>
</template>

<script>
export default {
    props:['getUrl',"searchlist"],
    data() {
        return {    
        list: [],
        previewlist :[],
        imglist:[],
        collect:"",
        page:"1",
        REQUIRE: true,
        loading: false,
        tips:"加载更多",
        result:"",
        tomore:false,
        nofind:false,
        notcollect:require('../assets/imgs/collect.png'),
        collected:require('../assets/imgs/collected.png'),
        nottake:require('../assets/imgs/takeit.png'),
        taked:require('../assets/imgs/taked.png')
    }
  },
  created() {
    this.getData()
  },
  watch:{
      searchlist:{
        handler(newName, oldName) {
      　　this.list = this.searchlist
        if(list.length>=10){
            this.tomore = true ;
        }
    　　},
    　　immediate: true
      }
  },
  methods: {
    getData() {
      let page = this.page
      if(this.getUrl!="http://wx.yyeke.com/xbbbm/search"){
      this.axios.post(this.getUrl,"page="+page).then(res => {
                this.list= res.data.data.list;
                this.$previewRefresh()
                if(list.length>=10){
                    this.tomore = true ;
                }
                if(res.data.data.size=0){
                    this.nofind = true ;
                }
                console.log(res.data.data.list);
            }).catch(function (error) {
            console.log(error)
        })
      }
    },
    loadmore() {
        if (this.REQUIRE) {
        this.page = parseInt(this.page) +1;
        console.log(this.page)
        this.axios.post(this.getUrl,"page="+this.page).then(res => {
            this.REQUIRE = false;
            this.loading = true;
            this.list=this.list.concat(res.data.data.list) 
            this.$previewRefresh()
            if(res.data.data.isLastPage==true)
            {
                this.tomore = false;
            }
             this.$nextTick(() => {
            this.REQUIRE = true;
            this.loading = false;
            });
            }).catch(function (error) {
            this.tips = '连接失败，请稍后重试';
            this.REQUIRE = true;
            console.log(error)
        })
    }
   },
    tocollect(event,cid){
        if(event.target.src == this.notcollect){
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
  }
}
</script>
<style scoped>
.article_list {
  margin: 0 auto;
  width: 100vw;
  background-color: #f2f2f2;
  margin-bottom: 17vw;
}

.article_list ul {
  padding: 0;
  margin: 0;
}

/* .datalists{
    margin-bottom: 20vw;
} */

.list{
    background-color: #f2f2f2;
    overflow: hidden;
}

.datalist{
list-style-type: none;
  margin-bottom: 2vh;
  background-color: #fff;
}

.loadmore{
    text-align: center;
    color: #a3a3a3;
    margin-bottom: 0.5vh;
    font-size: 3.2vw;
}

.listcontent {
    width: 92vw;
    margin: 0 auto;
    overflow: hidden;
}

a {
    text-decoration: none;
}

.title {
    color: #222020;
    font-size: 4.5vw;
    margin-top: 1vh;
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
    margin-top: 2vh;
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

.comment_name,.contenttext{
    color: #444444;
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

.commentpart{
    border-top: solid 1px #d4d4d4;
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
    padding: 1vh 0 2vh;
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

.photos {
    width: 29vw;
    height: 29vw;
    margin-right: 1.6vw;
    position: relative;
    margin-top: 1vh;
    margin-bottom: 1vh;
}

.photos img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
}

.xzname{
    color: #444444;
    font-size: 3.5vw;
}

.xbname{
    color: #49adfe;
    font-size: 3.5vw;
}

.contenttext p{
    margin: 0;
    display: inline-block;
}

.imgword{
    color: #a3a3a3;
}
</style>
