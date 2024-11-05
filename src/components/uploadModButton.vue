<template>  
    <div class="upload-mod-button">  
      <button @click="uploadMod">  
        <span>+</span> 上传MOD  
      </button>  
    </div>  
  </template>  
    
  <script>  
  import axios from 'axios';  
    
  export default {  
    name: 'uploadModButton',  
    methods: {  
      async uploadMod() {  
        const fileInput = document.createElement('input');  
        fileInput.type = 'file';  
        //fileInput.accept = '.zip';  
    
        fileInput.onchange = async (event) => {  
          const file = event.target.files[0];  
          if (!file) return;  
    
          const formData = new FormData();  
          formData.append('uploader_id', '1234567890'); // 假设这是当前用户的ID  
          formData.append('file_name', file.name);  
          formData.append('file', file);  
    
          try {  
            const response = await axios.post('http://localhost:8080/api/user/upload_mod', formData, {  
              headers: {  
                'Content-Type': 'multipart/form-data'  
              }  
            });  
    
            if (response.data.status === 'success') {  
              alert('MOD上传成功！');  
            } else {  
              alert('MOD上传失败！');  
            }  
          } catch (error) {  
            console.error('上传过程中发生错误：', error);  
            alert('MOD上传失败，请重试！');  
          }  
        };  
    
        fileInput.click();  
      }  
    }  
  };  
  </script>  
    
  <style scoped>  
  .upload-mod-button {  
    display: inline-block;  
    padding: 10px 20px;  
    background-color: #007bff;  
    color: white;  
    border: none;  
    border-radius: 5px;  
    cursor: pointer;  
    font-size: 16px;  
    transition: background-color 0.3s;  
  }  
    
  .upload-mod-button button {  
    display: flex;  
    align-items: center;  
  }  
    
  .upload-mod-button span {  
    margin-right: 10px;  
    font-size: 18px;  
  }  
    
  .upload-mod-button:hover {  
    background-color: #0056b3;  
  }  
  </style>