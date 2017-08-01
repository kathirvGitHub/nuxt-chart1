export default function ({context, store}) {
    console.log('inside userparam')
    store.commit('SET_USER', {'name' : 'APADMIN'})
}