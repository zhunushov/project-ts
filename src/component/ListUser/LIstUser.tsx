import { Pagination } from '@material-ui/lab';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useUserActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import CardUser from '../CardUser/CardUser';


const ListUser = () => {
    const {user, error, loading, pagination} = useTypedSelector(state => state.user)
    const { getUser } = useUserActions()

    const [params, setParams] = useSearchParams()

    const [limit, setLimit] = useState<any>(6)
    const [page, setPage] = useState<any>(params.get("_page") ? params.get("_page") : 1 )

    useEffect(() => {
        setParams({
            _limit: limit,
            _page: page,
          });
    }, [limit, page]);

    const handlePage = (_: any , pageVal: any) => {
         setParams({
             _page: pageVal,
             _limit: limit,
            })
            getUser()
          setPage(pageVal)
    }   

    useEffect(() => {
         getUser()
    },[])

    if(loading){
        return <h1>Loading...</h1>
    }
    if(error) {
        return <h1>{error}</h1>
    }


    return (
        <div>
        <div style={{marginTop: "50px", display: "flex", alignItems: "center", justifyContent: 'center', flexWrap: 'wrap'}}>
            {
            user?.map(item => <CardUser key={item.id} item={item}/>)
            }
        </div>
        <div style={{justifyContent: 'center', display: 'flex'}}>
            <Pagination count={pagination} onChange={handlePage} page={+page} color='primary'/>
        </div>
        </div>
    );
};

export default ListUser;