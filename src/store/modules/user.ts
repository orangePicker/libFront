import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";

interface userInfoType {
  account: string;
  username?: string;
  auth: number;
}

export const useUserState = defineStore(
  "userState",
  () => {
    // 路由
    const router = useRouter();

    // token
    const token = ref<string>("123");

    // 用户信息
    const userInfo = ref<userInfoType>({
      account: "",
      username: "",
      auth: 0,
    });

    // 清除登录信息
    const clearUser = () => {
      token.value = "";
      userInfo.value = {
        account: "",
        username: "",
        auth: 0,
      };
      router.push("/login");
    };

    return {
      token,
      userInfo,
      clearUser,
    };
  },
  { persist: true }
);
