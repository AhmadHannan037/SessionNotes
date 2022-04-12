/* 
System: Session Notes
Organization: XYZ
Developer:Ahmad Hanan
Date: 04/13/22
Purpose: This file contain all the constansts served as an validations in forms
*/
const rules = {
nameRules: [
    v => !!v || 'Name is required',
    v => (v && v.length <= 5 ) || 'Name must be less than 5 characters',
  ],
     descriptionRules: [
    v => !!v || 'Description is required',
    v => (v && v.length <= 20 ) || 'Description must be less than 20 characters',
  ],
   keyRules: [
    v => !!v || 'Key is required',
    v => (v && v.length < 2 ) || 'Key must be single character',
     v => /^[a-z]{1}$/gm.test(v)||'key only accept alphabets'
  
  ]
}
  export default rules