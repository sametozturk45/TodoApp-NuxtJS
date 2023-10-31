export const state = () => ({
    loading: false,
    items: [
        {
            id: 1,
            text: 'Buy 2 loaves of bread',
            createDate: 'Tue Oct 31 2023 13:31:50',
            isCompleted: false,
            isDeleted: false,
            workspaceId: 1
        },
        {
            id: 2,
            text: 'Buy a dozen eggs',
            createDate: 'Tue Oct 31 2023 13:31:50',
            isCompleted: false,
            isDeleted: false,
            workspaceId: 1
        },
        {
            id: 3,
            text: 'Get a gallon of milk',
            createDate: 'Tue Oct 31 2023 13:31:50',
            isCompleted: false,
            isDeleted: false,
            workspaceId: 1
        },
        {
            id: 4,
            text: 'Purchase a block of cheese',
            createDate: 'Tue Oct 31 2023 13:31:50',
            isCompleted: false,
            isDeleted: false,
            workspaceId: 1
        },
        {
            id: 5,
            text: 'Grab a whole chicken',
            createDate: 'Tue Oct 31 2023 13:31:50',
            isCompleted: false,
            isDeleted: false,
            workspaceId: 1
        },
        {
            id: 6,
            text: 'Buy 5 pounds of potatoes',
            createDate: 'Tue Oct 31 2023 13:31:50',
            isCompleted: false,
            isDeleted: false,
            workspaceId: 1
        },
        {
            id: 7,
            text: 'Pick up a bag of apples',
            createDate: 'Tue Oct 31 2023 13:31:50',
            isCompleted: false,
            isDeleted: false,
            workspaceId: 1
        },
        {
            id: 8,
            text: 'Get 2 tubes of toothpaste',
            createDate: 'Tue Oct 31 2023 13:31:50',
            isCompleted: false,
            isDeleted: false,
            workspaceId: 1
        },
        {
            id: 9,
            text: 'Prepare a presentation for the meeting at 3 PM',
            createDate: 'Tue Oct 31 2023 13:31:50',
            isCompleted: false,
            isDeleted: false,
            workspaceId: 2
        },
        {
            id: 10,
            text: 'Finish reading Chapter 5 of the book',
            createDate: 'Tue Oct 31 2023 13:31:50',
            isCompleted: false,
            isDeleted: false,
            workspaceId: 2
        },
        {
            id: 11,
            text: 'Call the plumber to fix the leaky faucet',
            createDate: 'Tue Oct 31 2023 13:31:50',
            isCompleted: false,
            isDeleted: false,
            workspaceId: 2
        },
        {
            id: 12,
            text: 'Go for a 30-minute jog in the park',
            createDate: 'Tue Oct 31 2023 13:31:50',
            isCompleted: false,
            isDeleted: false,
            workspaceId: 2
        },
        {
            id: 13,
            text: 'Buy a birthday gift for Sarah',
            createDate: 'Tue Oct 31 2023 13:31:50',
            isCompleted: false,
            isDeleted: false,
            workspaceId: 2
        },
        {
            id: 14,
            text: 'Schedule a dentist appointment for next week',
            createDate: 'Tue Oct 31 2023 13:31:50',
            isCompleted: false,
            isDeleted: false,
            workspaceId: 2
        },
        {
            id: 15,
            text: 'Clean the garage and organize tools',
            createDate: 'Tue Oct 31 2023 13:31:50',
            isCompleted: false,
            isDeleted: false,
            workspaceId: 2
        },
        {
            id: 16,
            text: 'Pay the monthly utility bills online',
            createDate: 'Tue Oct 31 2023 13:31:50',
            isCompleted: false,
            isDeleted: false,
            workspaceId: 2
        }
    ],
    idCounter:16
})

export const getters = {
    getTodoListByWorkspaceId(state) {
        return (id)=>state.items.filter(x=>x.isDeleted == false && x.workspaceId == id)
    },
    getDeletedTodos(state) {
        return (id)=>state.items.filter(x=>x.isDeleted == true && x.workspaceId == id)
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