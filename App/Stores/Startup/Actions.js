import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  // This action is triggered when the application starts
  startup: null,
  updateLanguage:['locale'],
  updateLanguageSuccess:['response'],
  updateLanguageFailure:['errorMessage'],
  getAllMessages:null,
  getAllMessagesSuccess:['response'],
  getAllMessagesFailure:['errorMessage'],
})

export const StartupTypes = Types
export default Creators
