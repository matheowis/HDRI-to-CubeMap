import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

const options = ['png', 'hdr', 'rgbm16'];

const FormatSelect = props => {
  const { classes, onChange, value } = props
  return (
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor="resolution-label">Format</InputLabel>
      <Select
        value={value}
        onChange={onChange}
        inputProps={{
          name: 'resolution',
          id: 'resolution-label',
        }}
      >
        {options.map(option => (<MenuItem key={option} value={option}>{option}</MenuItem>))}
      </Select>
    </FormControl>
  )
}

export default FormatSelect