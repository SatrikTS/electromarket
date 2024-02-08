import {defineStore} from 'pinia'

interface UserPayloadInterface {
  email: string
  password: string
}

export const useAuthStore = defineStore({
  id: 'auth',
  state: (): any => {
    return {
      authenticated: false,
      loading: false,
      authStatus: true,
      authUserState: false
    }
  },
  actions: {
    async authUser(dataForm: any) {
      await fetch(`${useRuntimeConfig().public.SERVER_URL}/login`, {
        method: 'POST',
        body: dataForm
      })
      .then((response) => {
        if(response.ok) return response.json()
        else throw Error('error')
      })
      .then((response) => {
        const token = useCookie('token', {
          maxAge: 10000
        });
        token.value = response.token;
        this.authUserState = true;
      })
      .catch((error) => {
        console.log(error)
      })
    },
    async authenticateAdmin(dataForm: any) {
      return await fetch(`${useRuntimeConfig().public.SERVER_URL}/admin`, {
        method: 'POST',
        body: dataForm
      })
      .then((response) => {
        if(response.ok) return response.json()
        else throw Error('error')
      })
      .then((response) => {
        const userToken = useCookie('token', {
          maxAge: 10000
        });
        userToken.value = response.token;
        this.authUser = true;
        this.authUserState = true;
        return response
      })
      .catch((error) => {
        console.log(error)
      })
    },
    logUserOut() {
      const token = useCookie('token');
      this.authenticated = false;
      token.value = null;
    }
  },
  getters: {
    authStatusGetter: state => state.authenticated,
    authUserStateGetter: state => state.authUserState
  }
})