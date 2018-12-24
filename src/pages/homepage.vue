<template>
    <div class="homepage">
        <div class="top">
          <div @click="searchpage">
            <div id="searchBox" >
            </div>
            <div class="searchp">
              <img src='../assets/imgs/search.png'>
              <p>搜索</p>
            </div>
          </div>
          <div class="choosebtns">
            <div
                v-for="tab in tabs"
                v-bind:key="tab.value"
                v-bind:class="['tab-button', { active: currentTab === tab.value }]"
                v-on:click="currentTab = tab.value"
            >{{ tab.text }}</div>
          </div>
        </div>
        <component
            v-bind:is="currentTabComponent"
            class="tab"
        ></component>
        <div class="searchpage" v-if="isSearch">
            <form action="" @submit="search">
              <input ref="searchbox" type="search" name="searchBox" id="searchBox"  >
            </form>
            <div class="searchp" v-if="tosearch" @click="onfocus">
              <img src='../assets/imgs/search.png'>
              <p>搜索</p>
            </div>
            <div class="searchpart" v-show="notresult">
              <div class="type">
                <p>内容</p>
                <button class="chooseQ" v-bind:class="{choose:ischooseQ}" @click="chooseQ">问题</button>
                <button class="chooseS" v-bind:class="{choose:ischooseS}" @click="chooseS">笔记</button>
              </div>
              <college v-on:getcollege="whichcollege"/>
            </div>
            <div class="resultpart" v-show="result">
                <div class="kind">{{type}} </div>
                <div class="whichcollege">{{college}} </div>
                <getlist getUrl = "http://wx.yyeke.com/xbbbm/search" :Type="type" :College="college" :Words="words"  />
            </div>
            <div class="close" @click="byesearch">
              <img src='../assets/imgs/close.png'>
            </div>
        </div>
        <Mynav v-if="hinav"/>
    </div>
</template>

<script>
import newq from '@/components/newq'
import hotq from '@/components/Hotq'
import xbShare from '@/components/xbShare'
import college from '@/components/college'
import Mynav from '@/components/mynav'
export default {
    components: {newq,hotq,xbShare,college,Mynav},
    data() {
        return { 
        type:"",
        college:"",
        words:"",
        hinav:true,
        ischooseQ:false, 
        ischooseS:false,
        isSearch:false,   
        tosearch:true,
        notresult:true,
        result:false,
        currentTab: 'newq',
        tabs: [{value:'newq',text:"最新问题"},
                {value:'hotq',text:"最热问题"}, 
                {value:'xbShare',text:"学霸笔记"}]
    }
  },
  created() {
  },
  methods: {
    searchpage(){
      this.isSearch=true;
      this.hinav = false;
      this.tosearch = true
    },
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
    byesearch(){
      this.isSearch=false
      this.hinav=true
    },
    whichcollege(data){
      this.college = data;
    },
    onfocus(){
      this.tosearch = false
      this.$refs.searchbox.focus()
    },
    search(){
      console.log(111)
      this.words = this.$refs.searchbox.value;
      this.result=true;
    }
  },
  computed: {
    currentTabComponent: function () {
      return  this.currentTab
    }
  }
}
</script>
<style scoped>
.homepage{
  height: 100vh;
  background-color: #f2f2f2;
}
.searchpage{
   position: absolute;
    top: 0;
    height: 100vh;
    width: 100vw;
    background-color: #fff;
    z-index: 999;
}
#searchBox{
  width: 93vw;
    border: none;
    margin: 0 auto;
    margin-top: 2.5vh;
    display: block;
    height: 4.5vh;
    border-radius: 5px;
    background-color: #f2f2f2;
    
}
.searchp{
  position: absolute;
  width: 100%;
  top: 3.2vh;
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

.tab-button {
    margin-top: 1vh;
    padding: 6px 10px;
    cursor: pointer;
    background: white;
    padding-bottom: 1.5vh;
    width: 22vw;
    font-size: 4vw;
    border: none;
    outline: none;
    text-align: center;
    color: #a3a3a3;
}
.choosebtns{
  border-bottom: 1px solid #d4d4d4;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  padding: 0 3vw;
}
.tab-button.active {
  color: #49adfe;
  border-bottom: 1.5px solid #49adfe;
}

.tab{
    margin-top: 11vh;
}
.top{
  position: fixed;
  top: 0;
  background: white;
  height: 14vh;
  width: 100vw;
  z-index: 99;
}
.type{
  width: 94vw;
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


</style>