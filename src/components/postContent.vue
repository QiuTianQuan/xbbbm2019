<template>
    <div class="sendpage">
        <input v-if="istitle" type="text" id="title" name="title" placeholder="请输入18字以内标题"  v-model="title" @focus="bottomshow=false" @blur="bottomshow=true">
        <textarea type="text" id="content" name="content" :placeholder="'请输入发表内容（少于'+contentL+'字）'" v-model="content"  @focus="bottomshow=false" @blur="bottomshow=true"></textarea>
        <input @change="fileChange($event)" type="file" id="upload_file" multiple style="display: none"/>
        <div class="middle">
                <ul class="img-list">
                    <li class="imglist" v-for="(url,index) in imgList">
                        <img class="del" src="../assets/imgs/del.png" @click.stop="delImg(index)"/> 
                        <img class="upimg" :src="url.file.src">
                    </li>
                    <div class="add" v-show="imgList.length<9" @click="chooseType">
                        <div class="add-image" align="center">
                        <i class="icon-camera"></i> 
                        <img >
                        </div>
                    </div>
                </ul>
            
            <college v-on:getcollege="whichcollege" v-if="iscollege"/>
        </div>
        <div class="bottom" v-show="bottomshow">
            <div>
            <button class="sendPost" @click="sendPost">发布{{type}}</button>
            </div>
            <div class="close" @click="backto">
                <img src='../assets/imgs/close.png'>
            </div>
        </div>
        <div class="posting" v-if="posting">
            正在上传...
        </div>
    </div>
</template>

<script>
import college from '@/components/college'
export default {
    components: {college},
    inject:['reload'],
    props : ["ownurl","contentL","pathto","istitle","type","id","iscollege"],
    data() {
        return {
            content:"",
            title:"",
            showFace: false,
            bottomshow:true,
            posting:false,
            imgList: [],
            size: 0,
            college:"",
            filelists:[],
            limit:9, //限制图片上传的数量
            tempImgs:[],
        }
    },
     created() {
  },
    methods: {
        sendPost:function() {
            event.preventDefault();
            this.posting= true;
            let formData = new FormData();
            let content = this.content;
            let title = this.title;
            let college = this.college;
            this.filelists.forEach((item) =>{
                    formData.append('file',item);
                });
            let config = {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
            if(content==""){
                    alert("内容不能为空")
            }else{
                if(this.istitle == true)
                {
                    if(title==""||title.length>18){
                    alert("标题字数不正确")
                    }else{
                        //学霸笔记
                        formData.append("introduction",content)
                        formData.append('title', title);    
                        formData.append("college",college) 
                        this.axios.put(this.ownurl,formData,config).then(res =>{
                            if(res.data.status==200)
                            {
                                this.$router.go(this.pathto)
                            }else{
                                alert(res.data.msg)
                            }
                        }).catch(function (error) {
                        console.log(error)
                        })                    
                    }
                }else{
                    console.log(this.id)
                    if(this.id != undefined){
                        //回复
                        formData.append("content",content)
                        console.log(this.id)
                        formData.append('cid',this.id);
                        this.axios.post(this.ownurl,formData,config).then(res =>{
                            if(res.data.status==200)
                            {
                                this.$router.go(this.pathto)
                            }else{
                                alert(res.data.msg)
                            }
                        }).catch(function (error) {
                        console.log(error)
                        })     
                    }else{
                        //提问
                        formData.append("introduction",content)
                        formData.append("college",college)
                        this.axios.post(this.ownurl,formData,config).then(res =>{
                            if(res.data.status==200)
                            {
                                this.$router.go(this.pathto)
                            }else{
                                alert(res.data.msg)
                            }
                        }).catch(function (error) {
                        console.log(error)
                        })                    
                    }
                 }
            }
        },
        whichcollege(data){
            this.college = data;
        },
        backto(){
             this.$router.go(-1);
        },
        chooseType() {
                document.getElementById('upload_file').click();
            },
        fileChange(el) {
            if (!el.target.files[0].size) return;
            this.fileList(el.target);
            el.target.value = ''
            
        },
        fileList(fileList) {
            let files = fileList.files;
            for (let i = 0; i < files.length; i++) {
                //判断是否为文件夹
                if (files[i].type != '') {
                    this.fileAdd(files[i]);
                    this.file = fileList.files;
                } else {
                    //文件夹处理
                    this.folders(fileList.items[i]);
                }
            }
        },
        //文件夹处理
        folders(files) {
            let _this = this;
            //判断是否为原生file
            if (files.kind) {
                files = files.webkitGetAsEntry();
            }
            files.createReader().readEntries(function (file) {
                for (let i = 0; i < file.length; i++) {
                    if (file[i].isFile) {
                        _this.foldersAdd(file[i]);
                    } else {
                        _this.folders(file[i]);
                    }
                }
            });

        },
        foldersAdd(entry) {
            let _this = this;
            entry.file(function (file) {
                _this.fileAdd(file)
            })
        },
        fileAdd(file) {
            if (this.limit !== undefined) this.limit--;
            if (this.limit !== undefined && this.limit < 0) return;
            //总大小
            this.size = this.size + file.size;
            //判断是否为图片文件
            if (file.type.indexOf('image') == -1) {
                this.$dialog.toast({mes: '请选择图片文件'});
            } else {
                let reader = new FileReader();
                let image = new Image();
                let _this = this;
                reader.readAsDataURL(file);
                reader.onload = function () {
                    file.src = this.result;
                    image.onload = function(){
                        let width = image.width;
                        let height = image.height;
                        file.width = width;
                        file.height = height;
                        _this.imgList.push({
                            file
                        });
                    };
                    image.src= file.src;
                }
                _this.filelists.push(file);
            console.log(this.filelists)
            }
        },
        delImg(index) {
            this.size = this.size - this.imgList[index].file.size;//总大小
            this.imgList.splice(index, 1);
            this.filelists.splice(index, 1);
            if (this.limit !== undefined) this.limit = 6-this.imgList.length;
        },
        displayImg() {

        }
    }
}
</script>

<style scoped>

.sendpage{
    width: 100vw;
}
#title,#content{
    border: none;
    border-radius: 5px;
    width: 92vw;
    font-size: 4vw;
    outline: none;
    color: #b6b6b6;
    padding: 0;
    margin: 0 auto;
    display: block;
    background-color: #f3f3f3;
}

#title {
    height: 10vw;
    margin-top: 4vw;
}

#content {
    height: 30vw;
    margin-top: 4vw;
}

.sendPost{
    width: 92vw;
    margin: 0 auto;
    display: block;
    height: 12vw;
    border-radius: 3px;
    text-align: center;
    line-height: 11vw;
    background-color: #49adfe;
    color: white;
    -webkit-tap-highlight-color: rgba(255,0,0,0);
    font-size: 4vw;
    border: none;
}

.app-bg >>>img{
        width: 100%;
        height: 100%;
        -webkit-transform: scale(1.03);
        -moz-transform: scale(1.03);
        -ms-transform: scale(1.03);
        -o-transform: scale(1.03);
        transform: scale(1.03);
    }
    textarea {
        padding: 10px;
    }

    .text-length {
        font-size: 14px;
        z-index: 999;
        width: 100%;
        text-align: right;
        margin-bottom: 10px;
        color: #e4e4e4;
    }

    .warning {
        color: #fe9900;
    }

    .middle {
        height: 50vh;
        overflow-y: scroll;
        overflow-x: hidden;
        width: 92vw;
        margin: 0 auto;
        margin-top: 3vw;
    }
    .add-img {
        width: 100%;
    }

    .tosendQ{
    width: 92vw;
    margin: 0 auto;
    display: block;
    height: 12vw;
    border-radius: 3px;
    text-align: center;
    line-height: 11vw;
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

    .add {
        display: inline-block;
    }

    .add-image {
        width: 29vw;
        height: 29vw;
        background-size:  contain;
        background-position: center;
       background-image: url(../assets/imgs/addimg.png);
       margin: 2vw 0;
    }


    .good-item .choose {
        color: #fff;
        background-color: #87582E;
        color: #FFF;
        border: 0;
    }

    .mui-btn-block {
        border: 0;
        border-radius: 0;
        background-color: #87582E;
        color: #fff;
        margin-bottom: 0;
        bottom: 0;
    }

    .mui-buttom {
        position: fixed;
        width: 100%;
        bottom: 0;
        z-index: 999;

    }

    /*九宫格*/
    .img-list {
        overflow: hidden;
        list-style: none;
        padding: 0;
        display: flex;
        flex-wrap: wrap;
        margin: 0;
        margin-bottom: 3vw;
    }

    .imglist{
        width: 29vw;
        height: 29vw;
        margin-top: 2vw;
        margin-right: 1.6vw;
        position: relative;
    }


    .upimg {
        width: 100%;
        height: 100%;
        text-align: center;;
        position: relative;
        border-radius: 5px;
    }

    .img-list > li > div {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .img-list > li > div .app-bg {
        width: 100%;
        height: 100%;
    }

    .mui-fullscreen {
        z-index: 9999;
    }

    .del {
        position: absolute;
        width: 18px;
        top: 1vw;
        right: 1vw;
        z-index: 999
    }

    .close{
        width: 12vw;
        margin: 0 auto;
        margin-top: 8vw;
    }

    .close img {
        width: 100%;
    }

    .bottom{
        position: absolute;
        width: 92vw;
        bottom: 6vw;
        margin-left: 4vw;
    }

    .posting{
        width: 30vw;
        height: 30vw;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -15vw;
        margin-left: -15vw;
        opacity: 0.9;
        line-height: 30vw;
        text-align: center;
        background-color: #f2f2f2;
        font-size: 5vw;
        color: #222020;
    }

    .posting p{
        font-size: 5vw;
        color: #a3a3a3;
    }
</style>