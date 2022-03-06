import { Box, Card, CardActions, CardContent, IconButton, Typography } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { FC, useMemo } from 'react';
import { useElecActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';


const Elec: FC = () => {  
    const { getElected, deleteElec } = useElecActions()
    const { elec, error} = useTypedSelector(state => state.elec)
   
    useMemo(() => {
        getElected()
    }, [])
     
    if(error) {
        return <h1>{error}</h1>
    }
    return (
      <>
      <Typography variant='h3'align='center'>Elected</Typography>
        <Box sx={{flexWrap: 'wrap', display: 'flex', margin: 20, alignItems: 'center'}}>
        {elec.elected?.map((elem: any) => (
          <Box sx={{ maxWidth: 150 , margin: 20}} key={elem.id}>
            <Card variant='outlined' >
                <CardContent>
                <Typography gutterBottom>
                  {elem.item.name}
                 </Typography>
                 <Typography variant="h5" component="div">
                   {elem.item.phone}
                 </Typography>
                 <Typography variant="body2">
                  {elem.item.lastName}
                 </Typography>
                 <Typography variant="body2">
                  {elem.item.price}
                 </Typography> 
                 </CardContent>
                 <CardActions>
                 <IconButton onClick={() => deleteElec(elem.item)} >
                 <Delete/>
                 </IconButton>
                </CardActions>
            </Card>
           </Box>
         ))
        }
      </Box>
      </>
    );
};

export default Elec;