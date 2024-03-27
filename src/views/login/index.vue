<template>
  <div class="login">
    <div class="content">
      <div class="left">
        <span>Vue</span>
        <span>+</span>
        <span>NodeJs</span>
      </div>
      <div class="right">
        <Form
          @finish="formSubmit"
          name="loginForm"
          :model="formData"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 16 }"
        >
          <FormItem label="用户名:" name="account">
            <Input
              v-model:value="formData.account"
              placeholder="请输入用户名"
            ></Input>
          </FormItem>
          <FormItem label="密码:" name="password">
            <InputPassword
              v-model:value="formData.password"
              placeholder="请输入密码"
            ></InputPassword>
          </FormItem>
          <FormItem v-if="!isLogin" label="确认密码:" name="enterPassword">
            <InputPassword
              v-model:value="formData.enterPassword"
              placeholder="请再次输入密码"
            ></InputPassword>
          </FormItem>
          <FormItem :wrapper-col="{ offset: 6 }" name="passCode">
            <Input
              :maxlength="4"
              style="width: 100px"
              v-model:value="formData.passCode"
              placeholder="验证码"
            ></Input>
            <img
              class="passCode"
              @click="
                () => {
                  console.log('click');
                }
              "
              src=""
              alt=""
            />
          </FormItem>
          <FormItem :wrapper-col="{ offset: 8 }">
            <Button type="primary" html-type="submit" style="width: 250px">{{
              isLogin ? "登录" : "注册"
            }}</Button>
            <Button type="link" @click="isLogin = !isLogin">{{
              !isLogin ? "登录" : "注册"
            }}</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Form, FormItem, Input, Button, InputPassword } from "ant-design-vue";
import { ref } from "vue";
import { myHttp } from "../../utils/interceptors";

// 表单状态
const isLogin = ref<boolean>(true);

// 表单对象
const formData = ref({
  account: "",
  password: "",
  enterPassword: "",
  passCode: "",
});

// 提交
const formSubmit = (values: any) => {
  myHttp("find").then((res) => {
    console.log(res);
  });
  console.log(values);
};
</script>

<style scoped lang="scss">
.passCode {
  width: 100px;
  height: 40px;
  margin-left: 20px;
  cursor: pointer;
}
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #001b4a;
  .content {
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    width: 800px;
    padding: 40px 0;
    border-radius: 15px;
    background-color: #fff;
    transition: all 0.3s;
    .left {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      padding: 0 30px;
      font-size: 40px;
      font-weight: bold;
      user-select: none;
    }
    .right {
      flex: 1;
    }
  }
}
</style>
