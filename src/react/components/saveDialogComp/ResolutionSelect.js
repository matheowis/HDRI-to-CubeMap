import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

const options = [16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192];

const ResolutionSelect = props => {
  const { classes, onChange, value } = props
  return (
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor="resolution-label">Piece resolution</InputLabel>
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

export default ResolutionSelect