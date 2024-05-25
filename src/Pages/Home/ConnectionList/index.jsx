import { useRef } from 'react';
import { Box, Table, Pagination, TextInput } from '@mantine/core';
import { useStyles } from './style';
import edit from "../../../assets/icons/edit.svg"
import view from "../../../assets/icons/view.svg"
import { useEffect, useState } from 'react';
import filter from "../../../assets/icons/filterIcon.svg"
import { Link } from 'react-router-dom';
import SearchIcon from '../../../assets/icons/search.svg';
import { data, statusClass } from './properties';
import { backendBaseURL, getHeader } from '../../../Utils/const';
import FilterModal from '../FilterModal';
function ConnectionList() {

    const { classes, theme } = useStyles(useStyles)
    const [activePage, setActivePage] = useState(1);

    const [entries, setEntries] = useState([]);
    const [pageLoadEntries, setPageLoadEntries] = useState([]);
    const [totalPage, setTotalPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [openFilterModal, setOpenFilterModal ] = useState(false);
    const [filteredValue, setFilteredValue ] = useState([null, null]);
    const cacheListing = useRef({});
    const params = new URLSearchParams();
    params.append('page', activePage)
    params.append('pSize', pageSize)

    const pageChangeHandler = (page) => {
        setActivePage(page)
    }

    const fetchConnectionList = async (isReset) => {
       // set the filer date range if it is applied
        if(!isReset && filteredValue && filteredValue[0] && filteredValue[1]){
            params.delete('datemin');
            params.delete('datemax');
            params.append('datemin', filteredValue[0].toISOString());
            params.append('datemax', filteredValue[1].toISOString())
        }
        if (!isReset && params in cacheListing) {
            setEntries(cacheListing[params]);
            return;
        }
        const response = await fetch(`${backendBaseURL}/user/list?` + params.toString(), {
            method: 'GET',
            headers: getHeader(),

        })
        console.log(response)
        if (response.ok) {
            let UserListing = await response.json();

            setEntries(UserListing.data);
            setPageLoadEntries(UserListing.data);

            setTotalPage((UserListing.totalCount + pageSize - 1) / pageSize);
            cacheListing[params] = UserListing.data;
        }
    }

    useEffect(() => {
        fetchConnectionList()
    }, [activePage])

    const AppliedDateFilter = async (isReset)=>{
        console.log('filteredValue is ', filteredValue);
        
        await fetchConnectionList(isReset);
        setOpenFilterModal(false);
    }


    const rows = entries.map((element, index) => (
        <tr className={index % 2 === 0 ? classes.tableRowWhite : classes.tableRow} key={`${element.firstName}${index}`}>
            <td className={classes.tableData}>{element.Applicant_Name}</td>
            <td className={classes.tableData}>{element.Reviewer_Name}</td>
            <td className={classes.tableData}>{new Date(element.Date_of_Application).toDateString()}</td>
            <td className={` ${classes.tableData} ${classes.statusWrapper}`}><p className={`${classes.status} ${statusClass(element.Status.toLowerCase(), classes)}`}>{element.Status}</p></td>
            <td className={classes.tableData}>
                <Box className={classes.editAndView}>
                    <Link to={`/details/${element.ID}`} ><img className={classes.action} src={edit} alt='edit' /></Link>

                </Box>
            </td>

        </tr>
    ));

    const handleSearch = (e) => {
        const value = e.target.value;
        if (value === "") {
            setEntries(pageLoadEntries);
        } else {
            const filteredEntries = pageLoadEntries.filter(item => `${item.Applicant_Name.toLowerCase()}`.includes(value.toLowerCase()) || item.Reviewer_Name.toLowerCase().includes(value) ||
                item.Status.toLowerCase().includes(value)
            );
            setEntries(filteredEntries);
        }
    }


    return (
        <Box className={classes.wrapper}>
            <Box className={classes.headerAndSearch}>
                <p className={classes.title} >{data.titles.connectionList} : {filteredValue && filteredValue[0] && filteredValue[1]? filteredValue[0].toDateString() + '-' + filteredValue[1].toDateString(): ''}</p>
                <Box className={classes.searchAndFilter}>
                    <TextInput icon={<img className={classes.action} src={SearchIcon} alt='view' />} onChange={handleSearch} radius={"xl"} className={classes.searchInput} placeholder={data.titles.search} />
                    <Box className={classes.filterContainer} onClick={() =>{console.log('clicked'); setOpenFilterModal(true)}}>
                        <img className={classes.filterIcon} src={filter} alt='search-input' />
                        <p className={classes.filter}>{data.titles.filter}</p>
                    </Box>

                </Box>
            </Box>
            <Box className={classes.tableContainer}>
                <Table className={classes.table}>
                    <thead className={classes.tableHead}>
                        <tr >
                            {data.tableHeading.map(heading => {
                                return <th className={classes.columnHeading}>{heading}</th>
                            })}
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </Table>
            </Box>
            {
                rows.length === 0 ? <p className='no-record-found'>{"No record found"}</p>
                    :
                    <Pagination size={"md"} defaultValue={activePage} onChange={pageChangeHandler} className={classes.pagination} siblings={1} total={totalPage} />
            }
            <FilterModal openFilterModal={openFilterModal} setOpenFilterModal={setOpenFilterModal} applyFilter={AppliedDateFilter} filteredValue={filteredValue} setFilteredValue={setFilteredValue}/>
        </Box>
    );
}

export default ConnectionList;