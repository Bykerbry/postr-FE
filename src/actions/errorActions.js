

const setError = error => ({
    type: 'SET_ERROR',
    error
})
const removeError = () => ({
    type: 'REMOVE_ERROR'
})

export {
    setError,
    removeError
}