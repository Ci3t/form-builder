export const PROMPT =
  ", On the basis of the description please give form in json format with form title,form subheading with form having form field,form name,placeholder name,and form label,fieldType,field required in Json format also keep the json format in this order the formFields as array,formSubheading as string,formTitle as string inside the formfields objects key names are fieldName,fieldType,label,placeholder,required,options and keep options as an array with the value dont add a label inside, ";
export const PROMPT2 = `
    On the basis of InputTypes, please act as an expert in the field of form design and creation. Given a scenario where users input specific values for field types, generate the exact number of fields based on user input. If the user doesn't specify a number value for a particular field and it is null, suggest a suitable default. Ensure the JSON output strictly adheres to the specified number of fields. For example, if 'checkbox: 4' is specified, generate exactly 4 checkbox questions. Ensure the tone is friendly. The JSON output should depend on the description and include the correct type of the input in fieldType without the word 'field' at the end. For checkbox and radio fields, ensure the number specified refers to the number of questions, not the options. Each checkbox or radio question should have a set of 3 options. Here is an example structure for clarity:

    Example InputTypes: {text: 2, checkbox: 3, radio: 4, select: 2}

    Example Output:
    {
      "formFields": [
        {
          "fieldName": "textField1",
          "fieldType": "text",
          "label": "Text Field 1",
          "placeholder": "Enter text for field 1",
          "required": true
        },
        {
          "fieldName": "textField2",
          "fieldType": "text",
          "label": "Text Field 2",
          "placeholder": "Enter text for field 2",
          "required": true
        },
        {
          "fieldName": "checkboxField1",
          "fieldType": "checkbox",
          "label": "Checkbox Field 1",
          "required": true,
          "options": ["Option 1", "Option 2", "Option 3"]
        },
        {
          "fieldName": "checkboxField2",
          "fieldType": "checkbox",
          "label": "Checkbox Field 2",
          "required": true,
          "options": ["Option 1", "Option 2", "Option 3"]
        },
        {
          "fieldName": "checkboxField3",
          "fieldType": "checkbox",
          "label": "Checkbox Field 3",
          "required": true,
          "options": ["Option 1", "Option 2", "Option 3"]
        },
        {
          "fieldName": "radioField1",
          "fieldType": "radio",
          "label": "Radio Field 1",
          "required": true,
          "options": ["Option 1", "Option 2", "Option 3"]
        },
        {
          "fieldName": "radioField2",
          "fieldType": "radio",
          "label": "Radio Field 2",
          "required": true,
          "options": ["Option 1", "Option 2", "Option 3"]
        },
        {
          "fieldName": "radioField3",
          "fieldType": "radio",
          "label": "Radio Field 3",
          "required": true,
          "options": ["Option 1", "Option 2", "Option 3"]
        },
        {
          "fieldName": "radioField4",
          "fieldType": "radio",
          "label": "Radio Field 4",
          "required": true,
          "options": ["Option 1", "Option 2", "Option 3"]
        },
        {
          "fieldName": "selectField1",
          "fieldType": "select",
          "label": "Select Field 1",
          "placeholder": "Select an option for field 1",
          "required": true,
          "options": ["Option 1", "Option 2", "Option 3"]
        },
        {
          "fieldName": "selectField2",
          "fieldType": "select",
          "label": "Select Field 2",
          "placeholder": "Select an option for field 2",
          "required": true,
          "options": ["Option 1", "Option 2", "Option 3"]
        }
      ]
    }

    now fieldName,label,placeholder,options 
    those you will generate depend on the user Description 
    Now generate the JSON output based on the given description with the correct format for fieldName, label, placeholder, and options.

  
  `;
