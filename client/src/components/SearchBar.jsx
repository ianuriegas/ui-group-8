import React from 'react';
import axios from 'axios';
import { Autocomplete, InputAdornment, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../styles/SearchBar.css'

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
            navigate(`/product/${value._id}`);
        } else {
            console.error('Selected value is invalid:', value);
        }
    };
    

    return (
        <div 
            className="searchBar"
            // style={{
            //     backgroundColor: "white",
            //     border: "2px solid #275143",
            //     width: "50%",
            //     marginLeft: "20px",
            //     borderRadius: "10px"
            // }}

            >
            { productData.length > 0 ?
            <Autocomplete
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
                style={{width: "100%"}} 
                className="searchBar"
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
