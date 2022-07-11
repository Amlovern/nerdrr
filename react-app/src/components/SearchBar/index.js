import './SearchBar.css';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as gigActions from '../../store/gig';

import magnifyingGlass from '../../images/magnifying-glass.svg';

export default function SearchBar() {
    const dispatch = useDispatch();

    const gigs = useSelector((state) => state.gig.gigsByGigId);

    console.log(gigs)

    const [query, setQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(gigActions.searchGigThunk(query))
    }

    useEffect(() => {
        dispatch(gigActions.getAllGigsThunk());
    }, [dispatch])

    if (!gigs) {
        return null;
    };

    return (
        <div className='header-search'>
            <form className='search-form'>
                <input 
                    type='search'
                    autoComplete='off'
                    className='search-input'
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder='What service are you looking for today?'
                />
                <button className='search-btn'>
                    <img
                        src={magnifyingGlass}
                        alt='magnifying glass'
                        className='search-btn-icon'
                        onClick={handleSearch}
                    />
                </button>
            </form>
            {/* <ul className='search-bar-panel'>
                <aside>
                    <ul>

                    </ul>
                </aside>
            </ul> */}
        </div>
    )
}