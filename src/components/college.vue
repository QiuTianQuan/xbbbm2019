<template>
    <div id= "colleges">
        <p class="collegeName">学院</p>
        <div class="allcolleges">
            <button
            class="oneCollege"
                v-for="(college,index) in colleges"
                v-bind:key="index"
                v-on:click="chooseit($event)"
            >{{college}}</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return{
            college_tag:"",
            colleges: ['通信','计算机','自动化','先进','光电','软件','生物','理学院','经管','传媒','外国语','国际','安法','体育','']
        }
    },
    mounted(){
        let choseCollege = document.querySelectorAll('.oneCollege')
        choseCollege[14].style.opacity = 0;
    },
     methods: {
         sendcollege(){
                this.$emit("getcollege",this.college_tag)
        },
         chooseit : function(event){
             let choseCollege = document.querySelectorAll('.oneCollege')
            for (let i = 0; i < choseCollege.length; i++) {
            choseCollege[i].style.backgroundColor = "#f9f9f9";
            choseCollege[i].style.color = '#444444';
        }
            event.target.style.backgroundColor = "#49adfe";
            event.target.style.color = 'white';
            this.college_tag = event.target.innerHTML;
            this.sendcollege();
           
         }
  },
}
</script>

<style>
#colleges{
     width: 94vw;
     margin: 0 auto;
}

#colleges p,.type p{
    margin: 0;
    color: #7d7d7d;
    font-size: 4vw;
}
 .allcolleges {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    
}   

.oneCollege,.chooseQ,.chooseS{
    border: none;
    background-color: #f9f9f9;
    height: 9vw;
    width: 16vw;
    border-radius: 5px;
    text-align: center;
    color: #444444;
    line-height: 9vw;
    margin-top: 2vh;
    outline: none;
    font-size: 4vw;
    
}
</style>


