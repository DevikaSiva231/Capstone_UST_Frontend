import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { List, ListItem, ListItemText, Divider, Paper } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router';

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [businesses, setBusinesses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/businesses/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        setBusinesses(response.data); // Save the businesses to the state
      } catch (error) {
        console.error('Error fetching businesses:', error);
      }
    };

    fetchBusinesses();
  }, []);

  // Filter businesses based on search query (business name, address, or zipcode)
  const filteredBusinesses = businesses.filter((business) =>
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
        onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
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
      {searchQuery && filteredBusinesses.length > 0 && (
        <Paper sx={{ maxHeight: 200, overflow: 'auto', position: 'absolute', zIndex: 1 }}>
          <List>
            {filteredBusinesses.map((business) => (
              <div key={business.id} onClick={() => navigate(`/business`, { state: { id: business.id || -1 } })}>
                <ListItem>
                  <ListItemText
                    primary={business.b_name}
                    secondary={`${business.address}, ${business.zipcode}`}
                  />
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>
        </Paper>
      )}

      {/* If no results found */}
      {searchQuery && filteredBusinesses.length === 0 && (
        <Paper sx={{ maxHeight: 200, overflow: 'auto', position: 'absolute', zIndex: 1 }}>
          <List>
            <ListItem>No results found</ListItem>
          </List>
        </Paper>
      )}
    </div>
  );
};

export default SearchComponent;
