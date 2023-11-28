# Introduction

TODO: Give a short introduction of your project. Let this section explain the objectives or the motivation behind this project.

# Getting Started

TODO: Guide users through getting your code up and running on their own system. In this section you can talk about:

1. Installation process
2. Software dependencies
3. Latest releases
4. API references

# Build and Test

TODO: Describe and show how to build your code and run the tests.

# Contribute

TODO: Explain how other users and developers can contribute to make your code better.

If you want to learn more about creating good readme files then refer the following [guidelines](https://docs.microsoft.com/en-us/azure/devops/repos/git/create-a-readme?view=azure-devops). You can also seek inspiration from the below readme files:

- [ASP.NET Core](https://github.com/aspnet/Home)
- [Visual Studio Code](https://github.com/Microsoft/vscode)
- [Chakra Core](https://github.com/Microsoft/ChakraCore)

--- changed the Animated to Text style in
Reference link
https://stackoverflow.com/questions/61226530/typeerror-undefined-is-not-an-object-evaluating-reactnative-animated-text-pr

Step 1 go to affix file of react-native-matierial-textField do following changes
import { Text } from 'react-native';
replace style: Animate.Text.propTypes with style: Text.propTypes ,

Step 2 go to Helper file of react-native-matierial-textField do following changes
import { Text } from 'react-native';
replace style: Animate.Text.propTypes with style: Text.propTypes ,

Step 3 go to Label file of react-native-matierial-textField do following changes
import { Text } from 'react-native';
replace style: Animate.Text.propTypes with style: Text.propTypes ,

-- Please replace the following code with index file of react-native-form-helpers

import validatejs from "validate.js";

export default function RNFormHelpers({ dictionary }) {
const service = {
onInputChange,
getInputValidationState,
validateInput,
getFormValidation,
setInputPosition,
getFirstInvalidInput,
isFormToched,isFormValid
};

function onInputChange({ id, value, cb = () => {} }) {
const { inputs } = this.state;

this.setState(
{
inputs: {
...inputs,
[id]: getInputValidationState({
input: inputs[id],
value,
touched: true
})
}
},
cb
);

}

function getInputValidationState({ input, value, touched }) {
return {
...input,
value,
errorLabel: input.optional
? null
: validateInput({ type: input.type, value }),
touched: touched || input.touched
};
}

function validateInput({ type, value }) {

const result = validatejs(
{
[type]: value
},
{
[type]: dictionary[type]
}
);

if (result) {

return result[type][0];
}

return null;
}

function isFormToched() {
const { inputs } = this.state;
formToched=false
for (const [key, input] of Object.entries(inputs)) {
if(input.touched)
{
formToched=true
}
}
return formToched;
}

function isFormValid() {
const { inputs } = this.state;
let isValid=true
for (const [key, input] of Object.entries(inputs)) {

        if(input.errorLabel!="" && input.errorLabel!=null)
        {
            isValid=false
        }
       }
       return isValid;

}

function getFormValidation() {
const { inputs } = this.state;

const updatedInputs = {};

for (const [key, input] of Object.entries(inputs)) {
updatedInputs[key] = getInputValidationState({
input,
value: input.value,
touched: true
});
}

this.setState({
inputs: updatedInputs
});

return getFirstInvalidInput({ inputs: updatedInputs });
}

function setInputPosition({ ids, value }) {
const { inputs } = this.state;

const updatedInputs = {
...inputs
};

ids.forEach(id => {
updatedInputs[id].yCoordinate = value;
});

this.setState({
inputs: updatedInputs
});
}

function getFirstInvalidInput({ inputs }) {
let firstInvalidCoordinate = Infinity;

for (const [key, input] of Object.entries(inputs)) {
// if (input.errorLabel && input.yCoordinate < firstInvalidCoordinate) {
// firstInvalidCoordinate = input.yCoordinate;
// }

if (input.errorLabel!="" && input.errorLabel!=null ) {
firstInvalidCoordinate = 212;
}
}

if (firstInvalidCoordinate === Infinity) {
firstInvalidCoordinate = null;
}

return firstInvalidCoordinate;
}

return service;
}

---- Changes for IOS:

1.) Install the following packages:

    @react-native-community/push-notification-ios

This package is for push notification for IOS.

2.) If we are using older version of Xcode i.e less than 12, then change the following line in Xcode above permissions_path:

platform :ios, '10.0'
3.) In App>Theme>Images.js
Replace the name and path of information icon
with following line
Information: require('App/Assets/Images/CoviStixImages/information.png'),
