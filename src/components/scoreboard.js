import React, {useState, useEffect} from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { Card } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));



export default function ColumnsGrid() {
  const [stateCol1, setStateCol1] = useState({tournament: { players: {}} });
  const [stateCol2, setStateCol2] = useState({tournament: {} });
  const [stateCol3, setStateCol3] = useState({tournament: {} });
  
  useEffect(()=>{
    fetchData();
    setInterval(()=>{fetchData()}, 10000);
  }, []);

  const fetchData =  async () => {
    try {
      const responseCol1 = await fetch('https://api.trackmanrange.com/api/tournaments/1c016d81-b40c-4e8e-817e-2734f701a66f/leaderboard');
      if (!responseCol1.ok) {throw Error(responseCol1.statusText);}
      const json = await responseCol1.json();
      setStateCol1(json);
    }
    catch (error) {console.log(error);}
    try {
        const responseCol2 = await fetch('https://api.trackmanrange.com/api/tournaments/1154734d-57a1-41c7-b6e1-711fbddc5a42/leaderboard');
        if (!responseCol2.ok) {throw Error(responseCol2.statusText);}
        const json = await responseCol2.json();
        setStateCol2(json);
    }
    catch (error) {console.log(error);}
    try {
      const responseCol3 = await fetch('https://api.trackmanrange.com/api/tournaments/f618152e-98be-48b8-a8f6-426cdbce6f14/leaderboard');
      if (!responseCol3.ok) {throw Error(responseCol3.statusText);}
      const json = await responseCol3.json();
      setStateCol3(json);
    }
    catch (error) {console.log(error);}
  }
  let players = [1, 2 ,3];
  if (stateCol1.players !== undefined){
    players = stateCol1.players;
  }
  console.log(players);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} columns={3}>
        <Grid xs={1}>
          <Item>{stateCol1.tournament.name}</Item>
          {players.map(player=>{ 
            if (player.scores !== undefined){
            let totalDistance = player.scores.total.distanceToPinWithPenalty * 39.3700787402 / 12;
            let totalDistanceFt = Math.trunc(totalDistance);
            let totalDistanceInches = Math.trunc((totalDistance - totalDistanceFt) * 12);
            return <Card>{player.playername}: {totalDistanceFt}', {totalDistanceInches}"</Card>
            } else {
              return;
            }
          })}
        </Grid>
        <Grid xs={1}>
          <Item>{stateCol2.tournament.name}</Item>
        </Grid>
        <Grid xs={1}>
          <Item>{stateCol3.tournament.name}
            <Card>
              test
            </Card>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}