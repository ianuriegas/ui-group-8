import React from 'react';
import axios from 'axios';
import { Autocomplete, InputAdornment, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const categoryDisplayName = {
    'Frozen': 'frozen',
    'Dairy': 'dairy',
    'Dry Foods': 'dry-foods',
    'Bakery': 'bakery',
    'Deli': 'deli',
    'Produce': 'produce',
    'Meat/Poultry': 'meat-poultry',
    'Kitchenware': 'kitchenware',
    'Home Essentials': 'home-essentials'
}

function SearchBar() {
    const [productData, setProductData] = React.useState([]);
    const navigate = useNavigate();

    React.useEffect(() => {
        axios.get("/getProducts")
          .then(response => {
            console.log(response.data); 
            setProductData(response.data);
          })
          .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleSelect = (event, value) => {
        if (value && value.category) {
            let category = categoryDisplayName[value.category];
            if (category) {
                navigate(`/${category}/${value._id}`);
            }
        } else {
            console.error('Selected value is invalid:', value);
        }
    };
    

    return (
        <div>
            { productData.length > 0 ?
            <Autocomplete
                style={{width: "710px"}}
                freeSolo
                options={productData}
                getOptionLabel={(option) => `${option.productName} - (${option.category})`}
                onChange={handleSelect}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder='Search'
                        variant="outlined"
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <>
                                    {params.InputProps.endAdornment}
                                    <i className="fa fa-search search-icon" style={{
                                        color: "#275143",
                                        backgroundColor: "white",
                                        fontSize: "20px",
                                        marginRight: '8px',
                                        cursor: "pointer"
                                    }}></i>
                                </>
                            ),
                        }}
                    />
                )}
            />
            : 
            <TextField 
                style={{width: "710px"}} 
                placeholder='Search'
                variant="outlined"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <i className="fa fa-search search-icon" style={{
                                color: "#275143",
                                backgroundColor: "white",
                                fontSize: "20px",
                                marginRight: '8px',
                                cursor: "pointer"
                            }}></i>
                        </InputAdornment>
                    ),
                }}
            />
            }
        </div>
    );
}

export default SearchBar;
