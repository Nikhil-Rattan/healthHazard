import RNFormHelpers from "react-native-form-helpers";
import  {validationDictionary} from "App/ValidationDictionary"; // location of your dictionary file
 
export const ValidationService = RNFormHelpers({
  dictionary: validationDictionary
});