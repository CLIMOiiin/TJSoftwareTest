<template>
        <el-container style="height:650px">
    <el-aside width="200px" style="height:100%;margin:0%">
        <el-menu style="height:100%;margin:0%" :router="true">
            <el-sub-menu index="1">
                <template #title>
                    <el-icon>
                        <Grid />
                    </el-icon>
                    <span>单元测试</span>
                </template>
                <el-menu-item index="/Unit1"><el-icon>
                        <DocumentDelete />
                    </el-icon>一轮测试结果</el-menu-item>
                <el-menu-item index="/Unit2"><el-icon>
                        <DocumentChecked />
                    </el-icon>二轮测试结果</el-menu-item>
            </el-sub-menu>

            <el-sub-menu index="2">
                <template #title>
                    <el-icon>
                        <Flag />
                    </el-icon>
                    <span>集成测试</span>
                </template>
                <el-menu-item index="/Integration1"><el-icon>
                        <DocumentDelete />
                    </el-icon>一轮测试结果</el-menu-item>
                <el-menu-item index="/Integration2"><el-icon>
                        <DocumentChecked />
                    </el-icon>二轮测试结果</el-menu-item>
            </el-sub-menu>
        </el-menu>
    </el-aside>
    <el-main>
        <!-- 路由占位 -->
        <router-view></router-view>
    </el-main>
</el-container>
</template>