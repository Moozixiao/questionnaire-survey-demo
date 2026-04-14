import { w as writable } from "./index.js";
const authStore = writable({
  isLoggedIn: false,
  user: null,
  token: null
});
if (typeof window !== "undefined") {
  authStore.subscribe((state) => {
    console.log("Auth store state changed:", state);
  });
}
function initAuth() {
  if (typeof localStorage !== "undefined") {
    const savedAuth = localStorage.getItem("auth");
    if (savedAuth) {
      try {
        const auth = JSON.parse(savedAuth);
        authStore.set(auth);
      } catch (e) {
        localStorage.removeItem("auth");
      }
    }
  }
}
export {
  authStore as a,
  initAuth as i
};
