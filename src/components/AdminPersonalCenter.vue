<template>
    <div class="personal-center-wrap">
        <div class="personal-title">My Blog</div>
        <div class="form-wrap">

            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item class="headImg" :model="mmm">
                <img v-if="mmm.data != ''" v-bind:src="mmm.data">
                <img v-if="mmm.data == ''" v-bind:src="qiniu_domain + form.head_name">
                <input id="uploadFile" type="file" name="file" v-on:change="pushImg($event)" accept="image/jpeg,image/png,image/gif" class="change-headImg"/>
                </el-form-item>
                <el-form-item label="名称~">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="个性签名~">
                    <el-input type="textarea" class="textarea-height" v-model="form.motto"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="saveMsg">保存修改</el-button>
                </el-form-item>
                <el-form-item>
                <div class="spinner" v-show='loadFlag'>
                    <div class="rect1"></div>
                    <div class="rect2"></div>
                    <div class="rect3"></div>
                    <div class="rect4"></div>
                    <div class="rect5"></div>
                </div>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default{
    data(){
        return{
            qiniu_domain: 'http://otbqvvdu3.bkt.clouddn.com/',
            loadFlag: false ,
            file: '',
            mmm: {
                name: 'AAAAA',
                data: '',
                patchUpload: '',
            },
            form: {
                name: '',
                motto: '',
                head_name: '',
            }
        }
    },
    mounted: function(){
        this.$http.post('/api/admin/selectUserMsg').then(
            respone => this.form = respone.body[0],
            respone => this.$message.error('服务器出错，请重新刷新页面')
        )
    },

    methods: {
        pushImg: function(e){
          let mm = this.mmm, reader = new FileReader();
          this.file = e.target;
          reader.readAsDataURL(this.file.files[0]);
          this.mmm.name = (this.file.files[0].name);
          if(parseInt(this.file.files[0].size) > parseInt("4194304")){
            this.mmm.patchUpload = 'true';
          }else{
            this.mmm.patchUpload = 'false';
          }
          reader.onload= function(){
            mm.data= this.result;
            //console.log(this.result.ArrayBuffer);
          }
        },
        saveMsg: function(){
                this.loadFlag = true;
                var obj = {};
                obj.images = this.mmm.data;
                obj.imagesName = this.mmm.name;
                obj.patchUpload = this.mmm.patchUpload;
                this.$http.post('/api/admin/savePerMsg', {
                msg: obj,
                form: this.form
            }).then(
                respone => {
                    if(Object.is(respone.body, "success")){
                        this.$message('保存成功')
                        this.loadFlag = false
                    }else{
                        this.$message.error('保存失败')
                        this.loadFlag = false
                    }
                },
                respone => {
                    console.log(respone.body)
                    this.$message.error('保存失败，请刷新页面重试')
                    this.loadFlag = false
                }
            )
        }
    }
}
</script>

<style>
.spinner {
  margin: 0px auto;
  width: 50px;
  height: 60px;
  text-align: center;
  font-size: 10px;
}
 
.spinner > div {
  background-color: #67CF22;
  height: 100%;
  width: 6px;
  display: inline-block;
   
  -webkit-animation: stretchdelay 1.2s infinite ease-in-out;
  animation: stretchdelay 1.2s infinite ease-in-out;
}
 
.spinner .rect2 {
  -webkit-animation-delay: -1.1s;
  animation-delay: -1.1s;
}
 
.spinner .rect3 {
  -webkit-animation-delay: -1.0s;
  animation-delay: -1.0s;
}
 
.spinner .rect4 {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}
 
.spinner .rect5 {
  -webkit-animation-delay: -0.8s;
  animation-delay: -0.8s;
}
 
@-webkit-keyframes stretchdelay {
  0%, 40%, 100% { -webkit-transform: scaleY(0.4) } 
  20% { -webkit-transform: scaleY(1.0) }
}
 
@keyframes stretchdelay {
  0%, 40%, 100% {
    transform: scaleY(0.4);
    -webkit-transform: scaleY(0.4);
  }  20% {
    transform: scaleY(1.0);
    -webkit-transform: scaleY(1.0);
  }
}



.headImg img {
  position: relative;
  border: 1;
  width: 80px;
  height: 80px;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  -ms-border-radius: 50%;
  border-radius: 50%;
  border:1px solid #BFEFFF
}
.change-headImg{
    position:absolute;
    background: rgba(0,0,0,0.4);
    width: 80px;
    height: 80px;
    margin-left: -80px;
    color: #fff !important;
    border-radius: 50%;
    z-index: 10;
    opacity: 0;
    cursor: pointer;
}
.personal-center-wrap {
    margin-left:90px;
    text-align: center;
}
.personal-title {
    font-size: 35px;
    color: #20a0ff;
    margin-top: 4rem;
    font-weight: bold;
}
.form-wrap {
    width: 500px;
    margin: 0 auto;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 13px 16px;
}
.textarea-height > textarea {
    height: 150px;
}
</style>