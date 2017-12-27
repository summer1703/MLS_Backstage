<template>
    <div class="box">
        <div>
            <el-input placeholder="请输入内容" v-model="input5" style="width:300px">
                <el-button slot="append" icon="search" @click="search"></el-button>
            </el-input>
            <el-table
                :data="tableData"
                style="width: 300px"  
                max-height="250">
                <el-table-column type="expand">
                    <template scope="props">
                        <ul class="roomBox">
                            <li v-for="item in props.row.sit[0]">
                                <i v-for="item in props.row.sit[1]"></i>
                            </li>
                        </ul>
                    </template>
                </el-table-column>
                <el-table-column label="放映厅" prop="name"></el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                        <el-button
                            size="small"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-form label-width="100px" class="demo-ruleForm">
            <h2 style="height:45px;text-align:center;background-color:#dfe6ec;line-height:40px;margin-bottom:20px;">增加放映厅</h2>
            <el-form-item label="影院选择" prop="pass">
                <el-select v-model="value" placeholder="请选择影院">
                    <el-option
                        v-for="item in options"
                        :key="item._id"
                        :label="item.cinema"
                        :value="item.cinema">
                    </el-option>
                </el-select> 
            </el-form-item>
            <el-form-item label="放映厅名字" prop="pass">
                <el-input type="text" auto-complete="off" class="in1" v-model="name"></el-input>
            </el-form-item>
            <el-form-item label="座位" prop="checkPass">
                <el-input type="text" auto-complete="off" class="in1" v-model="sit" placeholder="[1,2]"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="addRoom">提交</el-button>
                <el-button @click="resetData">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import axios from "axios";
    export default {
        data() {
            return {
                tableData: [],
                name:"",
                sit:"",
                input5: '',
                cunt:1,
                ids:[],
                options: [],
                value: '',
                cin_id:""
            }
        },
        created(){
            this.getData()
            this.getMovieRoom()
        },
        methods:{
        async getData(){
            const {data}=await axios.get("http://localhost:3000/scrRoom/find",{
                params:{

                }
            })
            this.tableData=data
        },
        async getMovieRoom(){
            const {data}=await axios.get("http://localhost:3000/cinema/find",{
                params:{

                }
            })
            this.options=data
        },
        async addRoom(){
            // this.tableData.push({name:this.name,sit:eval(this.sit)})
            // console.log(typeof eval(this.sit))
            for(var v of this.options){
                if(v.cinema==this.value){
                    this.cin_id=v._id
                    console.log(v._id,this.cin_id)
                }
            }
            await axios.get("http://localhost:3000/scrRoom/add",{
                params:{
                    "name":this.name,
                    "sit":this.sit,
                    "cinId":this.cin_id
                }
            })
            this.getData()
        },
        async handleDelete(index, row) {
            console.log(index, row);
            this.ids.push(row._id);
            const deleteData=JSON.stringify(this.ids);
            // console.log(deleteData)
            await axios.get("http://localhost:3000/scrRoom/del",{
                params:{
                    ids:deleteData
                }
            })
            this.getData()
        },
        async search(){
            const searchData={}
            switch(this.select){
                case "1":
                searchData.name=this.input5
                break
                case "2":
                searchData.phone=this.input5
            }
            const {data}=await axios.get("http://localhost:3000/scrRoom/find",{
                params:{
                    "name":this.input5
                }
            })
            this.tableData=data
            console.log(data)
        },
        resetData(){
            this.tableData=[]
        }
    }
}
</script>
<style scoped>
  .demo-table-expand {
    font-size: 0;
}
.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}
.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}
.box{
    display: flex;
}
.demo-ruleForm{
    border: 1px solid #dfe6ec;
    width: 600px;
    margin-left: 50px;
    height: 400px;
    border-radius: 5px;
}
.in1{
  width: 300px;
}
.roomBox{
  width: 100%;
}
.roomBox>li{
  list-style: none;
  display: flex;
}
.roomBox i{
  display: block;
  width: 10px;
  height: 10px;
  background-color: red;
  margin: 5px;
}
.choice{
  height: 80px;
  padding-left: 30px;
}
</style>