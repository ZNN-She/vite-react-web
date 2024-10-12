import pkg from "../../package.json";

function removeToken() {
  localStorage.removeItem("token");
}

function navigatorLoginPage() {
  removeToken();
  window.location.href = `/${pkg.name}/login?redirect=${encodeURIComponent(
    window.location.href
  )}`;
}

function goHomePage() {
  window.location.href = `/${pkg.name}`;
}

export default {
  setToken: (token: string) => {
    localStorage.setItem("token", token);
  },

  removeToken,

  login: async (params: { username: string; password: string }) => {
    // TODO 调用登录API
    console.log("params", params);
    // const reqBody: defs.jcLivePlatformApi.LoginParam = {
    //   pwd: params.password,
    //   username: params.username,
    // };
    // const res = await window.API.jcLivePlatformApi.sysUser.login.request(params, reqBody);
    // console.log("res", res);
    // 获取重定向url
    const redirect = decodeURIComponent(
      window.location.search.replace("?redirect=", "")
    );
    if (redirect) {
      window.location.href = redirect;
    } else {
      goHomePage();
    }
  },

  logout: () => {
    // TODO: Implement logout
    // TODO调用退出api
    navigatorLoginPage();
  },
  navigatorLoginPage,
};
