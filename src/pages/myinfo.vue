<template>
    <div class="infopage">
        <div class="top">
            <div class="myinfo">
                <div class="my_pageTop">
                    <div class="topbox">
                        <div class="myatavar">
                            <img class="myhead myHead" :src='info.headimgurl'>
                        </div>
                        <div class="myId">
                            <div class="username">{{info.nickname}}</div>
                            <div :class="info.scholar==1 ? 'xbname' : 'xzname'">学霸</div>
                        </div>
                    </div>
                </div>
                </div> 
            <div id="dynamic-component-demo" class="demo">
                <div class="choosebtns">
                <div
                    v-for="tab in tabs"
                    v-bind:key="tab.value"
                    v-bind:class="['tab-button', { active: currentTab === tab.value }]"
                    v-on:click="currentTab = tab.value"
                >{{ tab.text }}</div>
                </div>
        </div>
        </div>
            <component
                v-bind:is="currentTabComponent"
                class="tab"
            ></component>          
        
        <Mynav/>
    </div>
</template>

<script>
import myq from '@/components/myq'
import myanswer from '@/components/myanswer'
import myshare from '@/components/myshare'
import Mynav from '@/components/mynav'
import mycollect from '@/components/mycollect'
export default {
    components: {myq,myanswer,myshare,Mynav,mycollect},
    data() {
        return {    
        thread_list: [],
        comments_list: [],
        info: [],
        isname:false,
        currentTab: 'myq',
        tabs: [{value:'myq',text:"我的问题"},
                {value:'myanswer',text:"我的回答"}, 
                {value:'myshare',text:"我的分享"},
                {value:'mycollect',text:"我的收藏"}]
    }
  },
  created() {
    this.getData()
  },
   computed: {
    currentTabComponent: function () {
      return  this.currentTab
    }
  },
  methods: {
    getData() {
      this.axios.get("http://wx.yyeke.com/xbbbm/user", {
  }).then(res => {
        if(res.status=200)
        {
            this.info = res.data.data;
         }   
        }).catch(function (error) {
        console.log(error)
        })
    }
    }
}
</script>
<style scoped>
.infopage{
  height: 100vh;
  background-color: #f2f2f2;
}
.my_pageTop {
    width: 100vw;
}
.topbox {
    height: 14.4vh;
    background-color: #f8f8f8;
    display: flex;
    align-items: center;
}

.me {
    width: 91.6%;
    height: 14vh;
    margin: 0 auto;
    border-radius: 10px;
    border: solid 1px #ebebeb;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background-color: white;
}

.myatavar {
    width: 16.5vw;
    height: 16.5vw;
    border-radius: 50px;
    background-color: #ebebeb;
    overflow: hidden;
    margin-left: 5vw;
}

.myId {
    margin-left: 3vw;
}

.contentop {
    margin: 3vh 3vw 0 3vw;
    height: 6vh;
    border: solid 1px #ebebeb;
    border-bottom: none;
    border-radius: 10px 10px 0 0;
    overflow: hidden;
}
.tab-button {
    margin-top: 0.5vh;
    padding: 6px 10px;
    cursor: pointer;
    background: white;
    width: 20vw;
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
    margin-top: 19.5vh;
}
.top{
  position: fixed;
  top: 0;
  background: white;
  height: 14vh;
  width: 100vw;
  z-index: 99;
}

.username{
    font-size: 4vw;
    color: #333333;
}


.xzname{
    color: #444444;
    font-size: 3.2vw;
}

.xbname{
    color: #49adfe;
    font-size: 3.2vw;
}

</style>

