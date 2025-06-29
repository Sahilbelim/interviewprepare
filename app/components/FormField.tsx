import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import React from 'react'
import { Controller, FiledValues, Control, Path } from "react-hook-form";

interface FormFieldProps<T extends FiledValues> { 
  control: Control<T>,
  name:Path<T>,
  label: string,
  placeholder: string,
  type?: 'text' | 'email' | 'password' | 'number',
} 

const FormField = ({control,name,label,placeholder,type="text"}:FormFieldProps<T>) => {
  return (
    <>
       
       <Controller name={name} control={control} render={({ field }) => (
          <FormItem>
          <FormLabel className="label">{ label}</FormLabel>
            <FormControl>
            < Input className='input' placeholder={placeholder}
             type={type} {...field} />
            </FormControl>
            
            <FormMessage />
          </FormItem>
      )
      } />
    </>
  );
}

export default FormField