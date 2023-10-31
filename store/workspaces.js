export const state = () => ({
    loading: false,
    items: [
        {
            id: 1,
            name: 'Shopping List',
            color: '#009BFF',
            description: 'The list my wife prepared for me to not forget when I go shopping.',
            icon: 'mdi-shopping',
            createDate:'Tue Oct 31 2023 13:31:50',
            isDeleted:false
        },
        {
            id: 2,
            name: 'Tomorrow Plan',
            color: '#E90C0C',
            description: 'My workspace where I take notes of the activities I will do tomorrow.',
            icon: 'mdi-calendar',
            createDate:'Tue Oct 31 2023 13:31:50',
            isDeleted:false
        }
    ],
    idCounter:2
})

export const getters = {
    getWorkspace(state){
        return (id)=>state.items.find(x=>x.id == id)
    },
    getWorkspaces(state) {
      return state.items.filter(x=>x.isDeleted == false)
    },
    getDeletedWorkspaces(state) {
        return state.items.filter(x=>x.isDeleted == true)
    },
  }

export const mutations = {
    setItems(state, value) {
        state.items = value
    },
    setLoading(state, value) {
        state.loading = value
    },
    addItem(state, value) {
        state.idCounter += 1
        value.id = state.idCounter
        value.createDate = new Date()
        value.isDeleted=false
        state.items.push(value)
    },
    removeItem(state, value) {
        state.items.splice(state.items.indexOf(value), 1)
    },
    deleteItem(state, value){
        value.isDeleted = true
        value.deleteDate = new Date()
        state.items = state.items.map(x=>x.id === value.id ? value : x)
    },
    updateItem(state, value) {
        state.items = state.items.map(x=>x.id === value.id ? value : x)
    }
}

export const actions = {
    insertItem({commit},item){
        commit('setLoading',true)
        try {
            commit('addItem',item)
            commit('setLoading',false)
        } catch (error) {
            commit('setLoading',false)
            throw error
        }
    },
    updateItem({commit},item){
        commit('setLoading',true)
        try {
            commit('updateItem',item)
            commit('setLoading',false)
        } catch (error) {
            commit('setLoading',false)
            throw error
        }
    },
    removeItem({commit},item){ // Remove from bin
        commit('setLoading',true)
        try {
            commit('removeItem',item)
            commit('setLoading',false)
        } catch (error) {
            commit('setLoading',false)
            throw error
        }
    },
    deleteItem({commit},item){ // Move to bin
        commit('setLoading',true)
        try {
            commit('deleteItem',item)
            commit('setLoading',false)
        } catch (error) {
            commit('setLoading',false)
            throw error
        }
    }
}