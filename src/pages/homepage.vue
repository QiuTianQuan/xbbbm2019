<template>
    <div class="homepage">
        <div class="top">
          <router-link to="/search">
          <div>
            <div id="searchBox" >
            </div>
            <div class="searchp">
              <img src='../assets/imgs/search.png'>
              <p>搜索</p>
            </div>
          </div>
          </router-link>
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
        <Mynav />
    </div>
</template>

<script>
import newq from '@/components/newq'
import hotq from '@/components/Hotq'
import xbShare from '@/components/xbShare'
import Mynav from '@/components/mynav'
export default {
    components: {newq,hotq,xbShare,Mynav},
    data() {
        return { 
        type:"",
        college:"",
        words:"",
        currentTab: 'newq',
        tabs: [{value:'newq',text:"最新问题"},
                {value:'hotq',text:"最热问题"}, 
                {value:'xbShare',text:"学霸笔记"}]
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

#searchBox{
  width: 93vw;
    border: none;
    margin: 0 auto;
    margin-top: 2.5vh;
    display: block;
    height: 4.9vh;
    border-radius: 5px;
    background-color: #f2f2f2;
    
}
.searchp{
  position: absolute;
  width: 100%;
  top: 3.5vh;
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
    margin-top: 13vh;
}
.top{
  position: fixed;
  top: 0;
  background: white;
  height: 14vh;
  width: 100vw;
  z-index: 99;
}
</style>