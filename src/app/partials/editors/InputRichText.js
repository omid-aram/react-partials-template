import React, { useState } from "react"
import { FormHelperText } from "@material-ui/core"
import { Controller, useFormContext } from "react-hook-form"
import objectPath from "object-path"
import RichTextEditor from 'react-rte';


const InputRichText = (props) => {
    const { name, label, ...rest } = props
    const { control, register, setValue, getValues, errors } = useFormContext();
    const [rteValue, setRteValue] = useState(RichTextEditor.createValueFromString(getValues(name), 'html'))
    //simple name : "title" 
    //path name : "items[1].title"
    let namePath = name.replace(/\[(\w+)\]/g, '.$1') //items[1] => items.1
    let error = objectPath.get(errors, namePath);
    let hasError = !!error;
    // The toolbarConfig object allows you to specify custom buttons, reorder buttons and to add custom css classes.
    // Supported inline styles: https://github.com/facebook/draft-js/blob/master/docs/Advanced-Topics-Inline-Styles.md
    // Supported block types: https://github.com/facebook/draft-js/blob/master/docs/Advanced-Topics-Custom-Block-Render.md#draft-default-block-render-map
    const toolbarConfig = {
        // Optionally specify the groups to display (displayed in the order listed).
        display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'LINK_BUTTONS', 'BLOCK_TYPE_DROPDOWN', 'HISTORY_BUTTONS'],
        INLINE_STYLE_BUTTONS: [
            { label: 'Bold', style: 'BOLD', className: 'custom-css-class' },
            { label: 'Italic', style: 'ITALIC' },
            { label: 'Underline', style: 'UNDERLINE' }
        ],
        BLOCK_TYPE_DROPDOWN: [
            { label: 'Normal', style: 'unstyled' },
            { label: 'Heading Large', style: 'header-one' },
            { label: 'Heading Medium', style: 'header-two' },
            { label: 'Heading Small', style: 'header-three' }
        ],
        BLOCK_TYPE_BUTTONS: [
            { label: 'UL', style: 'unordered-list-item' },
            { label: 'OL', style: 'ordered-list-item' }
        ]
    };



    React.useEffect(() => {
        register(name); // custom register
    }, [register])

    const handleChange = (value) => {
        setRteValue(value);
        setValue(name, value.toString('html'));
    };
    return (<>

        <RichTextEditor
            value={rteValue}
            onChange={handleChange}
            toolbarConfig={toolbarConfig}
        />
        {/* <Controller
            name={name}
            control={control}
            render={({ value, onChange }) => (
                <RichTextEditor value={RichTextEditor.createValueFromString(value||'', 'html')} onChange={onChange}
                    toolbarConfig={toolbarConfig}
                />
            )}
        /> */}
        <FormHelperText>
            {hasError && (error.message)}
        </FormHelperText>
    </>);

}

export default InputRichText;