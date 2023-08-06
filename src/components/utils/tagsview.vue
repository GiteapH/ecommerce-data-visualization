<template>
    <!-- calss添加了一个样式 -->
    <div class="tagsbox">
        <div @contextmenu.prevent="openMenu(item, $event)" :class="isActive(item.url) ? 'active' : ''" class="tagsview"
            @mouseleave="item.show = false" @mousemove="item.show = true" v-for="(item, index) in tags" :key="index"
            @click="tagsmenu(item)">
            <el-row style="width: 150px;">
                <el-col :span="22">
                    {{ item.name }}
                </el-col>
                <el-col :span="2" style="padding-top: 2px;">
                    <el-icon @click.stop=handleClose(item) v-show="item.show">
                        <Close></Close>
                    </el-icon>
                </el-col>
            </el-row>
            <!-- 这个地方一定要click加个stop阻止，不然会因为事件冒泡一直触发父元素的点击事件，无法跳转另一个路由 -->
        </div>
    </div>
</template>
<script>
//这个就是导入vuex的数据，配合下面...map用
import { mapState, mapMutations } from "vuex";
import { Close } from '@element-plus/icons-vue'
export default {
    data() {
        return {
            //右键菜单隐藏对应布尔值
            visible: false,
            //右键菜单对应位置
            top: 0,
            left: 0
        }
    },
    computed: {
        //引入vuex中state中的tags数据，一样this调用就行
        ...mapState(["tags"]),
    },
    watch: {
        //监听右键菜单的值是否为true，如果是就创建全局监听点击事件，触发closeMenu事件隐藏菜单，如果是false就删除监听
        visible(value) {
            if (value) {
                document.body.addEventListener('click', this.closeMenu)
            } else {
                document.body.removeEventListener('click', this.closeMenu)
            }
        }
    },
    methods: {
        //引入vuex中mutation方法，可以直接this.xxx调用他
        ...mapMutations(["closeTab", "cleartagsview"]),
        //点击叉叉删除的事件
        handleClose(item, index) {
            
            index = this.tags.findIndex(e => {
                return e.name == item.name
            })
            let turl = item.url
            //先把长度保存下来后面用来比较做判断条件
            let length = this.tags.length - 1;
            //vuex调方法,上面...map引入的vuex方法，不会这种方法的看vue官网文档
            this.closeTab(item);
            // 如果关闭的标签不是当前路由的话，就不跳转
            if (turl !== this.$route.path) {
                return;
            }
            // 判断：如果index和length是一样的，那就代表都是一样的长度，就是最后一位，那就往左跳转一个
            if (index === length) {
                //再判断：如果length=0，也就是说你删完了所有标签
                if (length === 0) {
                    //那么再判断：如果当前路由不等于index，也就是我首页的路由
                    if (this.$route.path !== "/") {
                        //那么就跳转首页。这一步的意思是：如果删除的最后一个标签不是首页就统一跳转首页，如果你删除的最后一个标签是首页标签，已经在这个首页路由上了，你还跳个什么呢。这不重复操作了吗。
                        this.$router.push({ path: "/" });
                    }
                } else {
                    //那么，如果上面的条件都不成立，没有length=0.也就是说你还有好几个标签，并且你删除的是最后一位标签，那么就往左边挪一位跳转路由
                    this.$router.push({ path: this.tags[index - 1].url });
                }
            } else {
                // 如果你点击不是最后一位标签，点的前面的，那就往右边跳转
                
                this.$router.push({ path: this.tags[index].url });
            }
        },
        //点击跳转路由
        tagsmenu(item) {
            //判断：当前路由不等于当前选中项的url，也就代表你点击的不是现在选中的标签，是另一个标签就跳转过去，如果你点击的是现在已经选中的标签就不用跳转了，因为你已经在这个路由了还跳什么呢。
            if (this.$route.path !== item.url) {
                //用path的跳转方法把当前项的url当作地址跳转。
                this.$router.push({ path: item.url });
            }
        },
        //通过判断路由一致返回布尔值添加class，添加高亮效果
        isActive(route) {
            return route === this.$route.path
        },
        //右键事件，显示右键菜单，并固定好位置。
        openMenu(tag, e) {

            this.visible = true
            this.selectedTag = tag
            // const offsetLeft = this.$el.getBoundingClientRect().left
            // this.left = e.clientX - offsetLeft + 210  //右键菜单距离左边的距离
            // this.top = e.clientY + 10  //右键菜单距离上面的距离           这两个可以更改，看看自己的右键菜单在什么位置，自己调
        },
        //隐藏右键菜单
        closeMenu() {
            this.visible = false
        },
        //右键菜单关闭所有选项，触发vuex中的方法，把当前路由当参数传过去用于判断
        cleartags(val) {
            this.cleartagsview(val)
        },
        onHover() {

        }
    },
    components: {
        Close
    }
};
</script>
  
<style scoped>
.tagsview {
    cursor: pointer;
    margin-left: 4px;
    height: 26px;
    line-height: 26px;
    padding: 0 8px;
    border: 1px solid #d8dce5;
    border-radius: 5px;
    color: #000;
    font-size: 12px;
    display: inline-flex;
    text-align: center;
}

.tagsicon:hover {
    color: #f56c6c;
}

.active {
    background-color: #40ba84;
    color: #fff;
}

.contextmenu {
    margin: 0;
    background: #fff;
    z-index: 100;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
}

.contextmenu li {
    margin: 0;
    padding: 7px 16px;
    cursor: pointer;
}

.contextmenu li:hover {
    background: #eee;
}
</style>
  