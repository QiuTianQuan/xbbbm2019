<template>
    <div class="searchpage">
            <div class="searchpart" v-show="notresult">
              <form action="" @submit="search">
                <input ref="searchbox" type="text"  id="searchit"  @blur="tosearch = true,closeshow=true" >
              </form>
              <div class="searchp" v-if="tosearch" @click="onfocus">
                <img src='../assets/imgs/search.png'>
                <p>搜索</p>
              </div>
              <div class="type">
                <p>内容</p>
                <button class="chooseQ" v-bind:class="{choose:ischooseQ}" @click="chooseQ">问题</button>
                <button class="chooseS" v-bind:class="{choose:ischooseS}" @click="chooseS">笔记</button>
              </div>
              <college v-on:getcollege="whichcollege"/>
              <router-link  to="/" >
                <div class="close" v-show="closeshow">
                <img src='../assets/imgs/close.png'>
                </div>
              </router-link>
            </div>
            <div class="resultpart" v-show="yesresult">
              <div class="typeresult">
                <div class="kind">{{type}} </div>
                <div class="whichcollege">{{college}} </div>
              </div>
                <getlist :searchlist="searchlist" getUrl="http://wx.yyeke.com/2720/xbbbm/search"  />
                <div  class="bottomback">
                  <img @click="backto" src='../assets/imgs/closeit.png' >
                </div>
            </div>
            <div class="noresult" v-show="noresult">
                <div class="notfind">
                    <img src='../assets/imgs/nofind.png'>
                    <div class="nofindwords">还没有相关结果~</div>
                </div>
                <router-link  to="/post" >
                  <div class="tosendQ">立即提问</div>
                </router-link>
                <div class="close" @click="(noresult=false,notresult=true)">
                    <img src='../assets/imgs/close.png'>
                </div>
            </div>
        </div>
</template>

<script>
import college from '@/components/college'
export default {
    components: {college},
    data(){
        return{
            type:"",
            college:"",
            words:"",
            searchlist:[],
            ischooseQ:false, 
            ischooseS:false,
            isSearch:false,   
            tosearch:true,
            notresult:true,
            result:"",
            yesresult:false,
            noresult:false,
            closeshow:true
        }
    },
    methods: {
    chooseQ(){
       this.ischooseQ = true;
       this.ischooseS = false;
       this.type = "问题"
    },
    chooseS(){
      this.ischooseS = true;
      this.ischooseQ = false;
      this.type = "笔记"
    },
    whichcollege(data){
      this.college = data;
    },
    onfocus(){
      this.tosearch = false
      this.$refs.searchbox.focus()
      this.closeshow = false;
    },
    backto(){
      this.yesresult=false;
      this.noresult=false;
      this.notresult = true;
    },
    search(){
      this.words = this.$refs.searchbox.value;
      if(this.type==""){
           alert("至少要选择内容哦~")
      }else{
      this.axios.post("http://wx.yyeke.com/2720/xbbbm/search","page=1&words="+this.words+"&sort="+this.type+"&college="+this.college).then(res => {
        if(res.data.data.size==0){
            this.noresult=true;
            this.notresult = false;
        }
        else{
            this.searchlist= res.data.data.list;
            this.yesresult=true;
            this.notresult = false;
        }
        }).catch(function (error) {
            console.log(error)
        })
      }
      
    }
  }
}
</script>


<style scoped>

#searchit{
  width: 93vw;
    border: none;
    margin: 0 auto;
    margin-top: 2.5vh;
    display: block;
    height: 4.5vh;
    border-radius: 5px;
    background-color: #f2f2f2;
    
}

a {
  text-decoration: none;
}
.searchp{
  position: absolute;
  width: 100%;
  top: 3.4vh;
  display: flex;
  align-items: end;
  width: 100%;
  justify-content: center;
}

.searchp p{
  margin: 0;
  color: #c8c8c8;
  font-size: 4vw;
  margin-left: 1vw;
}

.searchp img {
  width: 4.5vw;
  display: block;
}

.type{
  width: 92vw;
  margin: 0 auto;
  padding: 5vw 0;
}
.chooseS{
  margin-left: 2vw;
}

.choose{
  color: white;
  background-color: #49adfe;
}

.close {
  position: fixed;
  bottom: 6vw;
  width: 12vw;
  margin-left: 50vw;
  transform: translate(-6vw, 0);
}

.close img {
  width: 100%;
}

.resultpart{
  height: 100vh;
  background-color: #f2f2f2;
}

.kind,.whichcollege {
    border: none;
    height: 9vw;
    width: 16vw;
    border-radius: 5px;
    text-align: center;
    line-height: 9vw;
    margin-top: 2vh;
    outline: none;
    font-size: 4vw;
    color: white;
    background-color: #49adfe;
    display: inline-block;
}

.kind {
  margin-left: 3vw;
  margin-bottom: 3.5vw;
}

.list {
  border-top:1px solid #c8c8c8;
}

.article_list ul {
  margin: 0;
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

.typeresult{
  background-color: #fff;
}

.tosendQ{
    width: 92vw;
    margin: 0 auto;
    display: block;
    height: 12vw;
    border-radius: 3px;
    text-align: center;
    line-height: 12vw;
    background-color: #49adfe;
    color: white;
    -webkit-tap-highlight-color: rgba(255,0,0,0);
    font-size: 4vw;
    border: none;
    margin-top: 20vh;
}

.notfind{
    margin-top: 20vh;
    text-align: center;
}

.notfind img{
    width: 40vw;
}

.nofindwords {
    margin-top: 1.5vh;
    color: #b6b6b6;
}
</style>

