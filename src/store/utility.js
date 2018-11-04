export const updateObject = (state, toMerge) => {
  return {
    ...state,
    ...toMerge
  }
}