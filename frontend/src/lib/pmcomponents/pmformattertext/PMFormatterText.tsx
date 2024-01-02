import { format, parseISO } from "date-fns";
import { PropsWithChildren } from "react";
import { PMText } from "..";
import "./PMFormatterText.scss";

import { TypographyProps } from "@mui/material/Typography";
import { Variant } from "@mui/material/styles/createTypography";

export interface PMFormatterTextProps extends TypographyProps {
    value?: any,
    formatType?: string,
    variant2?: string,

}
const locale = 'en-IN'
const currencyFormatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'INR',
});

function enumFormatter(enumVal) {
  if (enumVal){
    var words =  enumVal.split("_")
    var finalWord = []
    words.forEach(item=>{
    if(item.length > 2  ){
      item=  item.toLowerCase();
      item = item[0].toUpperCase() + item.slice(1)
    }
    finalWord.push(item)
    })
    return finalWord.join(" ")
  }
  return ""
  }

function isDateValid(dateString) {
    // Try to create a Date object from the dateString
    const date = new Date(dateString);

    // Check if the parsed date is valid
    // A valid date will not be "Invalid Date"
    // and the original input string should not be equal to the word "Invalid"
    return date.toString() !== "Invalid Date" && dateString.toLowerCase() !== "invalid";
  }


const PMFormatterText = (props: PropsWithChildren<PMFormatterTextProps>) => {
    const { formatType, value, variant2 } = props

    return (

        <>

            {
                formatType === 'percentage' ?
                    <PMText
                        variant={variant2 as Variant} >
                        {value + '%'}
                    </PMText> :

                    formatType === 'currency' ?
                        <PMText
                            variant={variant2 as Variant} >
                            {currencyFormatter.format(value)}
                        </PMText> :

                        formatType === 'datetime' ?
                            <PMText
                                variant={variant2 as Variant} >
                                {value? format(parseISO(value), "dd-MMM-yyyy h:m a") : "---"}
                            </PMText> :

                            formatType === 'date' ? (
                                value ?
                                <PMText
                                    variant={variant2 as Variant} >
                                    {isDateValid(value)? format(parseISO(value), "dd-MMM-yyyy") : "---"}
                                </PMText> : "---"
                            )
                                 :

                                formatType === 'enum' ?
                                    <PMText
                                        variant={variant2 as Variant} >
                                        {enumFormatter(value)}
                                    </PMText> :

                                    <PMText variant={variant2 as Variant}>
                                        {value}
                                    </PMText>

            }
        </>
    )
};

export default PMFormatterText;