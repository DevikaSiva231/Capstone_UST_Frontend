import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { List, ListItem, ListItemText, Divider, Paper } from '@mui/material';
import { useNavigate } from 'react-router';

const sampleSomething = [
  {
    "id": 1,
    "b_name": "Freaky Rolls",
    "address": "Pathanamthitta",
    "zipcode": "682308",
    "phone": "509821676",
    "email": "nibufreakyrolls@hotmail.com",
    "website": null,
    "description": "Blaaah",
    "category": "RESTAURANT",
    "date_registered": "2024-11-06T10:32:51.240838Z",
    "images": "http://127.0.0.1:8000/media/temporary/sapling4.jpg",
    "work_time": {
      "Monday": { "open": "09:00", "close": "17:00" },
      "Tuesday": { "open": "09:00", "close": "17:00" },
      "Wednesday": { "open": "09:00", "close": "17:00" },
      "Thursday": { "open": "09:00", "close": "17:00" },
      "Friday": { "open": "09:00", "close": "17:00" },
      "Saturday": { "open": "10:00", "close": "15:00" },
      "Sunday": { "open": "Closed", "close": "Closed" }
    },
    "owner": 1
  },
  {
    "id": 5,
    "b_name": "Yummy Tale",
    "address": "Pala, Kottayam",
    "zipcode": "686636",
    "phone": "6282113649",
    "email": null,
    "website": null,
    "description": "Yummy tummy dummy!",
    "category": "RESTAURANT",
    "date_registered": "2024-11-08T05:48:36.026444Z",
    "images": "http://127.0.0.1:8000/media/temporary/sapling4_Zp5wVGC.jpg",
    "work_time": {
      "Monday": { "open": "09:00", "close": "17:00" },
      "Tuesday": { "open": "09:00", "close": "17:00" },
      "Wednesday": { "open": "09:00", "close": "17:00" },
      "Thursday": { "open": "09:00", "close": "17:00" },
      "Friday": { "open": "09:00", "close": "17:00" },
      "Saturday": { "open": "10:00", "close": "15:00" },
      "Sunday": { "open": "Closed", "close": "Closed" }
    },
    "owner": 2
  }
];

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate= useNavigate()

  // Filter businesses based on search query (business name, address, or zipcode)
  const filteredBusinesses = sampleSomething.filter((business) =>
    business.b_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    business.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    business.zipcode.includes(searchQuery)
  );

  return (
    <div>
      <TextField
        className="border-[#D8A32A] text-[#D8A32A] rounded-lg"
        label="Search Business by Name, Address, or Zipcode"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{
          mb: 2,
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#D8A32A', // Gold border
            },
            '&:hover fieldset': {
              borderColor: '#D8A32A',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#D8A32A',
            },
            padding: '6px 16px', // Adjusted padding (6px for vertical, 16px for horizontal)
          },
          '& .MuiInputLabel-root': {
            color: '#D8A32A', // Gold label color
          },
          '& .MuiInputBase-input': {
            color: '#D8A32A', // Gold text color
            fontSize: '14px', // Set font size to 14px
            textAlign: 'center', // Center the text horizontally
            paddingY: '6px', // Vertical padding for better centering
            paddingX: '16px', // Horizontal padding
            height: 'auto', // Ensure the height adjusts to content (for vertical centering)
          },
        }}
/>

      {/* Show dropdown only if there's a search query */}
      {searchQuery && (
        <Paper sx={{ maxHeight: 200, overflow: 'auto' }}>
          <List>
            {filteredBusinesses.length > 0 ? (
              filteredBusinesses.map((business) => (
                <div key={business.id} onClick={()=> navigate(`/business`,  { state: { id: business?.id || -1  } })}>
                  <ListItem>
                    <ListItemText
                      primary={business.b_name}
                      secondary={`${business.address}, ${business.zipcode}`}
                    />
                  </ListItem>
                  <Divider />
                </div>
              ))
            ) : (
              <ListItem>No results found</ListItem>
            )}
          </List>
        </Paper>
      )}
    </div>
  );
};

export default SearchComponent;
