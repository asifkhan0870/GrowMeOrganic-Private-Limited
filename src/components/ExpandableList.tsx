
import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Checkbox,
  IconButton,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Department } from '../types';

interface ExpandableListProps {
  departments: Department[];
}

const ExpandableList: React.FC<ExpandableListProps> = ({ departments }) => {
  const [open, setOpen] = useState<{ [key: string]: boolean }>({});
  const [selected, setSelected] = useState<{ [key: string]: boolean }>({});

  const handleToggle = (department: string) => {
    setOpen((prev) => ({ ...prev, [department]: !prev[department] }));
  };

  const handleSelect = (item: string, isSub: boolean, department?: Department) => {
    setSelected((prev) => {
      const newState = { ...prev, [item]: !prev[item] };

      if (!isSub && department) {
        // Select or deselect all sub-departments if a department is selected
        department.sub_departments.forEach((sub) => {
          newState[sub] = newState[item];
        });
      } else if (isSub && department) {
        // Select or deselect the department if all sub-departments are selected/deselected
        const allSelected = department.sub_departments.every((sub) => newState[sub]);
        newState[department.department] = allSelected;
      }

      return newState;
    });
  };

  return (
    <List>
      {departments.map((dept) => (
        <div key={dept.department}>
          <ListItem button onClick={() => handleToggle(dept.department)}>
            <ListItemIcon>
              <Checkbox
                checked={!!selected[dept.department]}
                onChange={() => handleSelect(dept.department, false, dept)}
              />
            </ListItemIcon>
            <ListItemText primary={`${dept.department} (${dept.sub_departments.length})`} />
            <IconButton>
              {open[dept.department] ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </ListItem>
          <Collapse in={open[dept.department]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {dept.sub_departments.map((sub) => (
                <ListItem key={sub} button style={{ paddingLeft: 32 }}>
                  <ListItemIcon>
                    <Checkbox
                      checked={!!selected[sub]}
                      onChange={() => handleSelect(sub, true, dept)}
                    />
                  </ListItemIcon>
                  <ListItemText primary={sub} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </div>
      ))}
    </List>
  );
};

export default ExpandableList;
